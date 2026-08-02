import { useEffect, useState } from "react";
import { Trash2, Phone, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getQuotes, updateQuoteStatus, deleteQuote } from "../lib/api";

const statusStyles = {
  new: "bg-green/10 text-green-dark border-green/30",
  contacted: "bg-brass/10 text-brass-dark border-brass/30",
  closed: "bg-navy/5 text-navy/60 border-navy/15",
};

export default function QuoteRequests() {
  const { token } = useAuth();
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function load() {
    setLoading(true);
    getQuotes(token)
      .then(setQuotes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, [token]);

  async function handleStatusChange(id, status) {
    const updated = await updateQuoteStatus(token, id, status);
    setQuotes((qs) => qs.map((q) => (q.id === id ? updated : q)));
  }

  async function handleDelete(id) {
    if (!confirm("Delete this quote request? This can't be undone.")) return;
    await deleteQuote(token, id);
    setQuotes((qs) => qs.filter((q) => q.id !== id));
  }

  return (
    <div className="p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-brass-dark mb-1">Manage</p>
      <h1 className="font-display text-3xl text-navy mb-8">Quote Requests</h1>

      {error && <p className="text-sm text-red-700 mb-6">{error}</p>}
      {loading && <p className="text-sm text-ink/60">Loading...</p>}
      {!loading && quotes.length === 0 && (
        <p className="text-sm text-ink/60">No quote requests yet — they'll show up here as soon as someone submits the form.</p>
      )}

      <div className="space-y-4 max-w-4xl">
        {quotes.map((q) => (
          <div key={q.id} className="bg-white border border-navy/10 rounded-sm p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="font-display text-lg text-navy">{q.name}</p>
                {q.company && <p className="text-xs text-ink/50">{q.company}</p>}
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
