import { useState } from "react";
import {
  PhoneCall,
  FileText,
  Search,
  ArrowRight,
  Download,
  ChevronDown,
} from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { CLAIM_DOCS, IMAGES } from "../data/site";
import { useSiteContent } from "../site/SiteContentContext";

export default function Claims() {
  const { site, claimSteps } = useSiteContent();
  const [openDoc, setOpenDoc] = useState(0);

  return (
    <div>
      <PageHero
        eyebrow="Claims Help"
        title="When something goes wrong,"
        accent="we don't disappear."
        description="A broker's job isn't done at the sale. If you need to claim, we notify your insurer, handle the paperwork and follow up until you get a fair, timely settlement."
      />

      {/* Emergency strip */}
      <section className="bg-emerald text-navy-deep">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            
            <div>
              <p className="font-display text-lg font-semibold leading-tight">Reporting a claim right now?</p>
              <p className="text-sm text-navy-deep/70">Call us immediately — we'll guide you through what to do next.</p>
            </div>
          </div>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 bg-navy-deep text-white font-semibold px-7 py-3.5 rounded-full hover:bg-navy transition-colors focus-ring whitespace-nowrap"
          >
            <PhoneCall size={16} /> {site.phone}
          </a>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading
            eyebrow="How It Works"
            title="Filing a claim,"
            accent="step by step."
            description="Four steps — and we do most of the work for you."
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {claimSteps.map((s, idx) => (
              <Reveal key={s.step} delay={idx * 100} className="relative bg-white border border-navy/8 rounded-2xl p-7 hover:shadow-card transition-all">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-display text-4xl font-light text-gold">{s.step}</span>
                  <s.icon size={22} className="text-navy" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-xl text-navy mb-2">{s.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20 md:py-24 bg-cream-dark/60">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 items-start">
          <div>
            <SectionHeading
              eyebrow="Required Documents"
              title="What to have"
              accent="ready when you claim."
              description="Having the right paperwork ready speeds up settlement. Tap each claim type to see the documents typically required."
            />
            <div className="mt-9 space-y-3">
              {CLAIM_DOCS.map((d, i) => (
                <Reveal key={d.type} delay={i * 70}>
                  <div className="bg-white border border-navy/8 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenDoc(openDoc === i ? -1 : i)}
                      aria-expanded={openDoc === i}
                      className="w-full flex items-center justify-between gap-4 text-left px-6 py-4 focus-ring"
                    >
                      <span className="font-display text-lg text-navy">{d.type}</span>
                      <ChevronDown size={19} className={`text-gold-dark shrink-0 transition-transform ${openDoc === i ? "rotate-180" : ""}`} />
                    </button>
                    {openDoc === i && (
                      <div className="px-6 pb-5 -mt-1">
                        <ul className="space-y-2">
                          {d.docs.map((doc) => (
                            <li key={doc} className="flex items-start gap-2.5 text-sm text-charcoal/70">
                              <FileText size={15} className="text-emerald-ink shrink-0 mt-0.5" />
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <Reveal className="relative rounded-2xl overflow-hidden shadow-lift">
              <img src={IMAGES.chase} alt="An insurance advisor following up on a claim" className="w-full aspect-[16/10] object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-0 p-7">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-xs font-semibold text-white">
                  <Search size={14} /> We chase, you don't
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className="grid sm:grid-cols-2 gap-5">
              <div className="bg-white border border-navy/8 rounded-2xl p-7">
                <Download size={24} className="text-gold-dark mb-4" />
                <h3 className="font-display text-lg text-navy mb-1.5">Claim Forms</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed mb-4">
                  Downloadable forms for each insurance type are being prepared. Until then, call us and we'll send the right form directly.
                </p>
                <a href={site.phoneHref} className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:gap-2.5 transition-all">
                  Request a form <ArrowRight size={15} />
                </a>
              </div>
              <div className="bg-white border border-navy/8 rounded-2xl p-7">
                <PhoneCall size={24} className="text-gold-dark mb-4" />
                <h3 className="font-display text-lg text-navy mb-1.5">Emergency Contact</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed mb-4">
                  For urgent incidents — accidents, fire, theft — call us right away on the number below.
                </p>
                <a href={site.phoneHref} className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:gap-2.5 transition-all">
                  {site.phone} <ArrowRight size={15} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

    </div>
  );
}
