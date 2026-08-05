import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MailQuestion, Clock, CheckCircle2, ArrowRight, FileText, Users } from "lucide-react";
import { getQuotes } from "../lib/api";

export default function Dashboard() {
  const [quotes, setQuotes] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getQuotes().then(setQuotes).catch((err) => setError(err.message));
  }, []);

  const counts = quotes
    ? {
        new: quotes.filter((q) => q.status === "new").length,
        contacted: quotes.filter((q) => q.status === "contacted").length,
        closed: quotes.filter((q) => q.status === "closed").length,
      }
    : null;

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

      <div className="grid sm:grid-cols-3 gap-5">
        <Link
          to="/admin/quotes"
          className="flex items-center justify-between bg-navy text-white rounded-sm p-6 hover:bg-navy-dark transition-colors"
        >
          <div>
            <p className="font-display text-lg mb-1">Quote Requests</p>
            <p className="text-sm text-white/65">Review and follow up on incoming requests</p>
          </div>
          <ArrowRight size={20} />
        </Link>
        <Link
          to="/admin/content"
          className="flex items-center justify-between bg-white border border-navy/10 rounded-sm p-6 hover:border-green/50 transition-colors"
        >
          <div>
            <p className="font-display text-lg text-navy mb-1 flex items-center gap-2"><FileText size={18} className="text-brass" /> Site Content</p>
            <p className="text-sm text-ink/60">Edit contact details, FAQs, news & tips</p>
          </div>
          <ArrowRight size={20} className="text-navy" />
        </Link>
        <Link
          to="/admin/users"
          className="flex items-center justify-between bg-white border border-navy/10 rounded-sm p-6 hover:border-green/50 transition-colors"
        >
          <div>
            <p className="font-display text-lg text-navy mb-1 flex items-center gap-2"><Users size={18} className="text-brass" /> Admin Users</p>
            <p className="text-sm text-ink/60">Manage who can sign in</p>
          </div>
          <ArrowRight size={20} className="text-navy" />
        </Link>
      </div>
    </div>
  );
}
