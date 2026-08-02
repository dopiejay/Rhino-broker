import { STATS } from "../data/site";
import { useCountUp, useInView } from "../hooks/useInView";

function Stat({ stat, inView }) {
  const value = useCountUp(stat.value, 0, inView);
  return (
    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <div className="font-display text-5xl md:text-6xl font-light text-white tracking-tight">
        <span className="tabular-nums">{value.toLocaleString()}</span>
        <span className="text-gold">{stat.suffix}</span>
      </div>
      <div className="w-8 h-px bg-gold/50 mt-4 mb-3" aria-hidden="true" />
      <p className="text-sm text-white/65 leading-snug">{stat.label}</p>
    </div>
  );
}

export default function StatsBand() {
  const { ref, inView } = useInView({ threshold: 0.4 });

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 px-2"
    >
      {STATS.map((s) => (
        <Stat key={s.label} stat={s} inView={inView} />
      ))}
    </div>
  );
}
