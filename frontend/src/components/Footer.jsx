import { NavLink } from "react-router-dom";
import { Phone, Mail, MapPin, ShieldCheck } from "lucide-react";
import { useSiteContent } from "../site/SiteContentContext";

const EXPLORE = [
  { label: "About", to: "/about" },
  { label: "Insurance Solutions", to: "/services" },
  { label: "Insights", to: "/insights" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  const { site } = useSiteContent();
  return (
    <footer className="bg-charcoal text-white/80 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-14 pb-10 grid md:grid-cols-12 gap-12">
        {/* Left — Branding */}
        <div className="md:col-span-4">
          <div className="flex items-center gap-3 mb-5">
            <span className="leading-none">
              <span className="font-display text-xl font-semibold text-white block">Rhino</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold block mt-1">
                Insurance Brokers
              </span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-white/55 max-w-sm">
            Strong protection. Smarter decisions.
          </p>
          <div className="inline-flex items-center gap-2 mt-6 text-xs text-white/45 border border-white/15 rounded-full px-4 py-2">
            <ShieldCheck size={14} className="text-gold" />
            Registered with the Insurance Institute of Malawi
          </div>
        </div>

        {/* Middle — Explore */}
        <div className="md:col-span-4 md:pl-8">
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-gold mb-5">Explore</h3>
          <ul className="space-y-3 text-sm">
            {EXPLORE.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className="text-white/60 hover:text-white transition-colors focus-ring rounded"
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — Contact */}
        <div className="md:col-span-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-gold mb-5">Contact</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-gold" />
              <a href={site.phoneHref} className="text-white/60 hover:text-white transition-colors">{site.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="shrink-0 text-gold" />
              <a href={site.phone2Href} className="text-white/60 hover:text-white transition-colors">{site.phone2}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="shrink-0 text-gold" />
              <a href="mailto:rhinoinfo@rhinoinsurancemw.com" className="text-white/60 hover:text-white transition-colors break-all">
                rhinoinfo@rhinoinsurancemw.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={16} className="shrink-0 mt-0.5 text-gold" />
              <span className="text-white/60">{site.address}<br />{site.city}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <p>&copy; 2026 Rhino Insurance Brokers and Consulting Company Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <NavLink to="#" className="hover:text-white/60 transition-colors">Privacy Policy</NavLink>
            <NavLink to="#" className="hover:text-white/60 transition-colors">Terms of Use</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
