import { NavLink } from "react-router-dom";
import { ArrowRight, Target, Eye, MapPin } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import StatsBand from "../components/StatsBand";
import { IMAGES } from "../data/site";import { useSiteContent } from "../site/SiteContentContext";

export default function About() {
  const { site, values, journey, aboutIntro } = useSiteContent();
  return (
    <div>
      <PageHero
        eyebrow="Who We Are"
        title="An independent broker, working for"
        accent="you — not any one insurer."
        description="Founded in Blantyre, Mahogany Insurance Brokers compares across Malawi's trusted insurers to find the cover that genuinely fits. And we stay with you long after the policy is signed."
        image={IMAGES.meeting}
      />

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <SectionHeading
              eyebrow="Our Story"
              title="Built on the idea that advice"
              accent="should be on your side."
              description="Insurance is bought at the moment you need it least — and trusted most at the moment you need it most. That's why Mahogany exists: to make sure the person you bought from is still standing next to you when something goes wrong."
            />
            <div className="mt-8 space-y-5 text-charcoal/65 leading-relaxed text-[15px]">
              <Reveal>
                <p>
                  Mahogany Insurance Brokers Limited was established in Blantyre as an
                  independent intermediary — meaning we don't sell one insurer's products.
                  We source, compare and arrange cover from across Malawi's insurance market.
                </p>
              </Reveal>
              <Reveal delay={100}>
                <p>
                  That independence has earned us mandates you don't get by accident: a
                  brokerage contract with the Malawi Electoral Commission, recognition
                  from Malawi's leading insurers, and a client base that stretches
                  from individual families to public institutions.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <div className="bg-gold-soft border-l-4 border-gold rounded-r-xl p-6 text-navy">
                  <p className="font-display text-lg leading-relaxed">
                    “Our name is a promise. Mahogany is slow-grown, strong and enduring —
                    the same qualities we bring to every policy we arrange.”
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Reveal className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lift">
                <img src={IMAGES.handshake} alt="Closing a deal with a client" className="w-full aspect-[4/5] object-cover" loading="lazy" />
              </div>
              <div className="absolute -bottom-6 -left-4 md:-left-8 bg-navy text-white rounded-2xl p-6 shadow-lift">
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-gold shrink-0" />
                  <div>
                    <p className="font-display text-lg">{site.address}</p>
                    <p className="text-xs text-white/60 mt-0.5">{site.city}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-navy-deep text-white py-20 md:py-28 grain relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading
            tone="dark"
            eyebrow="Purpose"
            title="Why we get up in the morning."
            className="mb-14"
          />
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal className="bg-white/[0.04] border border-white/10 rounded-2xl p-9 md:p-11">
              <div className="flex items-center gap-4 mb-5">
                <span className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center">
                  <Target size={22} />
                </span>
                <h3 className="font-display text-2xl">Our Mission</h3>
              </div>
              <p className="text-white/70 leading-relaxed text-lg">
                {aboutIntro?.mission ||
                  "To connect individuals, SMEs and institutions across Malawi with the right cover from the right insurer — and to be there through renewals and claims, not just the sale."}
              </p>
            </Reveal>
            <Reveal delay={120} className="bg-white/[0.04] border border-white/10 rounded-2xl p-9 md:p-11">
              <div className="flex items-center gap-4 mb-5">
                <span className="w-12 h-12 rounded-full bg-gold/15 text-gold flex items-center justify-center">
                  <Eye size={22} />
                </span>
                <h3 className="font-display text-2xl">Our Vision</h3>
              </div>
              <p className="text-white/70 leading-relaxed text-lg">
                {aboutIntro?.vision ||
                  "To be the insurance broker Malawians trust first — for clear advice, fair comparison and dependable support when it matters most."}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading
            eyebrow="What Guides Us"
            title="Our core values,"
            accent="practised daily."
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <Reveal key={v.title} delay={idx * 90} className="group relative bg-white border border-navy/8 rounded-2xl p-7 hover:shadow-card hover:border-gold/40 transition-all">
                <span className="font-display text-5xl font-light text-gold/30 block mb-6 group-hover:text-gold/60 transition-colors">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl text-navy mb-2">{v.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="py-20 md:py-28 bg-cream-dark/60">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-16">
          <div className="flex flex-col">
            
            <Reveal className="relative mt-10 flex-1 rounded-2xl overflow-hidden shadow-lift">
              <img src={IMAGES.broker} alt="A Mahogany licensed insurance broker" className="w-full h-full min-h-[420px] object-cover" loading="lazy" />
            </Reveal>
           
          </div>

          <div>
            <SectionHeading
              eyebrow="Our Journey"
              title="Growing,"
              accent="ring by ring."
              description="Like the grain of our namesake timber, every year adds a ring of experience."
            />
            <div className="mt-12 relative pl-8 md:pl-10">
              <div className="absolute left-[5px] md:left-[7px] top-1 bottom-1 w-px bg-gold/40" aria-hidden="true" />
              <div className="space-y-10">
                {journey.map((j, idx) => (
                  <Reveal key={j.year} delay={idx * 90} className="relative">
                    <span className="absolute -left-8 md:-left-10 top-1.5 w-[11px] h-[11px] rounded-full bg-gold ring-4 ring-gold/20" aria-hidden="true" />
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark mb-1">{j.year}</p>
                    <h3 className="font-display text-xl text-navy mb-1.5">{j.title}</h3>
                    <p className="text-charcoal/65 text-[15px] leading-relaxed max-w-xl">{j.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal delay={250} className="mt-10 flex flex-wrap items-center gap-4">
              <NavLink
                to="/team"
                className="inline-flex items-center gap-2 bg-emerald text-white font-semibold text-sm px-7 py-4 rounded-full hover:bg-emerald-dark transition-colors focus-ring"
              >
                Meet the Team <ArrowRight size={16} />
              </NavLink>
              <NavLink
                to="/services"
                className="inline-flex items-center gap-2 border border-navy/25 text-navy font-semibold text-sm px-7 py-4 rounded-full hover:bg-navy/5 transition-colors focus-ring"
              >
                Explore What We Cover
              </NavLink>
            </Reveal>
          </div>
        </div>
      </section>
      </div>
  );
}
