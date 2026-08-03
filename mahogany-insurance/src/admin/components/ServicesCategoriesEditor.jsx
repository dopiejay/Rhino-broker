import { Plus, Trash2, GripVertical } from "lucide-react";
import RepeatableList from "./RepeatableList";

const ICON_OPTIONS = [
  "Car", "HomeIcon", "Plane", "HeartPulse", "Flame", "Ship", "HardHat",
  "Scale", "Users", "Package", "PhoneCall", "FileText", "Search",
  "CheckCircle", "ShieldCheck",
];

const emptyServiceItem = { icon: "ShieldCheck", name: "", desc: "" };
const emptyCategory = { label: "", intro: "", items: [] };

export default function ServicesCategoriesEditor({ categories, onChange }) {
  function updateCategory(index, patch) {
    onChange(categories.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  }

  function removeCategory(index) {
    onChange(categories.filter((_, i) => i !== index));
  }

  function addCategory() {
    onChange([...categories, { ...emptyCategory }]);
  }

  return (
    <div className="space-y-6">
      {categories.map((cat, i) => (
        <div key={i} className="border border-navy/15 rounded-sm p-5 bg-white">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-navy/50">
              <GripVertical size={13} /> Category {i + 1}
            </span>
            <button
              type="button"
              onClick={() => removeCategory(i)}
              className="text-ink/40 hover:text-red-600 transition-colors focus-ring"
              aria-label={`Remove category ${i + 1}`}
            >
              <Trash2 size={15} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div>
              <label className="block text-xs font-medium text-ink/60 mb-1">Category Name</label>
              <input
                type="text" value={cat.label || ""}
                onChange={(e) => updateCategory(i, { label: e.target.value })}
                className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm focus-ring focus:border-green"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-ink/60 mb-1">Intro Line</label>
              <input
                type="text" value={cat.intro || ""}
                onChange={(e) => updateCategory(i, { intro: e.target.value })}
                className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm focus-ring focus:border-green"
              />
            </div>
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest text-brass-dark mb-2">Products in this category</p>
          <RepeatableList
            items={cat.items || []}
            onChange={(items) => updateCategory(i, { items })}
            itemLabel="Product"
            emptyItem={emptyServiceItem}
            fields={[
              { key: "icon", label: "Icon", type: "select", options: ICON_OPTIONS },
              { key: "name", label: "Product Name", type: "text" },
              { key: "desc", label: "Description", type: "textarea", wide: true },
            ]}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={addCategory}
        className="flex items-center gap-1.5 text-sm font-semibold text-navy border border-navy/20 rounded-sm px-4 py-2 hover:bg-navy/5 transition-colors focus-ring"
      >
        <Plus size={15} /> Add Category
      </button>
    </div>
  );
}
