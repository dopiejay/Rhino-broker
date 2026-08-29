import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, ArrowRight, ChevronDown, Check } from "lucide-react";
import { NAV_LINKS, SITE } from "../data/site";
import { useSiteContent } from "../site/SiteContentContext";

function Logo({ onClick }) {
  return (
    <NavLink to="/" onClick={onClick} className="flex items-center gap-3 focus-ring rounded group" aria-label={`${SITE.name} — home`}>
      <svg width="44" height="44" viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
        <defs>
          <linearGradient id="mib-mark" x1="0" y1="0" x2="64" y2="64">
            <stop offset="0%" stopColor="#0F6B4F" />
            <stop offset="100%" stopColor="#0A4E3A" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="14" fill="url(#mib-mark)" />
        <rect x="1" y="1" width="62" height="62" rx="13" fill="none" stroke="#16A5B1" strokeOpacity="0.55" strokeWidth="1" />
        <text x="32" y="42" textAnchor="middle" fontFamily="Outfit, sans-serif" fontSize="30" fontWeight="600" fill="#FAF8F3">M</text>
        <circle cx="50" cy="14" r="5" fill="#16A5B1" />
      </svg>
      <span className="leading-none">
        <span className="font-display text-xl font-semibold text-navy tracking-tight block">
          Mahogany
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-ink block mt-1">
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
  const [navOpen, setNavOpen] = useState(false); // desktop dropdown
  const [aboutOpen, setAboutOpen] = useState(false); // mobile accordion
  const closeTimer = useRef(null);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setAboutOpen(false);
    setNavOpen(false);
    return () => clearTimeout(closeTimer.current);
  }, [pathname]);

  // Close the desktop dropdown when clicking outside it.
  useEffect(() => {
    if (!navOpen) return;
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setNavOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [navOpen]);

  const openNav = () => {
    clearTimeout(closeTimer.current);
    setNavOpen(true);
  };
  const scheduleCloseNav = () => {
    closeTimer.current = setTimeout(() => setNavOpen(false), 200);
  };
  const cancelCloseNav = () => clearTimeout(closeTimer.current);

  // Keyboard navigation inside the dropdown.
  function onDropdownKeyDown(e, index, items) {
    if (e.key === "Escape") {
      setNavOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const delta = e.key === "ArrowDown" ? 1 : -1;
    const next = (index + delta + items.length) % items.length;
    const els = dropdownRef.current?.querySelectorAll("[data-dropdown-item]");
    els?.[next]?.focus();
  }

  const aboutActive = pathname === "/about" || pathname === "/team";

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-white shadow-[0_1px_0_rgba(11,31,58,0.08),0_12px_32px_-16px_rgba(11,31,58,0.25)]"
          : "bg-white border-b border-navy/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-[76px]">
        <Logo onClick={() => setOpen(false)} />

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) =>
            l.children ? (
              <div
                key={l.to}
                className="relative"
                ref={dropdownRef}
                onMouseEnter={openNav}
                onMouseLeave={scheduleCloseNav}
              >
                <NavLink
                  ref={triggerRef}
                  to={l.to}
                  aria-haspopup="menu"
                  aria-expanded={navOpen}
                  onMouseEnter={cancelCloseNav}
                  onClick={() => setNavOpen(true)}
                  className={`inline-flex items-center gap-1.5 relative text-sm font-medium tracking-wide transition-colors focus-ring rounded py-2 ${
                    aboutActive ? "text-navy" : "text-charcoal/60 hover:text-navy"
                  }`}
                >
                  {l.label}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${navOpen ? "rotate-180 text-emerald-ink" : aboutActive ? "text-emerald-ink" : "text-charcoal/40"}`}
                  />
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[2px] bg-emerald transition-all duration-300 ${
                      aboutActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    aria-hidden="true"
                  />
                </NavLink>

                {navOpen && (
                  <div
                    role="menu"
                    aria-label={l.label}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50"
                    onMouseEnter={cancelCloseNav}
                    onMouseLeave={scheduleCloseNav}
                  >
                    <div className="bg-white border border-navy/10 rounded-2xl shadow-lift p-2 w-60">
                      {l.children.map((c, i) => (
                        <NavLink
                          key={c.to}
                          to={c.to}
                          data-dropdown-item="true"
                          role="menuitem"
                          tabIndex={0}
                          onKeyDown={(e) => onDropdownKeyDown(e, i, l.children)}
                          className={({ isActive }) =>
                            `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors focus-ring ${
                            isActive
                              ? "bg-emerald-soft text-navy"
                              : "text-charcoal/75 hover:bg-cream-dark hover:text-navy"
                            }`
                          }
                        >
                          {c.label}
                          {pathname === c.to && <Check size={15} className="text-emerald-ink" />}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
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
                      className={`absolute -bottom-0.5 left-0 h-[2px] bg-emerald transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                      aria-hidden="true"
                    />
                  </>
                )}
              </NavLink>
            )
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          
          <NavLink
            to="/quote"
            className="group inline-flex items-center gap-2 bg-emerald text-navy text-sm font-semibold px-6 py-3 rounded-full hover:bg-emerald-light transition-colors focus-ring"
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
          {NAV_LINKS.map((l) =>
            l.children ? (
              <div key={l.to} className="border-b border-navy/5">
                <button
                  onClick={() => setAboutOpen(!aboutOpen)}
                  aria-expanded={aboutOpen}
                  className="w-full py-3.5 text-base font-medium flex items-center justify-between text-charcoal/80 focus-ring"
                >
                  {l.label}
                  <ChevronDown size={17} className={`transition-transform ${aboutOpen ? "rotate-180 text-emerald-ink" : "opacity-40"}`} />
                </button>
                {aboutOpen && (
                  <div className="pb-3 space-y-1">
                    {l.children.map((c) => (
                      <NavLink
                        key={c.to}
                        to={c.to}
                        className={({ isActive }) =>
                          `block pl-5 py-2.5 text-sm font-medium rounded-lg transition-colors focus-ring ${
                            isActive ? "text-navy bg-emerald-soft" : "text-charcoal/65 hover:text-navy"
                          }`
                        }
                      >
                        {c.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `py-3.5 text-base font-medium border-b border-navy/5 flex items-center justify-between ${
                    isActive ? "text-gold-dark" : "text-charcoal/80"
                  }`
                }
              >
                {l.label}
                <ArrowRight size={16} className="opacity-40" />
              </NavLink>
            )
          )}
          <NavLink
            to="/quote"
            className="mt-5 bg-emerald text-navy text-sm font-semibold px-6 py-3.5 rounded-full text-center flex items-center justify-center gap-2"
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
