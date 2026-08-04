import { useState } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";

function Field({ field, value, onChange }) {
  if (field.type === "textarea") {
    return (
      <textarea
        rows={2}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm bg-white focus-ring focus:border-green resize-none"
      />
    );
  }
  if (field.type === "select") {
    return (
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm bg-white focus-ring focus:border-green"
      >
        {field.options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    );
  }
  return (
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-navy/15 rounded-sm px-3 py-2 text-sm bg-white focus-ring focus:border-green"
    />
  );
}

// List of similarly-shaped items. Each item is shown as a collapsible row
// (summary line + delete), and expands into its edit form. `summary(item, i)`
// returns the text shown in the collapsed row.
export default function ItemList({ items, fields, onChange, emptyItem, itemLabel, summary }) {
  const [open, setOpen] = useState(null);

  function update(index, key, value) {
    onChange(items.map((it, i) => (i === index ? { ...it, [key]: value } : it)));
  }

  function addItem() {
    const next = [...items, { ...emptyItem }];
    onChange(next);
    setOpen(next.length - 1);
  }

  function removeItem(index) {
    onChange(items.filter((_, i) => i !== index));
    setOpen((o) => (o === index ? null : o));
  }

  const plural = itemLabel.toLowerCase() + "s";

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <p className="text-sm text-ink/50 py-2">No {plural} yet — add the first one below.</p>
      )}
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border border-navy/10 rounded-sm bg-white overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex-1 min-w-0 flex items-center gap-2 text-left focus-ring"
              >
                <ChevronDown
                  size={15}
                  className={`text-brass shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
                <span className="text-sm font-medium text-navy truncate">{summary(item, i)}</span>
              </button>
              <button
                type="button"
                onClick={() => removeItem(i)}
                className="text-ink/40 hover:text-red-600 transition-colors focus-ring"
                aria-label={`Delete ${itemLabel.toLowerCase()} ${i + 1}`}
              >
                <Trash2 size={15} />
              </button>
            </div>
            {isOpen && (
              <div className="border-t border-navy/10 px-4 py-4 grid sm:grid-cols-2 gap-3">
                {fields.map((f) => (
                  <div key={f.key} className={f.wide ? "sm:col-span-2" : ""}>
                    <label className="block text-xs font-medium text-ink/60 mb-1">{f.label}</label>
                    <Field field={f} value={item[f.key]} onChange={(v) => update(i, f.key, v)} />
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
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
