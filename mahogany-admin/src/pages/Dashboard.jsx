import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MailQuestion, Clock, CheckCircle2, ArrowRight, FileText, MessageSquare } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getQuotes, getMessages } from "../lib/api";

export default function Dashboard() {
  const { token } = useAuth();
  const [quotes, setQuotes] = useState(null);
  const [messages, setMessages] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getQuotes(token).then(setQuotes).catch((err) => setError(err.message));
    getMessages(token).then(setMessages).catch(() => {});
  }, [token]);

  const counts = quotes
    ? {
        new: quotes.filter((q) => q.status === "new").length,
        contacted: quotes.filter((q) => q.status === "contacted").length,
        closed: quotes.filter((q) => q.status === "closed").length,
      }
    : null;

  const newMessages = messages ? messages.filter((m) => m.status === "new").length : null;

  return (
    <div className="p-8 max-w-5xl">
      <p className="text-xs font-semibold uppercase tracking-widest text-brass-dark mb-1">Overview</p>
      <h1 className="font-display text-3xl text-navy mb-8">Dashboard</h1>

      {error && <p className="text-sm text-red-700 mb-6">{error}</p>}

      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        <div className="bg-white border border-navy/10 rounded-sm p-6">
          <MailQuestion className="text-green mb-3" size={22} />
          <p className="text-3xl font-display text-navy">{counts ? counts.new : "—"}</p>
          <p className="text-sm text-ink/60">New quote requests</p>
        </div>
        <div className="bg-white border border-navy/10 rounded-sm p-6">
          <Clock className="text-brass mb-3" size={22} />
          <p className="text-3xl font-display text-navy">{counts ? counts.contacted : "—"}</p>
          <p className="text-sm text-ink/60">Contacted, awaiting close</p>
        </div>
        <div className="bg-white border border-navy/10 rounded-sm p-6">
          <CheckCircle2 className="text-navy mb-3" size={22} />
          <p className="text-3xl font-display text-navy">{counts ? counts.closed : "—"}</p>
          <p className="text-sm text-ink/60">Closed</p>
        </div>
      </div>

      <div className="bg-white border border-navy/10 rounded-sm p-6 mb-10 max-w-sm">
        <MessageSquare className="text-brass mb-3" size={22} />
        <p className="text-3xl font-display text-navy">{newMessages === null ? "—" : newMessages}</p>
        <p className="text-sm text-ink/60">Unread contact-form messages</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Link
          to="/quotes"
          className="flex items-center justify-between bg-navy text-white rounded-sm p-6 hover:bg-navy-dark transition-colors"
        >
          <div>
            <p className="font-display text-lg mb-1">Quote Requests</p>
            <p className="text-sm text-white/65">Review and follow up on incoming requests</p>
          </div>
          <ArrowRight size={20} />
        </Link>
        <Link
          to="/messages"
          className="flex items-center justify-between bg-white border border-navy/10 rounded-sm p-6 hover:border-green/50 transition-colors"
        >
          <div>
            <p className="font-display text-lg text-navy mb-1 flex items-center gap-2"><MessageSquare size={18} className="text-brass" /> Messages</p>
            <p className="text-sm text-ink/60">Messages sent from the Contact page</p>
          </div>
          <ArrowRight size={20} className="text-navy" />
        </Link>
        <Link
          to="/content"
          className="flex items-center justify-between bg-white border border-navy/10 rounded-sm p-6 hover:border-green/50 transition-colors"
        >
          <div>
            <p className="font-display text-lg text-navy mb-1 flex items-center gap-2"><FileText size={18} className="text-brass" /> Site Content</p>
            <p className="text-sm text-ink/60">Edit text across the public website</p>
          </div>
          <ArrowRight size={20} className="text-navy" />
        </Link>
      </div>
    </div>
  );
}
