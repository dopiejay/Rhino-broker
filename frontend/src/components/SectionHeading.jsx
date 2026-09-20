import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  tone = "light",
  className = "",
}) {
  const alignCls = align === "center" ? "text-center mx-auto items-center" : "text-left";
  const eyebrowTone = "text-gold";
  const titleTone = tone === "dark" ? "text-white" : "text-charcoal";
  const descTone = tone === "dark" ? "text-white/70" : "text-charcoal/65";
  const accentTone = tone === "dark" ? "text-white" : "text-charcoal";

  return (
    <Reveal className={`max-w-3xl flex flex-col ${alignCls} ${className}`}>
      {eyebrow && (
        <span className={`eyebrow ${eyebrowTone} mb-5`}>{eyebrow}</span>
      )}
      <h2 className={`font-display font-bold text-3xl md:text-5xl leading-[1.08] tracking-tight ${titleTone}`}>
        {title}{" "}
        {accent && <span className={accentTone}>{accent}</span>}
      </h2>
      {description && (
        <p className={`mt-5 text-base md:text-lg leading-relaxed ${descTone} max-w-2xl ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
