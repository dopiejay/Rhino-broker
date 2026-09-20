import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAV_LINKS, SITE } from "../data/site";
import { useSiteContent } from "../site/SiteContentContext";

function Logo({ onClick }) {
  return (
    <NavLink to="/" onClick={onClick} className="flex items-center gap-3 focus-ring rounded group" aria-label={`${SITE.name} — home`}>
      <span className="leading-none">
        <span className="font-display text-xl font-extrabold text-navy tracking-tight block">
          Rhino
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold block mt-1">
          Insurance Brokers
        </span>
      </span>
    </NavLink>
  );
}

export default function Navbar() {
  const { site } = useSiteContent();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-white shadow-[0_1px_0_rgba(0,61,37,0.08),0_12px_32px_-16px_rgba(0,61,37,0.25)]"
          : "bg-white border-b border-navy/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-[76px]">
        <Logo onClick={() => setOpen(false)} />

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `group relative text-sm font-medium tracking-wide transition-colors focus-ring rounded py-2 ${
                  isActive ? "text-navy" : "text-charcoal/60 hover:text-navy"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] bg-steel transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    aria-hidden="true"
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <NavLink
            to="/quote"
            className="group inline-flex items-center gap-2 bg-navy text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-navy-dark transition-colors focus-ring"
          >
            Request a Quote
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </NavLink>
        </div>

        <button
          className="lg:hidden text-navy focus-ring rounded p-2"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-navy/10 bg-white px-5 pb-8 pt-2 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `py-3.5 text-base font-medium border-b border-navy/5 flex items-center justify-between ${
                  isActive ? "text-navy" : "text-charcoal/80"
                }`
              }
            >
              {l.label}
              <ArrowRight size={16} className="opacity-40" />
            </NavLink>
          ))}
          <NavLink
            to="/quote"
            className="mt-5 bg-navy text-white text-sm font-semibold px-6 py-3.5 rounded-full text-center flex items-center justify-center gap-2"
          >
            Request a Quote <ArrowRight size={15} />
          </NavLink>
          <a href={site.phoneHref} className="mt-3 text-center text-sm text-charcoal/60 font-medium">
            {site.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
