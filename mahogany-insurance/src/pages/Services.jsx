import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { useSiteContent } from "../site/SiteContentContext";

export default function Services() {
  const { site, serviceCategories } = useSiteContent();
  const [activeCat, setActiveCat] = useState(serviceCategories[0]);

  useEffect(() => {
    setActiveCat(serviceCategories[0]);
  }, [serviceCategories]);

  return (
    <div>
      <PageHero
        eyebrow="Insurance Solutions"
        title="Cover, compared and"
        accent="arranged for you."
        description="As brokers we don't sell our own policies. We compare across Malawi's insurers to find the right fit for your risk and your budget — then stand with you through renewals and claims."
      />

      {/* Category switcher */}
      <section className="py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-[260px_1fr] gap-10 md:gap-14 items-start">
            {/* Sidebar */}
            <div className="md:sticky md:top-24 space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-charcoal/40 mb-4">
                Choose a category
              </p>
              {serviceCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat)}
                  aria-pressed={activeCat.id === cat.id}
                  className={`w-full text-left rounded-2xl px-5 py-4 border transition-all focus-ring ${
                    activeCat.id === cat.id
                      ? "bg-navy text-white border-navy shadow-card"
                      : "bg-white border-navy/8 text-navy hover:border-gold/50 hover:shadow-card"
                  }`}
                >
                  <span className="font-display text-lg block">{cat.label}</span>
                  <span className={`text-xs mt-0.5 block ${activeCat.id === cat.id ? "text-white/60" : "text-charcoal/50"}`}>
                    {cat.items.length} cover types
                  </span>
                </button>
              ))}
            </div>

            {/* Active category */}
            <div key={activeCat.id}>
              <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lift">
                <img src={activeCat.image} alt={activeCat.label} className="w-full aspect-[21/9] object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 to-navy-deep/10" aria-hidden="true" />
                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
                  <h2 className="font-display text-3xl md:text-4xl text-white mb-2 animate-fadeup">{activeCat.label}</h2>
                  <p className="text-white/75 text-sm md:text-base max-w-xl animate-fadeup">{activeCat.intro}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {activeCat.items.map((s, idx) => (
                  <Reveal key={s.name} delay={idx * 80} className="bg-white border border-navy/8 rounded-2xl p-7 hover:shadow-card hover:border-gold/40 transition-all flex flex-col">
                    <div className="flex items-start justify-between mb-5">
                      <span className="w-12 h-12 rounded-xl bg-emerald text-white flex items-center justify-center">
                        <s.icon size={23} strokeWidth={1.6} />
                      </span>
                      <Sparkles size={18} className="text-gold/50" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-xl text-navy mb-2">{s.name}</h3>
                    <p className="text-sm text-charcoal/65 leading-relaxed mb-5">{s.desc}</p>
                    <ul className="space-y-2.5 mb-5">
                      {s.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-sm text-charcoal/75">
                          <Check size={16} className="text-emerald shrink-0 mt-0.5" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto border-t border-navy/8 pt-4">
                      <p className="text-xs text-charcoal/50">
                        <span className="font-semibold text-charcoal/70 uppercase tracking-wider">Who it's for — </span>
                        {s.who}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why broker */}
      <section className="bg-white py-20 md:py-24 border-y border-navy/5">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <SectionHeading
              eyebrow="Why Use a Broker"
              title="Same market. Better view."
              description="Insurers' terms differ — sometimes by a lot. A broker reads every word so you don't have to, and shows you the options side by side."
            />
            <div className="space-y-5">
              {[
                { title: "One source for the whole market", body: "We compare across 20+ insurers rather than a single company's shelves." },
                { title: "Advice that costs you nothing", body: "Brokers are paid by the insurer, so the premium you're quoted is the premium you'd pay direct." },
                { title: "A single point of contact", body: "One number for new cover, renewals, mid-term changes and claims — forever." },
              ].map((it, idx) => (
                <Reveal key={it.title} delay={idx * 90} className="flex gap-5">
                  <span className="font-display text-3xl font-light text-gold-dark/60 w-10 shrink-0">{String(idx + 1).padStart(2, "0")}</span>
                  <div className="border-b border-navy/10 pb-5 flex-1">
                    <h3 className="font-display text-lg text-navy mb-1">{it.title}</h3>
                    <p className="text-sm text-charcoal/60 leading-relaxed">{it.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
