import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { IMAGES } from "../data/site";
import { useSiteContent } from "../site/SiteContentContext";

export default function Services() {
  const { serviceCategories } = useSiteContent();
  const [activeCat, setActiveCat] = useState(serviceCategories[0]);

  useEffect(() => {
    setActiveCat(serviceCategories[0]);
  }, [serviceCategories]);

  const cat = serviceCategories.find((c) => c.id === activeCat?.id) || serviceCategories[0];

  return (
    <div>
      <PageHero
        title="Cover, compared and"
        accent="arranged for you."
        description="As brokers we don't sell our own policies. We compare across Malawi's insurers to find the right fit for your risk and your budget — then stand with you through renewals and claims."
        image={IMAGES.broker}
      />

      {/* Insurance Solutions */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading
            eyebrow="Insurance Solutions"
            title="Explore our cover,"
            accent="by category."
            description="Choose a category to see the cover types we arrange and who each one is suited for."
            align="center"
            className="mb-12"
          />

          {/* Category pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
            {serviceCategories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCat(c)}
                aria-pressed={cat.id === c.id}
                className={`rounded-full px-6 py-3 text-sm font-semibold transition-all focus-ring ${
                  cat.id === c.id
                    ? "bg-navy text-white shadow-card"
                    : "bg-mist text-navy border border-navy/10 hover:border-gold/50 hover:shadow-card"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Service cards — image-led grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cat.items.map((s, idx) => (
              <Reveal
                key={s.name}
                delay={idx * 80}
                className="group bg-white rounded-2xl overflow-hidden border border-navy/8 hover:shadow-lift hover:border-gold/40 transition-all flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <h3 className="font-display text-lg text-charcoal font-bold leading-tight mb-3">{s.name}</h3>
                  <p className="text-sm text-charcoal/65 leading-relaxed mb-4">{s.desc}</p>
                  <ul className="space-y-2 mb-5">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-charcoal/75">
                        <Check size={15} className="text-steel-dark shrink-0 mt-0.5" />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto text-xs text-charcoal/50 pt-4 border-t border-navy/8">
                    <span className="font-semibold text-charcoal/70 uppercase tracking-wider">Who it's for — </span>
                    {s.who}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why broker */}
      <section className="bg-mist py-20 md:py-24">
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
                <Reveal key={it.title} delay={idx * 90} className="group bg-white border border-navy/8 rounded-2xl p-6 flex gap-5 hover:shadow-card transition-all">
                  <span className="font-display text-3xl font-light text-gold-dark/60 w-10 shrink-0">{String(idx + 1).padStart(2, "0")}</span>
                  <div className="flex-1">
                    <h3 className="font-display text-lg text-charcoal font-bold mb-1">{it.title}</h3>
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
