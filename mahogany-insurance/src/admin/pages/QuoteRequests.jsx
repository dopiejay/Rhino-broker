import { useEffect, useState } from "react";
import { Trash2, Phone, Mail, Download } from "lucide-react";
import { getQuotes, updateQuoteStatus, deleteQuote } from "../lib/api";

const statusStyles = {
  new: "bg-green/10 text-green-dark border-green/30",
  contacted: "bg-brass/10 text-brass-dark border-brass/30",
  closed: "bg-navy/5 text-navy/60 border-navy/15",
};

const FILTERS = ["all", "new", "contacted", "closed"];

function exportCsv(rows) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const header = ["ID", "Name", "Phone", "Email", "Insurance Type", "Details", "Status", "Created"];
  const lines = [header.map(esc).join(",")];
  for (const q of rows) {
    lines.push(
      [q.id, q.name, q.phone, q.email, q.insurance_type, q.details, q.status, q.created_at].map(esc).join(",")
    );
  }
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `quote-requests-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function QuoteRequests() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  function load() {
    setLoading(true);
    getQuotes()
      .then(setQuotes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  const counts = {
    all: quotes.length,
    new: quotes.filter((q) => q.status === "new").length,
    contacted: quotes.filter((q) => q.status === "contacted").length,
    closed: quotes.filter((q) => q.status === "closed").length,
  };
  const visible = filter === "all" ? quotes : quotes.filter((q) => q.status === filter);

  async function handleStatusChange(id, status) {
    const updated = await updateQuoteStatus(id, status);
    setQuotes((qs) => qs.map((q) => (q.id === id ? updated : q)));
  }

  async function handleDelete(id) {
    if (!confirm("Delete this quote request? This can't be undone.")) return;
    await deleteQuote(id);
    setQuotes((qs) => qs.filter((q) => q.id !== id));
  }

  return (
    <div className="p-8">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brass-dark mb-1">Manage</p>
          <h1 className="font-display text-3xl text-navy">Quote Requests</h1>
        </div>
        <button
          onClick={() => exportCsv(visible)}
          disabled={visible.length === 0}
          className="inline-flex items-center gap-1.5 border border-navy/20 text-navy text-sm font-semibold px-4 py-2 rounded-sm hover:bg-navy/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-ring"
        >
          <Download size={15} /> Export CSV
        </button>
      </div>

      {error && <p className="text-sm text-red-700 mb-6">{error}</p>}

      <div className="grid sm:grid-cols-4 gap-4 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-left bg-white border rounded-sm p-5 transition-colors focus-ring ${
              filter === f ? "border-navy" : "border-navy/10 hover:border-navy/30"
            }`}
          >
            <span className="text-3xl font-display text-navy block">{counts[f] ?? "—"}</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-ink/50">
              {f === "all" ? "Total" : f}
            </span>
          </button>
        ))}
      </div>

      {loading && <p className="text-sm text-ink/60">Loading...</p>}
      {!loading && quotes.length === 0 && (
        <p className="text-sm text-ink/60">No quote requests yet — they'll show up here as soon as someone submits the form.</p>
      )}
      {!loading && quotes.length > 0 && visible.length === 0 && (
        <p className="text-sm text-ink/60">No {filter} requests in this view.</p>
      )}

      <div className="space-y-4 max-w-4xl">
        {visible.map((q) => (
          <div key={q.id} className="bg-white border border-navy/10 rounded-sm p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="font-display text-lg text-navy">{q.name}</p>
                <p className="text-xs text-ink/50">{new Date(q.created_at).toLocaleString()}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${statusStyles[q.status] || statusStyles.new}`}>
                {q.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-ink/70 mb-3">
              <a href={`tel:${q.phone}`} className="flex items-center gap-1.5 hover:text-navy transition-colors">
                <Phone size={14} /> {q.phone}
              </a>
              {q.email && (
                <a href={`mailto:${q.email}`} className="flex items-center gap-1.5 hover:text-navy transition-colors">
                  <Mail size={14} /> {q.email}
                </a>
              )}
              {q.insurance_type && (
                <span className="px-2 py-0.5 bg-parchment-dark rounded-full text-xs">{q.insurance_type}</span>
              )}
            </div>

            {q.details && <p className="text-sm text-ink/65 mb-4 leading-relaxed">{q.details}</p>}

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-navy/5">
              <div className="flex gap-2">
                {["new", "contacted", "closed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(q.id, s)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-sm border capitalize transition-colors focus-ring ${
                      q.status === s ? "bg-navy text-white border-navy" : "border-navy/15 text-ink/60 hover:border-navy/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handleDelete(q.id)}
                className="text-ink/40 hover:text-red-600 transition-colors focus-ring"
                aria-label="Delete quote request"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
