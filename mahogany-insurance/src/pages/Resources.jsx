import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Search, ChevronDown, ArrowRight, BookOpen, Newspaper, LifeBuoy } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { TIPS, NEWS, IMAGES } from "../data/site";
import { useSiteContent } from "../site/SiteContentContext";

const GUIDES = [
  {
    title: "A first-timer's guide to insurance in Malawi",
    body: "What third-party, comprehensive and agreed value actually mean — and how to choose without the jargon.",
    image: IMAGES.documents,
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
    image: IMAGES.office,
    tag: "Guide",
  },
];

export default function Resources() {
  const { site, faqs } = useSiteContent();
  const [openFaq, setOpenFaq] = useState(0);
  const [query, setQuery] = useState("");

  const filteredFaqs = faqs.filter((f) =>
    (f.q + " " + f.a).toLowerCase().includes(query.toLowerCase())
  );

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
            {TIPS.map((t, idx) => (
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
            {NEWS.map((n, idx) => (
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

      {/* FAQ */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <SectionHeading
            align="center"
            eyebrow="Frequently Asked"
            title="Questions,"
            accent="answered."
            className="mb-10"
          />
          <div className="relative mb-8">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions — e.g. 'broker', 'documents', 'claim'"
              className="w-full bg-white border border-navy/15 rounded-full pl-13 py-4 pr-5 text-sm focus-ring focus:border-gold focus:shadow-gold transition-shadow"
              style={{ paddingLeft: "3.25rem" }}
            />
          </div>
          <div className="space-y-3">
            {filteredFaqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <div className="bg-white border border-navy/8 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    aria-expanded={openFaq === i}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-4 focus-ring"
                  >
                    <span className="font-display text-lg text-navy">{f.q}</span>
                    <ChevronDown size={19} className={`text-gold-dark shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <p className="px-6 pb-5 text-sm text-charcoal/65 leading-relaxed">{f.a}</p>
                  )}
                </div>
              </Reveal>
            ))}
            {filteredFaqs.length === 0 && (
              <div className="text-center py-12 text-charcoal/50">
                <LifeBuoy size={28} className="mx-auto mb-3 text-gold-dark/60" />
                No matches for “{query}”. Call us on{" "}
                <a href={site.phoneHref} className="text-navy font-semibold">{site.phone}</a> and we'll answer it for you.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-t border-navy/5 py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <BookOpen size={26} className="text-gold-dark mx-auto mb-5" />
          <h2 className="font-display text-3xl md:text-5xl text-navy leading-tight mb-5">
            Still not sure what you <em className="text-gold italic">need?</em>
          </h2>
          <p className="text-charcoal/60 text-lg max-w-xl mx-auto leading-relaxed mb-9">
            That's exactly what we're here for. Tell us about what you're protecting and
            we'll recommend the right cover — plain language, no obligation.
          </p>
          <NavLink
            to="/quote"
            className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-8 py-4 rounded-full hover:bg-navy-light transition-colors focus-ring"
          >
            Talk to an Advisor <ArrowRight size={17} />
          </NavLink>
        </div>
      </section>
    </div>
  );
}
