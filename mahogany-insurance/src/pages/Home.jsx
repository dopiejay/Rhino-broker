import { NavLink } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Handshake,
  FileCheck2,
  PhoneCall,
} from "lucide-react";
import HeroSlider from "../components/HeroSlider";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import StatsBand from "../components/StatsBand";
import TestimonialCarousel from "../components/TestimonialCarousel";
import {
  WHY_US,
  INDUSTRIES,
  PROCESS,
  IMAGES,
} from "../data/site";
import { useSiteContent } from "../site/SiteContentContext";

export default function Home() {
  const { site, serviceCategories, news } = useSiteContent();
  return (
    <div>
      <HeroSlider />

      {/* Why Mahogany */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="relative">
            <Reveal className="relative z-10 rounded-2xl overflow-hidden shadow-lift">
              <img src={IMAGES.office} alt="The Mahogany advisory team at work" className="w-full aspect-[4/5] object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent" aria-hidden="true" />
            </Reveal>
            <Reveal
              delay={200}
              className="absolute -bottom-8 -right-2 md:-right-8 z-20 bg-navy text-white rounded-2xl p-6 shadow-lift w-56"
            >
              <div className="font-display text-4xl font-light text-gold">12+</div>
              <p className="text-xs text-white/70 mt-1.5 leading-snug">Years broking insurance across Malawi</p>
            </Reveal>
          </div>

          <div>
            <SectionHeading
              eyebrow="Why Mahogany"
              title="A broker who works for you,"
              accent="not the insurer."
              description="Most people are sold a policy. We help you choose one — by comparing across Malawi's insurers and standing with you long after the paperwork is signed."
            />
            <div className="mt-10 space-y-7">
              {WHY_US.map((f, idx) => (
                <Reveal key={f.number} delay={idx * 90} className="flex gap-5 group">
                  <span className="font-display text-3xl font-light text-emerald/60 w-12 shrink-0 pt-0.5">
                    {f.number}
                  </span>
                  <div className="border-b border-navy/10 pb-7 flex-1">
                    <h3 className="font-display text-xl text-navy mb-1.5">{f.title}</h3>
                    <p className="text-charcoal/60 text-[15px] leading-relaxed">{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={300}>
              <NavLink
                to="/about"
                className="group mt-10 inline-flex items-center gap-2 font-semibold text-navy focus-ring rounded"
              >
                More about Mahogany
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1 text-gold-dark" />
              </NavLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Insurance Solutions */}
      <section className="bg-navy-deep text-white py-20 md:py-28 relative grain overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <SectionHeading
              tone="dark"
              eyebrow="Insurance Solutions"
              title="One broker,"
              accent="every type of cover."
              description="From a single vehicle to a company-wide employee benefits scheme — we place cover for every stage of life and business."
            />
            <Reveal delay={150}>
              <NavLink
                to="/services"
                className="inline-flex items-center gap-2 bg-emerald text-white font-semibold text-sm px-7 py-4 rounded-full hover:bg-emerald-dark transition-colors focus-ring whitespace-nowrap"
              >
                View All Solutions <ArrowRight size={16} />
              </NavLink>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {serviceCategories.map((cat, idx) => (
              <Reveal key={cat.id} delay={idx * 120} className="group relative rounded-2xl overflow-hidden min-h-[420px] flex items-end shadow-lift">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/55 to-transparent" aria-hidden="true" />
                <div className="relative z-10 p-7 md:p-8 w-full">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold mb-3">
                    {cat.items.length} cover types
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl mb-3">{cat.label}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-5">{cat.tagline}</p>
                  <ul className="mb-6 space-y-1.5">
                    {cat.items.slice(0, 3).map((it) => (
                      <li key={it.name} className="flex items-center gap-2 text-sm text-white/80">
                        <span className="w-1 h-1 rounded-full bg-gold" aria-hidden="true" />
                        {it.name}
                      </li>
                    ))}
                  </ul>
                  <NavLink
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-white border border-white/30 rounded-full px-5 py-2.5 hover:bg-white/10 transition-colors focus-ring"
                  >
                    Explore <ArrowUpRight size={15} />
                  </NavLink>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 md:py-28 bg-cream-dark/60">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading
            align="center"
            eyebrow="Who We Serve"
            title="Cover that fits your world,"
            accent="whatever it looks like."
            description="We work across sectors and sizes — from a family's first car to institutional brokerage contracts."
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {INDUSTRIES.map((ind, idx) => (
              <Reveal key={ind.name} delay={(idx % 4) * 80} className="group bg-white border border-navy/8 rounded-2xl p-6 hover:border-gold/50 hover:shadow-card transition-all">
                <ind.icon size={24} strokeWidth={1.5} className="text-emerald mb-4 group-hover:text-emerald-dark transition-colors" />
                <h3 className="font-display text-lg text-navy mb-1.5">{ind.name}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{ind.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gradient-to-br from-emerald via-emerald-dark to-emerald-deep text-white py-20 md:py-28 grain relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" aria-hidden="true" />
        <div className="absolute -right-32 -bottom-32 w-[28rem] h-[28rem] rounded-full border border-gold/20" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
          <SectionHeading
            tone="dark"
            eyebrow="How It Works"
            title="From first call to"
            accent="lasting cover."
            className="mb-14"
          />
          <div className="grid md:grid-cols-4 gap-10 md:gap-6">
            {PROCESS.map((p, idx) => (
              <Reveal key={p.step} delay={idx * 100} className="relative">
                <div className="font-display text-5xl font-light text-gold/90 mb-5">{p.step}</div>
                <div className="w-10 h-px bg-gold/40 mb-5" aria-hidden="true" />
                <h3 className="font-display text-xl mb-2">{p.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{p.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mt-14 flex flex-wrap items-center gap-4">
            <NavLink
              to="/quote"
              className="inline-flex items-center gap-2 bg-gold text-navy-deep font-semibold text-sm px-7 py-4 rounded-full hover:bg-gold-light transition-colors focus-ring"
            >
              Start With a Free Quote <ArrowRight size={16} />
            </NavLink>
            <p className="text-white/70 text-sm">No obligation · Compared across 20+ insurers</p>
          </Reveal>
        </div>
      </section>

      {/* News */}
      <section className="py-20 md:py-28 bg-cream-dark/60">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <SectionHeading
              eyebrow="Latest Updates"
              title="News, tips &"
              accent="company updates."
            />
            <Reveal delay={150}>
              <NavLink
                to="/resources"
                className="inline-flex items-center gap-2 font-semibold text-navy focus-ring rounded"
              >
                All Resources <ArrowRight size={17} className="text-gold-dark" />
              </NavLink>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((n, idx) => (
              <Reveal key={n.title} delay={idx * 100} className="group bg-white border border-navy/8 rounded-2xl p-7 hover:shadow-card hover:border-gold/40 transition-all flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-dark bg-gold-soft rounded-full px-3 py-1.5">
                    {n.category}
                  </span>
                  <span className="text-xs text-charcoal/45">{n.date}</span>
                </div>
                <h3 className="font-display text-xl text-navy leading-snug mb-3">{n.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed mb-6 flex-1">{n.body}</p>
                <NavLink to="/resources" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy group-hover:gap-2.5 transition-all">
                  Read more <ArrowRight size={15} />
                </NavLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
