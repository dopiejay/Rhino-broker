import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getContent, updateContent } from "../lib/api";
import RepeatableList from "../components/RepeatableList";

function SectionCard({ title, description, children, onSave, saving, saved, error }) {
  return (
    <section className="bg-white border border-navy/10 rounded-sm p-6 mb-8">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h2 className="font-display text-xl text-navy mb-1">{title}</h2>
          {description && <p className="text-sm text-ink/55">{description}</p>}
        </div>
        <button
          onClick={onSave}
          disabled={saving}
          className="shrink-0 inline-flex items-center gap-1.5 bg-green text-white text-sm font-semibold px-4 py-2 rounded-sm hover:bg-green-dark transition-colors focus-ring disabled:opacity-60"
        >
          {saving ? "Saving..." : saved ? <><CheckCircle2 size={15} /> Saved</> : "Save Changes"}
        </button>
      </div>
      {error && (
        <p className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-sm px-3 py-2 mb-4">
          <AlertCircle size={14} /> {error}
        </p>
      )}
      {children}
    </section>
  );
}

export default function ContentEditor() {
  const { token } = useAuth();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({}); // { [key]: { saving, saved, error } }

  useEffect(() => {
    getContent().then((c) => {
      setContent(c);
      setLoading(false);
    });
  }, []);

  function setBlock(key, data) {
    setContent((c) => ({ ...c, [key]: data }));
  }

  async function save(key) {
    setStatus((s) => ({ ...s, [key]: { saving: true } }));
    try {
      await updateContent(token, key, content[key]);
      setStatus((s) => ({ ...s, [key]: { saved: true } }));
      setTimeout(() => setStatus((s) => ({ ...s, [key]: {} })), 2000);
    } catch (err) {
      setStatus((s) => ({ ...s, [key]: { error: err.message } }));
    }
  }

  if (loading || !content) {
    return <div className="p-8"><p className="text-sm text-ink/60">Loading content...</p></div>;
  }

  const contactInfo = content.contact_info || {};
  const faqs = content.faqs || { items: [] };

  const st = (key) => status[key] || {};

  return (
    <div className="p-8 max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-brass-dark mb-1">Manage</p>
      <h1 className="font-display text-3xl text-navy mb-8">Site Content</h1>

      <SectionCard
        title="Contact Details"
        description="Used across the header, footer, and Contact page."
        onSave={() => save("contact_info")}
        {...st("contact_info")}
      >
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { key: "address", label: "Office Address" },
            { key: "phone", label: "Phone" },
            { key: "email", label: "Email" },
            { key: "hours", label: "Office Hours" },
            { key: "whatsapp", label: "WhatsApp Number (digits only, e.g. 265888590727)" },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-medium text-ink/60 mb-1">{f.label}</label>
              <input
                type="text" value={contactInfo[f.key] || ""}
                onChange={(e) => setBlock("contact_info", { ...contactInfo, [f.key]: e.target.value })}
                className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm focus-ring focus:border-green"
              />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard
        title="FAQ Questions"
        description="Shown on the Resources page. Other site text is managed in code, not here."
        onSave={() => save("faqs")}
        {...st("faqs")}
      >
        <RepeatableList
          items={faqs.items || []}
          onChange={(items) => setBlock("faqs", { items })}
          itemLabel="Question"
          emptyItem={{ q: "", a: "" }}
          fields={[
            { key: "q", label: "Question", type: "textarea", wide: true },
            { key: "a", label: "Answer", type: "textarea", wide: true },
          ]}
        />
      </SectionCard>
    </div>
  );
}
