import { useState, useEffect, useRef, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight, ImageIcon, ShieldCheck } from "lucide-react";
import { useSiteContent } from "../site/SiteContentContext";

const REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function HeroSlider() {
  const { site, heroSlides } = useSiteContent();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(null);

  const idx = active % heroSlides.length;
  const slide = heroSlides[idx];
  const autoRotate = !REDUCED_MOTION && !paused;

  const goTo = useCallback(
    (next) => setActive(((next % heroSlides.length) + heroSlides.length) % heroSlides.length),
    [heroSlides.length]
  );

  useEffect(() => {
    if (!autoRotate) return;
    const id = setInterval(() => setActive((a) => (a + 1) % heroSlides.length), 7000);
    return () => clearInterval(id);
  }, [autoRotate, heroSlides.length]);

  // Touch / swipe support. Only attach when a touchscreen is present.
  useEffect(() => {
    const isTouch = window.matchMedia?.("(pointer: coarse)").matches || "ontouchstart" in window;
    if (!isTouch) return;

    function onTouchStart(e) {
      touchStart.current = e.touches[0].clientX;
      setPaused(true);
    }
    function onTouchMove(e) {
      if (touchStart.current == null) return;
      const dx = e.touches[0].clientX - touchStart.current;
      if (Math.abs(dx) > 50) {
        goTo(dx < 0 ? active + 1 : active - 1);
        touchStart.current = null;
      }
    }
    function onTouchEnd() {
      touchStart.current = null;
      setTimeout(() => setPaused(false), 6000);
    }

    const el = document.getElementById("hero-slider");
    el?.addEventListener("touchstart", onTouchStart, { passive: true });
    el?.addEventListener("touchmove", onTouchMove, { passive: true });
    el?.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el?.removeEventListener("touchstart", onTouchStart);
      el?.removeEventListener("touchmove", onTouchMove);
      el?.removeEventListener("touchend", onTouchEnd);
    };
  }, [active, goTo]);

  const isExternal = (to) => /^(tel:|mailto:|https?:)/.test(to);

  const renderCta = (c, primary) => {
    const cls = primary
      ? "group inline-flex items-center gap-2.5 bg-emerald text-navy font-semibold text-sm px-6 sm:px-7 py-3.5 sm:py-4 rounded-full hover:bg-emerald-light transition-colors focus-ring"
      : "inline-flex items-center gap-2.5 border border-white/30 text-white font-semibold text-sm px-6 sm:px-7 py-3.5 sm:py-4 rounded-full hover:bg-white/10 transition-colors focus-ring";
    const inner = isExternal(c.to) ? (
      c.label
    ) : (
      <>
        {c.label}
        {primary && (
          <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
        )}
      </>
    );
    if (isExternal(c.to)) {
      return (
        <a href={c.to} className={cls}>
          {inner}
        </a>
      );
    }
    return <NavLink to={c.to} className={cls}>{inner}</NavLink>;
  };

  return (
    <section
      id="hero-slider"
      className="relative h-[84vh] min-h-[560px] max-h-[860px] overflow-hidden bg-navy-deep text-white"
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
          {s.image ? (
            <img
              src={s.image}
              alt={s.alt}
              className={`w-full h-full object-cover ${i === idx ? "animate-kenburns" : ""}`}
              loading={i === 0 ? "eager" : "lazy"}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-navy-deep">
              <div className="flex flex-col items-center gap-3 px-6 py-10 border border-dashed border-white/25 rounded-sm text-center">
                <ImageIcon size={30} strokeWidth={1.5} className="text-white/40" />
                <p className="text-xs font-medium leading-snug text-white/50 max-w-xs">
                  Slide {i + 1} background image goes here — drop an image into src/assets and set
                  it in HERO_SLIDES in src/data/site.js
                </p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/75 via-navy-deep/55 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-5 md:px-8 flex items-center">
        <div className="max-w-3xl pb-16 sm:pb-20" key={idx}>
          <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold bg-white/5 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-2 animate-fadeup">
            <ShieldCheck size={13} />
            {slide.eyebrow}
          </span>

          <h1 className="font-hero text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight mt-6 sm:mt-7 animate-fadeup">
            {slide.title[0]}{" "}
            <span className="text-gold font-semibold">{slide.title[1]}</span>
          </h1>

          <p className="text-white text-base sm:text-lg md:text-xl leading-snug max-w-xl mt-5 sm:mt-6 animate-fadeup">
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-7 sm:mt-9 animate-fadeup">
            {renderCta(slide.cta, true)}
            {renderCta(slide.cta2, false)}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute z-10 left-5 md:left-8 bottom-5 sm:bottom-8 flex items-center gap-2" role="tablist" aria-label="Choose slide">
        {heroSlides.map((s, i) => (
          <button
            key={s.title[0]}
            role="tab"
            tabIndex={paused || i === idx ? 0 : -1}
            onClick={() => goTo(i)}
            aria-label={`Show slide ${i + 1}: ${s.title[0]} ${s.title[1]}`}
            aria-selected={i === idx}
            aria-current={i === idx ? "true" : undefined}
            className={`h-1 rounded-full transition-all duration-500 focus-ring ${
              i === idx ? "w-12 bg-gold" : "w-4 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Accessibility note for the phone */}
      <span className="sr-only">
        {site.name} — licensed insurance brokerage in {site.city}.
      </span>
    </section>
  );
}
