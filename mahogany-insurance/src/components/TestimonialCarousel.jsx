import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "../data/site";

export default function TestimonialCarousel() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];

  const prev = () => setI((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setI((v) => (v + 1) % TESTIMONIALS.length);

  return (
    <div className="relative">
      <div className="bg-white border border-navy/10 rounded-2xl p-8 md:p-12 shadow-card">
        <Quote size={36} className="text-gold mb-6" fill="currentColor" strokeWidth={0} />
        <blockquote key={i} className="font-display text-xl md:text-2xl leading-relaxed text-navy animate-fadeup">
          “{t.quote}”
        </blockquote>
        <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="font-display text-navy font-semibold">{t.name}</p>
            <p className="text-sm text-charcoal/55 mt-0.5">{t.role}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-navy/15 text-navy flex items-center justify-center hover:bg-navy hover:text-white transition-colors focus-ring"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-navy/15 text-navy flex items-center justify-center hover:bg-navy hover:text-white transition-colors focus-ring"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {TESTIMONIALS.map((t2, idx) => (
          <button
            key={t2.name}
            onClick={() => setI(idx)}
            aria-label={`Show testimonial ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-500 focus-ring ${
              idx === i ? "w-8 bg-gold" : "w-1.5 bg-navy/20 hover:bg-navy/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
