import { useEffect, useState } from "react";
import { Trash2, Mail, Phone } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getMessages, updateMessageStatus, deleteMessage } from "../lib/api";

const statusStyles = {
  new: "bg-green/10 text-green-dark border-green/30",
  read: "bg-brass/10 text-brass-dark border-brass/30",
  archived: "bg-navy/5 text-navy/60 border-navy/15",
};

export default function Messages() {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function load() {
    setLoading(true);
    getMessages(token)
      .then(setMessages)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(load, [token]);

  async function handleStatusChange(id, status) {
    const updated = await updateMessageStatus(token, id, status);
    setMessages((ms) => ms.map((m) => (m.id === id ? updated : m)));
  }

  async function handleDelete(id) {
    if (!confirm("Delete this message? This can't be undone.")) return;
    await deleteMessage(token, id);
    setMessages((ms) => ms.filter((m) => m.id !== id));
  }

  return (
    <div className="p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-brass-dark mb-1">Manage</p>
      <h1 className="font-display text-3xl text-navy mb-8">Messages</h1>

      {error && <p className="text-sm text-red-700 mb-6">{error}</p>}
      {loading && <p className="text-sm text-ink/60">Loading...</p>}
      {!loading && messages.length === 0 && (
        <p className="text-sm text-ink/60">No messages yet — they'll show up here as soon as someone submits the Contact form.</p>
      )}

      <div className="space-y-4 max-w-4xl">
        {messages.map((m) => (
          <div key={m.id} className="bg-white border border-navy/10 rounded-sm p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="font-display text-lg text-navy">{m.name}</p>
                <p className="text-xs text-ink/50">{new Date(m.created_at).toLocaleString()}</p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border capitalize ${statusStyles[m.status] || statusStyles.new}`}>
                {m.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-ink/70 mb-3">
              <a href={`mailto:${m.email}`} className="flex items-center gap-1.5 hover:text-navy transition-colors">
                <Mail size={14} /> {m.email}
              </a>
              {m.phone && (
                <a href={`tel:${m.phone}`} className="flex items-center gap-1.5 hover:text-navy transition-colors">
                  <Phone size={14} /> {m.phone}
                </a>
              )}
              {m.subject && (
                <span className="px-2 py-0.5 bg-parchment-dark rounded-full text-xs">{m.subject}</span>
              )}
            </div>

            <p className="text-sm text-ink/65 mb-4 leading-relaxed">{m.message}</p>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-navy/5">
              <div className="flex gap-2">
                {["new", "read", "archived"].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(m.id, s)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-sm border capitalize transition-colors focus-ring ${
                      m.status === s ? "bg-navy text-white border-navy" : "border-navy/15 text-ink/60 hover:border-navy/40"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handleDelete(m.id)}
                className="text-ink/40 hover:text-red-600 transition-colors focus-ring"
                aria-label="Delete message"
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
