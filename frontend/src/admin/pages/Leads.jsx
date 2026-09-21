import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Trash2, Phone, Mail, Download, MessageSquareText } from "lucide-react";
import { getLeads, updateLeadStatus, deleteLead } from "../lib/api";

const statusStyles = {
  new: "bg-gold/10 text-gold-dark border-gold/30",
  contacted: "bg-steel/10 text-steel-dark border-steel/30",
  closed: "bg-navy/5 text-navy/50 border-navy/15",
};

const FILTERS = ["all", "new", "contacted", "closed"];

function exportCsv(rows) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const header = ["ID", "Name", "Email", "Phone", "Subject", "Message", "Status", "Created"];
  const lines = [header.map(esc).join(",")];
  for (const q of rows) {
    lines.push(
      [q.id, q.name, q.email, q.phone, q.subject, q.message, q.status, q.created_at].map(esc).join(",")
    );
  }
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyStatusId, setBusyStatusId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmingDelete, setConfirmingDelete] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get("status");

  const filter = FILTERS.includes(requested) ? requested : "all";

  function load() {
    setLoading(true);
    getLeads()
      .then(setLeads)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  const counts = {
    all: leads.length,
    new: leads.filter((q) => q.status === "new").length,
    contacted: leads.filter((q) => q.status === "contacted").length,
    closed: leads.filter((q) => q.status === "closed").length,
  };
  const visible = filter === "all" ? leads : leads.filter((q) => q.status === filter);

  async function handleStatusChange(id, status) {
    if (busyStatusId) return;
    setBusyStatusId(id);
    setError("");
    try {
      const updated = await updateLeadStatus(id, status);
      setLeads((qs) => qs.map((q) => (q.id === id ? updated : q)));
    } catch (err) {
      setError(err.message || "Failed to update status");
    } finally {
      setBusyStatusId(null);
    }
  }

  async function handleDelete(id) {
    if (deletingId) return;
    setDeletingId(id);
    setError("");
    try {
      await deleteLead(id);
      setLeads((qs) => qs.filter((q) => q.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete");
    } finally {
      setDeletingId(null);
      setConfirmingDelete(null);
    }
  }

  function setFilter(f) {
    if (f === "all") {
      setSearchParams({}, { replace: true });
    } else {
      setSearchParams({ status: f }, { replace: true });
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark mb-1">Manage</p>
          <h1 className="font-display text-3xl text-charcoal">Leads</h1>
        </div>
        <button
          onClick={() => exportCsv(visible)}
          disabled={visible.length === 0}
          className="shrink-0 inline-flex items-center gap-1.5 border border-navy/20 text-navy text-sm font-semibold px-4 py-2 rounded-lg hover:bg-navy/5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-ring"
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
            className={`text-left bg-white border rounded-2xl p-5 shadow-card transition-all focus-ring ${
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
      {!loading && leads.length === 0 && (
        <div className="bg-white border border-navy/10 rounded-2xl p-10 text-center shadow-card max-w-4xl">
          <span className="w-12 h-12 rounded-full bg-mist text-navy flex items-center justify-center mx-auto mb-4">
            <MessageSquareText size={22} />
          </span>
          <p className="text-sm text-ink/60 max-w-sm mx-auto">
            No leads yet — contact form submissions on the website will appear here.
          </p>
        </div>
      )}
      {!loading && leads.length > 0 && visible.length === 0 && (
        <p className="text-sm text-ink/60">No {filter} leads in this view.</p>
      )}

      <div className="space-y-4 max-w-4xl">
        {visible.map((q) => (
          <div key={q.id} className="bg-white border border-navy/10 rounded-2xl p-5 shadow-card">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="font-display text-lg text-navy">{q.name}</p>
                <p className="text-xs text-ink/50">{new Date(q.created_at).toLocaleString()}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${statusStyles[q.status] || statusStyles.new}`}>
                {q.status}
              </span>
            </div>

            {q.subject && (
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark mb-1">{q.subject}</p>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-ink/70 mb-3">
              {q.email && (
                <a href={`mailto:${q.email}`} className="flex items-center gap-1.5 hover:text-navy transition-colors">
                  <Mail size={14} /> {q.email}
                </a>
              )}
              {q.phone && (
                <a href={`tel:${q.phone}`} className="flex items-center gap-1.5 hover:text-navy transition-colors">
                  <Phone size={14} /> {q.phone}
                </a>
              )}
            </div>

            {q.message && <p className="text-sm text-ink/65 mb-4 leading-relaxed">{q.message}</p>}

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-navy/5">
              <div className="flex gap-2">
                {["new", "contacted", "closed"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(q.id, s)}
                    disabled={busyStatusId === q.id}
                    aria-busy={busyStatusId === q.id}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border capitalize transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed ${
                      q.status === s ? "bg-navy text-white border-navy" : "border-navy/15 text-ink/60 hover:border-navy/40"
                    }`}
                  >
                    {busyStatusId === q.id && q.status === s ? "Saving…" : s}
                  </button>
                ))}
              </div>

              {confirmingDelete === q.id ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDelete(q.id)}
                    disabled={deletingId === q.id}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors focus-ring disabled:opacity-50"
                  >
                    {deletingId === q.id ? "Deleting…" : "Delete"}
                  </button>
                  <button
                    onClick={() => setConfirmingDelete(null)}
                    disabled={deletingId === q.id}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-navy/15 text-ink/60 hover:border-navy/40 transition-colors focus-ring disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmingDelete(q.id)}
                  className="text-ink/40 hover:text-red-600 transition-colors focus-ring"
                  aria-label="Delete lead"
                  title="Delete lead"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}