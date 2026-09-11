import { NavLink } from "react-router-dom";
import { ArrowRight, ShieldCheck, Eye, Heart, Users } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { IMAGES } from "../data/site";
import { useSiteContent } from "../site/SiteContentContext";

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: "Licensed Brokerage",
    body: "Registered and authorised to act as an insurance intermediary in Malawi.",
  },
  {
    icon: Eye,
    title: "Transparent Advice",
    body: "We explain your options clearly so you can make informed decisions.",
  },
  {
    icon: Heart,
    title: "Client-First Approach",
    body: "Every recommendation starts with understanding your specific needs.",
  },
];

export default function About() {
  const { values, team } = useSiteContent();
  return (
    <div>
      <PageHero
        title="Strength Behind Every Decision."
        description="Learn more about Rhino Insurance Brokers and Consulting Company Limited and our approach to insurance and risk."
        image={IMAGES.meeting}
      />

      {/* Who We Are */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <SectionHeading
              title="Who We Are"
              description="Rhino Insurance Brokers and Consulting Company Limited is an insurance brokerage and consulting business operating in Malawi."
            />
            <div className="mt-8 space-y-5 text-charcoal/65 leading-relaxed text-[15px]">
              <Reveal>
                <p>
                  We help individuals, businesses and organisations navigate
                  insurance and risk with greater confidence. By comparing
                  options across multiple insurers, we work to find cover that
                  fits your circumstances and budget.
                </p>
              </Reveal>
              <Reveal delay={100}>
                <p>
                  Public insurer directories confirm Rhino's presence as an
                  insurance broker in Blantyre. Our team brings together
                  experience across personal, commercial and employee benefits
                  lines of insurance.
                </p>
              </Reveal>
              <Reveal delay={150}>
                <div className="bg-gold-soft border-l-4 border-gold rounded-r-xl p-6 text-navy">
                  <p className="font-display text-lg leading-relaxed">
                    "Rhino is strong and enduring —
                    the same qualities we bring to every policy we arrange."
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="mt-10 grid sm:grid-cols-3 gap-5">
              {HIGHLIGHTS.map((h, idx) => (
                <Reveal key={h.title} delay={idx * 90}>
                  <div className="flex flex-col gap-3">
                    <span className="w-10 h-10 rounded-full bg-steel/10 text-steel flex items-center justify-center">
                      <h.icon size={20} strokeWidth={1.75} />
                    </span>
                    <h3 className="font-display text-sm font-semibold text-charcoal">{h.title}</h3>
                    <p className="text-xs text-charcoal/55 leading-relaxed">{h.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Reveal className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lift">
                <img src={IMAGES.story} alt="Closing a deal with a client" className="w-full aspect-[4/5] object-cover" loading="lazy" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-navy-deep relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading
            eyebrow="What We Believe"
            title="Our core values,"
            accent="practised daily."
            tone="dark"
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <Reveal key={v.title} delay={idx * 90} className="group bg-white/[0.04] border border-white/10 rounded-2xl p-7 hover:bg-white/[0.07] transition-colors">
                <span className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-white transition-colors">
                  <v.icon size={24} strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-xl text-white font-bold mb-2">{v.title}</h3>
                <p className="text-sm text-white/65 leading-relaxed">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading
            eyebrow="Our Team"
            title="The people behind"
            accent="Rhino."
            description="Experienced professionals dedicated to helping you find the right insurance solutions."
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.slice(0, 3).map((t, idx) => (
              <Reveal key={t.name} delay={idx * 90} className="group bg-mist rounded-2xl overflow-hidden hover:shadow-card transition-shadow">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg text-charcoal font-bold">{t.name}</h3>
                  <p className="text-sm font-medium text-gold-dark mt-0.5">{t.role}</p>
                  <p className="text-sm text-charcoal/60 leading-relaxed mt-3">{t.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
