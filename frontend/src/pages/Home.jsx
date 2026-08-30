import { NavLink } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import HeroSlider from "../components/HeroSlider";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { WHY_US, PROCESS, IMAGES } from "../data/site";
import { useSiteContent } from "../site/SiteContentContext";

export default function Home() {
  const { serviceCategories, news } = useSiteContent();
  return (
    <div>
      <HeroSlider />

      {/* About Us */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20 items-stretch">
          <div className="relative">
            <Reveal className="relative z-10 h-full rounded-2xl overflow-hidden shadow-lift">
              <img src={IMAGES.personStanding} alt="A Mahogany Insurance professional" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent" aria-hidden="true" />
            </Reveal>
           
          </div>

          <div className="flex flex-col justify-center">
            <SectionHeading
              eyebrow="About Us"
              title="An independent broker,"
              accent="on your side."
              description="Mahogany Insurance Brokers is a licensed, independent brokerage in Blantyre — we compare across Malawi's insurers and stand with you long after the policy is signed."
            />
            <div className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-8">
              {WHY_US.map((f, idx) => (
                <Reveal key={f.number} delay={idx * 90} className="group flex gap-4">
                  <span className="w-10 h-10 flex items-center justify-center shrink-0 rounded-full bg-emerald/15 text-emerald-ink">
                    <f.icon size={24} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-navy mb-1.5">{f.title}</h3>
                    <p className="text-charcoal/60 text-[15px] leading-relaxed">{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={300}>
              <NavLink
                to="/about"
                className="group mt-10 inline-flex items-center gap-2.5 bg-emerald text-navy font-semibold text-sm px-7 py-4 rounded-full hover:bg-emerald-light transition-colors focus-ring"
              >
                More about Mahogany
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </NavLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Insurance Solutions */}
      <section className="bg-gray-200 py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <SectionHeading
              eyebrow="Insurance Solutions"
              title="One broker,"
              accent="every type of cover."
              description="From a single vehicle to a company-wide employee benefits scheme — we place cover for every stage of life and business."
            />
            <Reveal delay={150}>
              <NavLink
                to="/services"
                className="inline-flex items-center gap-2 bg-emerald text-navy font-semibold text-sm px-7 py-4 rounded-full hover:bg-emerald-light transition-colors focus-ring whitespace-nowrap"
              >
                View All Solutions <ArrowRight size={16} />
              </NavLink>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {serviceCategories.map((cat, idx) => (
              <Reveal
                key={cat.id}
                delay={idx * 120}
                className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lift transition-shadow flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6 md:p-7 flex flex-col flex-1">
                  <h3 className="font-display text-2xl text-navy mb-2.5">{cat.label}</h3>
                  <p className="text-charcoal/65 text-sm leading-relaxed mb-6 flex-1">
                    {cat.tagline} Choose from {cat.items.length} cover types.
                  </p>
                  <NavLink
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy group-hover:gap-2.5 transition-all"
                  >
                    Explore <ArrowUpRight size={15} />
                  </NavLink>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-emerald-soft py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald to-transparent" aria-hidden="true" />
        <div className="absolute -right-32 -bottom-32 w-[28rem] h-[28rem] rounded-full border border-emerald/40" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-5 md:px-8 relative">
          <SectionHeading
            eyebrow="How It Works"
            title="From first call to"
            accent="lasting cover."
            accentClass="text-white"
            className="mb-14"
          />
          <div className="grid md:grid-cols-4 gap-10 md:gap-6">
            {PROCESS.map((p, idx) => (
              <Reveal key={p.step} delay={idx * 100} className="relative">
                <p.icon size={40} strokeWidth={1.5} className="text-navy mb-5" />
                <h3 className="font-display text-xl text-white mb-2">{p.title}</h3>
                <p className="text-sm text-navy/70 leading-relaxed">{p.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mt-14 flex flex-wrap items-center gap-4">
            <NavLink
              to="/quote"
              className="inline-flex items-center gap-2 bg-emerald text-navy font-semibold text-sm px-7 py-4 rounded-full hover:bg-emerald-light transition-colors focus-ring"
            >
              Start With a Free Quote <ArrowRight size={16} />
            </NavLink>
            <p className="text-navy/70 text-sm">No obligation · Compared across 20+ insurers</p>
          </Reveal>
        </div>
      </section>

      {/* News */}
      <section className="py-20 md:py-28 bg-cream-dark/60">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
            <SectionHeading
              eyebrow="Latest Updates"
              title="News, tips and"
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
