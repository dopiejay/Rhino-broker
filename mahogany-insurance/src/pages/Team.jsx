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
      
    </div>
  );
}
