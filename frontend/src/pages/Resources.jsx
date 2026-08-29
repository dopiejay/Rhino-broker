import { ArrowRight, Newspaper } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { IMAGES } from "../data/site";
import { useSiteContent } from "../site/SiteContentContext";

const GUIDES = [
  {
    title: "A first-timer's guide to insurance in Malawi",
    body: "What third-party, comprehensive and agreed value actually mean — and how to choose without the jargon.",
    image: IMAGES.firstTime,
    tag: "Guide",
  },
  {
    title: "What a broker does that an insurer doesn't",
    body: "Why 'compare across the market' is more than a slogan — and how it changes what you pay and how you're treated.",
    image: IMAGES.handshake,
    tag: "Guide",
  },
  {
    title: "Choosing the right group medical scheme",
    body: "Inpatient vs outpatient, dependants, networks and cost. A practical checklist for employers.",
    image: IMAGES.group,
    tag: "Guide",
  },
];

export default function Resources() {
  const { news, tips } = useSiteContent();

  return (
    <div>
      <PageHero
        eyebrow="Resources"
        title="Insurance,"
        accent="explained simply."
        description="Guides, tips and answers — written in plain language, so you can make decisions with confidence."
      />

      {/* Guides */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading
            eyebrow="Featured Guides"
            title="Read up before"
            accent="you sign up."
            className="mb-12"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {GUIDES.map((g, idx) => (
              <Reveal key={g.title} delay={idx * 100} className="group bg-white border border-navy/8 rounded-2xl overflow-hidden hover:shadow-lift hover:border-gold/40 transition-all flex flex-col">
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img src={g.image} alt="" aria-hidden="true" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" loading="lazy" />
                  <span className="absolute top-4 left-4 bg-gold text-navy-deep text-[11px] font-bold uppercase tracking-wider rounded-full px-3 py-1.5">
                    {g.tag}
                  </span>
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="font-display text-xl text-navy leading-snug mb-3">{g.title}</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed mb-6 flex-1">{g.body}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy group-hover:gap-2.5 transition-all">
                    Read guide <ArrowRight size={15} />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-20 md:py-24 bg-navy-deep text-white grain relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading
            tone="dark"
            eyebrow="Insurance Tips"
            title="Six things worth"
            accent="knowing."
            className="mb-12"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((t, idx) => (
              <Reveal key={t.title} delay={(idx % 3) * 90} className="bg-white/[0.04] border border-white/10 rounded-2xl p-7 hover:bg-white/[0.07] transition-colors">
                <span className="font-display text-3xl font-light text-gold mb-4 block">{String(idx + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-xl mb-2">{t.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{t.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-20 md:py-24 bg-cream-dark/60">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading
            eyebrow="News & Updates"
            title="Company news,"
            accent="straight from us."
            className="mb-12"
          />
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((n, idx) => (
              <Reveal key={n.title} delay={idx * 100} className="group bg-white border border-navy/8 rounded-2xl p-7 hover:shadow-card hover:border-gold/40 transition-all flex flex-col">
                <div className="flex items-center gap-2.5 mb-5">
                  <Newspaper size={17} className="text-gold-dark" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark">{n.category}</span>
                </div>
                <h3 className="font-display text-xl text-navy leading-snug mb-3">{n.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed mb-6 flex-1">{n.body}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-charcoal/45">{n.date}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy group-hover:gap-2.5 transition-all">
                    Read <ArrowRight size={15} />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
