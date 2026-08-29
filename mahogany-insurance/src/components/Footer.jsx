import { NavLink } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight, ShieldCheck } from "lucide-react";
import { NAV_LINKS } from "../data/site";
import { useSiteContent } from "../site/SiteContentContext";

export default function Footer() {
  const { site } = useSiteContent();
  return (
    <footer className="bg-navy-deep text-white/80 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-14 pb-10 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <div className="flex items-center gap-3 mb-5">
            <svg width="44" height="44" viewBox="0 0 64 64" aria-hidden="true">
              <defs>
                <linearGradient id="mib-mark-dark" x1="0" y1="0" x2="64" y2="64">
                  <stop offset="0%" stopColor="#0F6B4F" />
                  <stop offset="100%" stopColor="#0A4E3A" />
                </linearGradient>
              </defs>
              <rect width="64" height="64" rx="14" fill="url(#mib-mark-dark)" />
              <rect x="1" y="1" width="62" height="62" rx="13" fill="none" stroke="#16A5B1" strokeOpacity="0.6" strokeWidth="1" />
              <text x="32" y="42" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="30" fontWeight="600" fill="#FAF8F3">M</text>
              <circle cx="50" cy="14" r="5" fill="#16A5B1" />
            </svg>
            <span className="leading-none">
              <span className="font-display text-xl font-semibold text-white block">Mahogany</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold block mt-1">
                Insurance Brokers
              </span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white/55 max-w-sm">
            A licensed insurance brokerage in Blantyre, Malawi. We compare across
            Malawi's leading insurers and stand by our clients through renewals and claims.
          </p>
          <div className="inline-flex items-center gap-2 mt-6 text-xs text-white/45 border border-white/15 rounded-full px-4 py-2">
            <ShieldCheck size={14} className="text-gold" />
            Registered with the Insurance Institute of Malawi
          </div>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-gold mb-5">Explore</h3>
          <ul className="space-y-3 text-sm">
            {NAV_LINKS.map((l) => (
              l.children ? (
                <li key={l.to}>
                  <NavLink to={l.to} className="group inline-flex items-center gap-1 text-white hover:text-white transition-colors focus-ring rounded">
                    {l.label} <ArrowUpRight size={13} className="opacity-0 -ml-3 group-hover:opacity-100 transition-all" />
                  </NavLink>
                  <ul className="mt-2 space-y-2 border-l border-white/10 ml-1.5 pl-3">
                    {l.children.map((c) => (
                      <li key={c.to}>
                        <NavLink to={c.to} className="inline-flex items-center gap-1 text-white/55 hover:text-white transition-colors focus-ring rounded">
                          {c.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={l.to}>
                  <NavLink to={l.to} className="group inline-flex items-center gap-1 text-white/60 hover:text-white transition-colors focus-ring rounded">
                    {l.label} <ArrowUpRight size={13} className="opacity-0 -ml-3 group-hover:opacity-100 transition-all" />
                  </NavLink>
                </li>
              )
            ))}
          </ul>
        </div>

        <div className="md:col-span-5">
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-gold mb-5">Reach Us</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="shrink-0 mt-0.5 text-gold" />
              <span className="text-white/60">{site.address}<br />{site.city}</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-gold" />
              <a href={site.phoneHref} className="text-white/60 hover:text-white transition-colors">{site.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-gold" />
              <a href={`mailto:${site.email}`} className="text-white/60 hover:text-white transition-colors break-all">{site.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <p>© {new Date().getFullYear()} {site.name} Limited. Licensed insurance broker, Malawi.</p>
          <p>Compared across the market · Claims supported · Client-first</p>
        </div>
      </div>
    </footer>
  );
}
