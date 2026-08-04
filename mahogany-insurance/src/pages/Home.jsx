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

      {/* Claims band */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-28 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <SectionHeading
            eyebrow="Claims Assistance"
            title="When it goes wrong,"
            accent="we don't disappear."
            description="A broker's job isn't done at the sale. If you need to claim, we notify your insurer, handle the paperwork and chase it until you're settled."
          />
          <div className="mt-9 space-y-5">
            {[
              { icon: FileCheck2, text: "We lodge and track your claim with the insurer" },
              { icon: PhoneCall, text: "One call to report — we handle the rest" },
              { icon: ShieldCheck, text: "We stay involved until your claim is settled fairly" },
            ].map((it, idx) => (
              <Reveal key={it.text} delay={idx * 90} className="flex items-center gap-4">
                <span className="w-11 h-11 rounded-full bg-emerald-soft text-emerald flex items-center justify-center shrink-0">
                  <it.icon size={20} />
                </span>
                <p className="text-navy font-medium">{it.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={250}>
            <div className="mt-9 flex flex-wrap gap-4">
              <NavLink
                to="/claims"
                className="inline-flex items-center gap-2 bg-navy text-white font-semibold text-sm px-7 py-4 rounded-full hover:bg-navy-light transition-colors focus-ring"
              >
                See How Claims Work <ArrowRight size={16} />
              </NavLink>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 border border-navy/25 text-navy font-semibold text-sm px-7 py-4 rounded-full hover:bg-navy/5 transition-colors focus-ring"
              >
                <PhoneCall size={16} /> {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={120} className="relative">
          <div className="rounded-2xl overflow-hidden shadow-lift">
            <img src={IMAGES.claims} alt="An advisor supporting a client with a claim" className="w-full aspect-[4/3] object-cover" loading="lazy" />
          </div>
          <div className="absolute -bottom-6 -left-4 md:-left-8 bg-gold text-navy-deep rounded-2xl p-6 shadow-lift max-w-[240px]">
            <div className="font-display text-3xl font-light">4 steps</div>
            <p className="text-sm mt-1 text-navy-deep/70 leading-snug">from reporting an incident to settlement</p>
          </div>
        </Reveal>
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

      {/* Stats + Testimonials */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <SectionHeading
                eyebrow="By the Numbers"
                title="Trust you can"
                accent="measure."
                description="Figures like these only come from staying with clients over the long term — not from chasing the next sale."
              />
              <div className="mt-12 bg-navy-deep text-white rounded-3xl p-10 md:p-12 grain relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden="true" />
                <StatsBand />
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow="Client Voices"
                title="What clients"
                accent="say about us."
                className="mb-8"
              />
              <TestimonialCarousel />
            </div>
          </div>
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

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-navy-deep text-white py-20 md:py-28 grain">
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-gold/15" aria-hidden="true" />
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-gold/10" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-5 md:px-8 text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 mb-7">
              <Handshake size={18} className="text-gold" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">Get Started Today</span>
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-light leading-[1.05] tracking-tight">
              The right cover is <em className="text-gold italic">one conversation</em> away.
            </h2>
            <p className="text-white/70 text-lg mt-6 max-w-xl mx-auto leading-relaxed">
              Tell us what you're protecting and we'll come back with options compared
              across Malawi's insurers — no obligation, no pressure.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <NavLink
                to="/quote"
                className="inline-flex items-center gap-2 bg-emerald text-white font-semibold px-8 py-4 rounded-full hover:bg-emerald-dark transition-colors focus-ring"
              >
                Request Your Free Quote <ArrowRight size={17} />
              </NavLink>
              <a
                href={`tel:${site.phone}`}
                className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors focus-ring"
              >
                <PhoneCall size={17} /> {site.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
