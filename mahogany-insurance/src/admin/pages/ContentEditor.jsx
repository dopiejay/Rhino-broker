import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { getContent, updateContent } from "../lib/api";
import ItemList from "../components/ItemList";

const TABS = [
  { id: "contact_info", label: "Contact Details" },
  { id: "faqs", label: "FAQs" },
  { id: "news", label: "News & Updates" },
  { id: "tips", label: "Insurance Tips" },
];

const NEWS_CATEGORIES = ["Company Update", "Insurance Tip", "News", "Client Story", "Industry Update"];

function SectionCard({ title, description, children, onSave, saving, saved, error }) {
  return (
    <section className="bg-white border border-navy/10 rounded-sm p-6">
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
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState({}); // { [key]: { saving, saved, error } }
  const [tab, setTab] = useState("contact_info");

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
      await updateContent(key, content[key]);
      setStatus((s) => ({ ...s, [key]: { saved: true } }));
      setTimeout(() => setStatus((s) => ({ ...s, [key]: {} })), 2000);
    } catch (err) {
      setStatus((s) => ({ ...s, [key]: { error: err.message } }));
    }
  }

  if (loading || !content) {
    return <div className="p-8"><p className="text-sm text-ink/60">Loading content...</p></div>;
  }

  const block = content[tab] || {};
  const st = (key) => status[key] || {};

  return (
    <div className="p-8 max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-brass-dark mb-1">Manage</p>
      <h1 className="font-display text-3xl text-navy mb-6">Site Content</h1>

      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Content sections">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`text-sm font-semibold px-4 py-2 rounded-sm transition-colors focus-ring ${
              tab === t.id
                ? "bg-green text-white"
                : "bg-white text-navy border border-navy/15 hover:border-green"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "contact_info" && (
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
                  type="text"
                  value={block[f.key] || ""}
                  onChange={(e) => setBlock("contact_info", { ...block, [f.key]: e.target.value })}
                  className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm focus-ring focus:border-green"
                />
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {tab === "faqs" && (
        <SectionCard
          title="FAQ Questions"
          description="Shown on the Resources page. Expand an entry to edit it, or delete it with the trash button."
          onSave={() => save("faqs")}
          {...st("faqs")}
        >
          <ItemList
            items={block.items || []}
            onChange={(items) => setBlock("faqs", { items })}
            itemLabel="Question"
            emptyItem={{ q: "", a: "" }}
            summary={(item) => item.q || "New question"}
            fields={[
              { key: "q", label: "Question", type: "textarea", wide: true },
              { key: "a", label: "Answer", type: "textarea", wide: true },
            ]}
          />
        </SectionCard>
      )}

      {tab === "news" && (
        <SectionCard
          title="News & Updates"
          description="Featured on the home page and Resources page. Expand an entry to edit it, or delete it with the trash button."
          onSave={() => save("news")}
          {...st("news")}
        >
          <ItemList
            items={block.items || []}
            onChange={(items) => setBlock("news", { items })}
            itemLabel="News Item"
            emptyItem={{ category: "Company Update", title: "", date: "", body: "" }}
            summary={(item) => (item.title ? `${item.title}` : "Untitled item")}
            fields={[
              { key: "title", label: "Title", type: "text", wide: true },
              { key: "body", label: "Body", type: "textarea", wide: true },
              {
                key: "category",
                label: "Category",
                type: "select",
                options: NEWS_CATEGORIES,
              },
              { key: "date", label: "Date (e.g. Aug 2026)" },
            ]}
          />
        </SectionCard>
      )}

      {tab === "tips" && (
        <SectionCard
          title="Insurance Tips"
          description="Shown on the Resources page as numbered cards. Expand an entry to edit it, or delete it with the trash button."
          onSave={() => save("tips")}
          {...st("tips")}
        >
          <ItemList
            items={block.items || []}
            onChange={(items) => setBlock("tips", { items })}
            itemLabel="Tip"
            emptyItem={{ title: "", body: "" }}
            summary={(item) => item.title || "Untitled tip"}
            fields={[
              { key: "title", label: "Title", type: "text", wide: true },
              { key: "body", label: "Body", type: "textarea", wide: true },
            ]}
          />
        </SectionCard>
      )}
    </div>
  );
}
