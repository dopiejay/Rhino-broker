import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  tone = "light",
  className = "",
  accentClass = "text-gold",
}) {
  const alignCls = align === "center" ? "text-center mx-auto items-center" : "text-left";
  const eyebrowTone = tone === "dark" ? "text-gold" : "text-gold-dark";
  const titleTone = tone === "dark" ? "text-white" : "text-navy";
  const descTone = tone === "dark" ? "text-white/70" : "text-charcoal/65";

  return (
    <Reveal className={`max-w-3xl flex flex-col ${alignCls} ${className}`}>
      <span className={`eyebrow ${eyebrowTone} mb-5`}>
        <span className="w-8 h-px bg-current opacity-70" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className={`font-display text-3xl md:text-5xl leading-[1.08] tracking-tight ${titleTone}`}>
        {title}{" "}
        {accent && <span className={`${accentClass} font-normal`}>{accent}</span>}
      </h2>
      {description && (
        <p className={`mt-5 text-base md:text-lg leading-relaxed ${descTone} max-w-2xl ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
