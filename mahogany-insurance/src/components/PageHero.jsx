import { NavLink } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PageHero({
  eyebrow,
  title,
  accent,
  description,
  image,
  children,
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep text-white">
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/90 to-navy-deep/60" aria-hidden="true" />
        </>
      )}
      {!image && (
        <>
          <div
            className="absolute -right-24 -top-24 w-96 h-96 rounded-full border border-gold/20"
            aria-hidden="true"
          />
          <div
            className="absolute -right-10 -top-10 w-64 h-64 rounded-full border border-gold/15"
            aria-hidden="true"
          />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-16 md:pt-24 md:pb-24">
        <NavLink
          to="/"
          className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors mb-8 focus-ring rounded"
        >
          <ArrowLeft size={13} /> Home
        </NavLink>
        <span className="eyebrow text-gold mb-6">
          <span className="w-8 h-px bg-current opacity-70" aria-hidden="true" />
          {eyebrow}
        </span>
        <h1 className="font-hero text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] max-w-3xl">
          {title} {accent && <span className="text-gold font-semibold">{accent}</span>}
        </h1>
        {description && (
          <p className="text-white/70 text-lg leading-relaxed max-w-2xl mt-6">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
