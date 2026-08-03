import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getContent, updateContent } from "../lib/api";
import RepeatableList from "../components/RepeatableList";
import ServicesCategoriesEditor from "../components/ServicesCategoriesEditor";

const ICON_OPTIONS = [
  "Car", "HomeIcon", "Plane", "HeartPulse", "Flame", "Ship", "HardHat",
  "Scale", "Users", "Package", "PhoneCall", "FileText", "Search",
  "CheckCircle", "ShieldCheck",
];

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

  const homeHero = content.home_hero || { slides: [] };
  const aboutIntro = content.about_intro || { vision: "", mission: "" };
  const aboutValues = content.about_values || { items: [] };
  const aboutJourney = content.about_journey || { items: [] };
  const servicesCategories = content.services_categories || { items: [] };
  const claimsSteps = content.claims_steps || { items: [] };
  const contactInfo = content.contact_info || {};

  const st = (key) => status[key] || {};

  return (
    <div className="p-8 max-w-4xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-brass-dark mb-1">Manage</p>
      <h1 className="font-display text-3xl text-navy mb-8">Site Content</h1>

      <SectionCard
        title="Home Page Hero Slides"
        description="The rotating messages shown at the top of the homepage."
        onSave={() => save("home_hero")}
        {...st("home_hero")}
      >
        <RepeatableList
          items={homeHero.slides || []}
          onChange={(slides) => setBlock("home_hero", { ...homeHero, slides })}
          itemLabel="Slide"
          emptyItem={{ eyebrow: "", title: "", body: "", ctaLabel: "", ctaTo: "/quote" }}
          fields={[
            { key: "eyebrow", label: "Small label above title", type: "text", wide: true },
            { key: "title", label: "Headline", type: "text", wide: true },
            { key: "body", label: "Supporting text", type: "textarea", wide: true },
            { key: "ctaLabel", label: "Button text", type: "text" },
            { key: "ctaTo", label: "Button link (page path)", type: "text" },
          ]}
        />
      </SectionCard>

      <SectionCard
        title="About — Vision & Mission"
        onSave={() => save("about_intro")}
        {...st("about_intro")}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-ink/60 mb-1">Vision</label>
            <textarea
              rows={3} value={aboutIntro.vision || ""}
              onChange={(e) => setBlock("about_intro", { ...aboutIntro, vision: e.target.value })}
              className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm focus-ring focus:border-green resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink/60 mb-1">Mission</label>
            <textarea
              rows={3} value={aboutIntro.mission || ""}
              onChange={(e) => setBlock("about_intro", { ...aboutIntro, mission: e.target.value })}
              className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm focus-ring focus:border-green resize-none"
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="About — Core Values"
        onSave={() => save("about_values")}
        {...st("about_values")}
      >
        <RepeatableList
          items={aboutValues.items || []}
          onChange={(items) => setBlock("about_values", { items })}
          itemLabel="Value"
          emptyItem={{ title: "", desc: "" }}
          fields={[
            { key: "title", label: "Title", type: "text" },
            { key: "desc", label: "Description", type: "textarea" },
          ]}
        />
      </SectionCard>

      <SectionCard
        title="About — Our Journey"
        onSave={() => save("about_journey")}
        {...st("about_journey")}
      >
        <RepeatableList
          items={aboutJourney.items || []}
          onChange={(items) => setBlock("about_journey", { items })}
          itemLabel="Milestone"
          emptyItem={{ year: "", text: "" }}
          fields={[
            { key: "year", label: "Year / Label", type: "text" },
            { key: "text", label: "Description", type: "textarea", wide: true },
          ]}
        />
      </SectionCard>

      <SectionCard
        title="Insurance Solutions"
        description="Categories and products shown on the Services page."
        onSave={() => save("services_categories")}
        {...st("services_categories")}
      >
        <ServicesCategoriesEditor
          categories={servicesCategories.items || []}
          onChange={(items) => setBlock("services_categories", { items })}
        />
      </SectionCard>

      <SectionCard
        title="Claims — How It Works Steps"
        onSave={() => save("claims_steps")}
        {...st("claims_steps")}
      >
        <RepeatableList
          items={claimsSteps.items || []}
          onChange={(items) => setBlock("claims_steps", { items })}
          itemLabel="Step"
          emptyItem={{ icon: "CheckCircle", title: "", desc: "" }}
          fields={[
            { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
            { key: "title", label: "Title", type: "text" },
            { key: "desc", label: "Description", type: "textarea", wide: true },
          ]}
        />
      </SectionCard>

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
    </div>
  );
}
