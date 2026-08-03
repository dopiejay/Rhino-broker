import { Plus, Trash2, GripVertical } from "lucide-react";

// Generic editor for an array of similarly-shaped objects (slides, values,
// journey entries, service items, claim steps...). `fields` describes each
// column: { key, label, type: 'text' | 'textarea' | 'select', options? }
export default function RepeatableList({ items, fields, onChange, emptyItem, itemLabel = "Item" }) {
  function updateField(index, key, value) {
    const next = items.map((it, i) => (i === index ? { ...it, [key]: value } : it));
    onChange(next);
  }

  function addItem() {
    onChange([...items, { ...emptyItem }]);
  }

  function removeItem(index) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={i} className="border border-navy/10 rounded-sm p-4 bg-parchment-dark/50">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-navy/50">
              <GripVertical size={13} /> {itemLabel} {i + 1}
            </span>
            <button
              type="button"
              onClick={() => removeItem(i)}
              className="text-ink/40 hover:text-red-600 transition-colors focus-ring"
              aria-label={`Remove ${itemLabel.toLowerCase()} ${i + 1}`}
            >
              <Trash2 size={15} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {fields.map((f) => (
              <div key={f.key} className={f.wide ? "sm:col-span-2" : ""}>
                <label className="block text-xs font-medium text-ink/60 mb-1">{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    rows={2}
                    value={item[f.key] || ""}
                    onChange={(e) => updateField(i, f.key, e.target.value)}
                    className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm bg-white focus-ring focus:border-green resize-none"
                  />
                ) : f.type === "select" ? (
                  <select
                    value={item[f.key] || ""}
                    onChange={(e) => updateField(i, f.key, e.target.value)}
                    className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm bg-white focus-ring focus:border-green"
                  >
                    {f.options.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={item[f.key] || ""}
                    onChange={(e) => updateField(i, f.key, e.target.value)}
                    className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm bg-white focus-ring focus:border-green"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-1.5 text-sm font-semibold text-navy border border-navy/20 rounded-sm px-4 py-2 hover:bg-navy/5 transition-colors focus-ring"
      >
        <Plus size={15} /> Add {itemLabel}
      </button>
    </div>
  );
}
