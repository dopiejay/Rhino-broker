import { NavLink } from "react-router-dom";
import { ArrowRight, Users, PhoneCall } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { TEAM } from "../data/site";
import { useSiteContent } from "../site/SiteContentContext";

export default function Team() {
  const { site } = useSiteContent();
  return (
    <div>
      <PageHero
        eyebrow="Our Team"
        title="The people behind"
        accent="your cover."
        description="A small, senior team — which means the person who arranges your policy is the same person who answers when you call about it."
      />

      {/* Team grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading
            eyebrow="Meet the Team"
            title="Faces you'll actually"
            accent="talk to."
            description="No phone trees, no account handed between strangers. Here's who you'll deal with at Mahogany."
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map((member, idx) => (
              <Reveal key={member.name} delay={(idx % 3) * 90} className="group relative rounded-2xl overflow-hidden bg-navy-deep hover:shadow-lift transition-shadow">
                <div className="relative aspect-[4/4.6] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/20 to-transparent" aria-hidden="true" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold mb-2">
                    {member.role}
                  </p>
                  <h3 className="font-display text-2xl text-white">{member.name}</h3>
                  <p className="text-sm text-white/70 leading-relaxed mt-2 max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                    {member.bio}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How we're organised */}
      <section className="py-20 md:py-24 bg-cream-dark/60">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <SectionHeading
            eyebrow="How We Work"
            title="One team,"
            accent="one point of contact."
            description="Every client is looked after by a dedicated broker, backed by the whole firm. When you need something, you know exactly who to call — and they know your file."
          />
          <div className="space-y-5">
            {[
              { title: "A dedicated broker for every client", body: "From the first quote to every renewal, your broker knows your cover and your story." },
              { title: "The whole firm behind them", body: "Specialists in commercial lines, employee benefits and claims step in whenever needed." },
              { title: "A team that answers", body: "When you call, you reach someone who can act — not a switchboard and not a voicemail." },
            ].map((it, idx) => (
              <Reveal key={it.title} delay={idx * 90} className="flex gap-5">
                <span className="w-12 h-12 rounded-xl bg-emerald text-white flex items-center justify-center shrink-0">
                  <Users size={20} />
                </span>
                <div className="border-b border-navy/10 pb-5 flex-1">
                  <h3 className="font-display text-lg text-navy mb-1">{it.title}</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{it.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-deep text-white py-20 md:py-24 grain relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden="true" />
        <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
          <SectionHeading
            align="center"
            tone="dark"
            eyebrow="Let's Get Started"
            title="Ready to work with"
            accent="a team that answers?"
            description="Tell us what you're protecting and we'll introduce you to the broker who'll look after it."
            className="mb-9"
          />
          <div className="flex flex-wrap justify-center gap-4">
            <NavLink
              to="/quote"
              className="inline-flex items-center gap-2 bg-emerald text-white font-semibold px-8 py-4 rounded-full hover:bg-emerald-dark transition-colors focus-ring"
            >
              Request a Free Quote <ArrowRight size={17} />
            </NavLink>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors focus-ring"
            >
              <PhoneCall size={17} /> Call {site.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
