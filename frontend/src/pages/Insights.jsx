import { useState } from "react";
import { ArrowRight, ChevronDown, Newspaper } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { INSIGHTS_ARTICLES, TIPS, FAQS, IMAGES } from "../data/site";

export default function Insights() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div>
      <PageHero
        title="Insurance,"
        accent="explained simply."
        description="Guides, tips and answers — written in plain language, so you can make decisions with confidence."
        image={IMAGES.documents}
      />

      {/* Featured Insights */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading
            eyebrow="Featured Insights"
            title="Read Up Before"
            accent="You Decide."
            className="mb-12"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {INSIGHTS_ARTICLES.map((article, idx) => (
              <Reveal
                key={article.title}
                delay={idx * 100}
                className="group bg-mist border border-navy/8 rounded-2xl p-7 hover:bg-white hover:shadow-lift hover:border-gold/40 transition-all flex flex-col"
              >
                <div className="flex items-center gap-2.5 mb-5">
                  <Newspaper size={17} className="text-gold-dark" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">
                    {article.category}
                  </span>
                </div>
                <h3 className="font-display text-xl text-charcoal font-bold leading-snug mb-3">
                  {article.title}
                </h3>
                <p className="text-sm text-charcoal/60 leading-relaxed mb-6 flex-1">
                  {article.body}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-charcoal/45">{article.date}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy group-hover:gap-2.5 transition-all">
                    Read <ArrowRight size={15} />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Tips */}
      <section className="py-20 md:py-24 bg-navy-deep text-white grain relative overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading
            tone="dark"
            eyebrow="Insurance Tips"
            title="Six Things Worth"
            accent="Knowing."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TIPS.map((tip, idx) => (
              <Reveal
                key={tip.title}
                delay={(idx % 3) * 90}
                className="bg-white/[0.04] border border-white/10 rounded-2xl p-7 hover:bg-white/[0.07] transition-colors"
              >
                <span className="font-display text-3xl font-light text-gold mb-4 block">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl mb-2">{tip.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{tip.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 md:py-24 bg-mist">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <SectionHeading
            eyebrow="FAQs"
            title="Frequently Asked"
            accent="Questions."
            className="mb-12"
          />
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <Reveal key={faq.q} delay={idx * 60}>
                <div className="bg-white border border-navy/8 rounded-2xl overflow-hidden hover:border-gold/40 transition-colors">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left focus-ring"
                    aria-expanded={openFaq === idx}
                  >
                    <h3 className="font-display text-lg text-charcoal">{faq.q}</h3>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-charcoal/40 transition-transform duration-300 ${
                        openFaq === idx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      openFaq === idx ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-7 pb-5 text-sm text-charcoal/60 leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
