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
      <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark mb-1">Overview</p>
      <h1 className="font-display text-3xl text-charcoal mb-8">Dashboard</h1>

      {error && <p className="text-sm text-red-700 mb-6">{error}</p>}

      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        <Link
          to="/admin/quotes?status=new"
          className="group bg-white border border-navy/10 rounded-2xl p-6 shadow-card hover:-translate-y-0.5 hover:shadow-lift transition-all"
        >
          <span className="w-11 h-11 rounded-xl bg-steel/10 text-steel flex items-center justify-center mb-4">
            <MailQuestion size={22} />
          </span>
          <p className="text-3xl font-display text-navy">{counts ? counts.new : "—"}</p>
          <p className="text-sm text-ink/60 group-hover:text-navy transition-colors">New quote requests</p>
        </Link>
        <Link
          to="/admin/quotes?status=contacted"
          className="group bg-white border border-navy/10 rounded-2xl p-6 shadow-card hover:-translate-y-0.5 hover:shadow-lift transition-all"
        >
          <span className="w-11 h-11 rounded-xl bg-gold/10 text-gold flex items-center justify-center mb-4">
            <Clock size={22} />
          </span>
          <p className="text-3xl font-display text-navy">{counts ? counts.contacted : "—"}</p>
          <p className="text-sm text-ink/60 group-hover:text-navy transition-colors">Contacted, awaiting close</p>
        </Link>
        <Link
          to="/admin/quotes?status=closed"
          className="group bg-white border border-navy/10 rounded-2xl p-6 shadow-card hover:-translate-y-0.5 hover:shadow-lift transition-all"
        >
          <span className="w-11 h-11 rounded-xl bg-navy/10 text-navy flex items-center justify-center mb-4">
            <CheckCircle2 size={22} />
          </span>
          <p className="text-3xl font-display text-navy">{counts ? counts.closed : "—"}</p>
          <p className="text-sm text-ink/60 group-hover:text-navy transition-colors">Closed</p>
        </Link>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <Link
          to="/admin/quotes"
          className="flex items-center justify-between bg-navy text-white rounded-2xl p-6 hover:bg-navy-dark hover:shadow-lift transition-all"
        >
          <div>
            <p className="font-display text-lg mb-1">Quote Requests</p>
            <p className="text-sm text-white/65">Review and follow up on incoming requests</p>
          </div>
          <ArrowRight size={20} className="shrink-0" />
        </Link>
        <Link
          to="/admin/content"
          className="flex items-center justify-between bg-white border border-navy/10 rounded-2xl p-6 shadow-card hover:-translate-y-0.5 hover:shadow-lift transition-all"
        >
          <div>
            <p className="font-display text-lg text-navy mb-1 flex items-center gap-2"><FileText size={18} className="text-gold" /> Site Content</p>
            <p className="text-sm text-ink/60">Edit contact details, FAQs, news & tips</p>
          </div>
          <ArrowRight size={20} className="text-navy shrink-0" />
        </Link>
        <Link
          to="/admin/users"
          className="flex items-center justify-between bg-white border border-navy/10 rounded-2xl p-6 shadow-card hover:-translate-y-0.5 hover:shadow-lift transition-all"
        >
          <div>
            <p className="font-display text-lg text-navy mb-1 flex items-center gap-2"><Users size={18} className="text-gold" /> Admin Users</p>
            <p className="text-sm text-ink/60">Manage who can sign in</p>
          </div>
          <ArrowRight size={20} className="text-navy shrink-0" />
        </Link>
      </div>
    </div>
  );
}
