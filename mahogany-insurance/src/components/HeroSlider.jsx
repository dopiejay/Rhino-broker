import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { useSiteContent } from "../site/SiteContentContext";

export default function HeroSlider() {
  const { site, heroSlides } = useSiteContent();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % heroSlides.length), 7000);
    return () => clearInterval(id);
  }, [paused, heroSlides.length]);

  const idx = active % heroSlides.length;
  const slide = heroSlides[idx];

  return (
    <section
      className="relative h-[92vh] min-h-[600px] max-h-[860px] overflow-hidden bg-navy-deep text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {heroSlides.map((s, i) => (
        <div
          key={s.title[0]}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== idx}
        >
          <img
            src={s.image}
            alt={s.alt}
            className={`w-full h-full object-cover ${i === idx ? "animate-kenburns" : ""}`}
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-navy-deep/35" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-5 md:px-8 flex items-center">
        <div className="max-w-3xl" key={idx}>
          <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold bg-white/5 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2 animate-fadeup">
            <ShieldCheck size={13} />
            {slide.eyebrow}
          </span>

          <h1 className="font-display text-5xl md:text-7xl font-light leading-[1.02] tracking-tight mt-7 animate-fadeup">
            {slide.title[0]}{" "}
            <em className="text-gold italic font-light">{slide.title[1]}</em>
          </h1>

          <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-xl mt-6 animate-fadeup">
            {slide.body}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-9 animate-fadeup">
            <NavLink
              to={slide.cta.to}
              className="group inline-flex items-center gap-2.5 bg-emerald text-white font-semibold text-sm px-7 py-4 rounded-full hover:bg-emerald-dark transition-colors focus-ring"
            >
              {slide.cta.label}
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </NavLink>
            <NavLink
              to={slide.cta2.to}
              className="inline-flex items-center gap-2.5 border border-white/30 text-white font-semibold text-sm px-7 py-4 rounded-full hover:bg-white/10 transition-colors focus-ring"
            >
              {slide.cta2.label}
            </NavLink>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute z-10 left-5 md:left-8 bottom-10 flex items-center gap-4">
        {heroSlides.map((s, i) => (
          <button
            key={s.title[0]}
            onClick={() => setActive(i)}
            aria-label={`Show slide ${i + 1}: ${s.title[0]} ${s.title[1]}`}
            className={`h-1 rounded-full transition-all duration-500 focus-ring ${
              i === idx ? "w-12 bg-gold" : "w-4 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <div className="absolute z-10 right-5 md:right-8 bottom-10 font-display text-sm text-white/60 tracking-widest">
        <span className="text-gold text-lg">{String(idx + 1).padStart(2, "0")}</span>
        <span className="mx-1.5 opacity-50">/</span>
        {String(heroSlides.length).padStart(2, "0")}
      </div>

      {/* Accessibility note for the phone */}
      <span className="sr-only">
        {site.name} — licensed insurance brokerage in {site.city}.
      </span>
    </section>
  );
}
