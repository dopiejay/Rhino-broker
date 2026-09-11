import { NavLink } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import HeroSlider from "../components/HeroSlider";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { HOME_SERVICES, WHO_WE_SERVE, PROCESS } from "../data/site";
import meetingImg from "../assets/people-meeting.jpg";

export default function Home() {
  return (
    <div>
      <HeroSlider />

      {/* About Rhino */}
      <section className="py-20 md:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="flex flex-col">
            <SectionHeading
              title="Protection Shouldn't Be a Guess."
              description="Insurance decisions can be complex. Rhino is positioned to help clients better understand their protection needs and explore solutions that fit their personal, business or organisational circumstances. Through insurance broking and advisory services, our focus is on helping clients move from uncertainty to clarity."
            />
            <Reveal delay={200}>
              <NavLink
                to="/about"
                className="group mt-10 inline-flex items-center gap-2.5 bg-steel text-white font-semibold text-sm px-7 py-4 rounded-full hover:bg-steel-light transition-colors focus-ring"
              >
                Learn About Rhino
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </NavLink>
            </Reveal>
          </div>

          <Reveal className="relative z-10 rounded-2xl overflow-hidden shadow-lift">
            <img
              src={meetingImg}
              alt="A Rhino advisor meeting with a client"
              className="w-full aspect-[4/3] object-cover"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      {/* What We Help With */}
      <section className="bg-mist py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading
            eyebrow="WHAT WE HELP WITH"
            title="Insurance and Risk,"
            accent="Made Clearer."
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOME_SERVICES.map((card, idx) => (
              <Reveal
                key={card.title}
                delay={idx * 100}
                className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lift transition-shadow p-7 flex flex-col"
              >
                <span className="w-12 h-12 flex items-center justify-center rounded-full bg-steel/10 text-steel mb-6">
                  <card.icon size={24} strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-lg text-navy mb-3">{card.title}</h3>
                <p className="text-charcoal/65 text-sm leading-relaxed mb-6 flex-1">{card.body}</p>
                <NavLink
                  to={card.to}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-steel group-hover:gap-2.5 transition-all"
                >
                  Learn more <ArrowUpRight size={15} />
                </NavLink>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mt-12 text-center">
            <NavLink
              to="/services"
              className="group inline-flex items-center gap-2.5 bg-steel text-white font-semibold text-sm px-7 py-4 rounded-full hover:bg-steel-light transition-colors focus-ring"
            >
              View All Insurance Solutions
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </NavLink>
          </Reveal>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="bg-white py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading
            eyebrow="WHO WE SERVE"
            title="Protection for Every Stage of"
            accent="Life and Business."
            className="mb-14"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHO_WE_SERVE.map((item, idx) => (
              <Reveal
                key={item.title}
                delay={idx * 100}
                className="group bg-mist rounded-2xl p-7 hover:shadow-card transition-shadow flex flex-col"
              >
                <span className="w-12 h-12 flex items-center justify-center rounded-full bg-steel/10 text-steel mb-5">
                  <item.icon size={24} strokeWidth={1.75} />
                </span>
                <h3 className="font-display text-lg text-navy mb-2">{item.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-mist py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <SectionHeading
            eyebrow="HOW IT WORKS"
            title="A Clearer Path"
            accent="to Protection."
            className="mb-14"
          />
          <div className="grid md:grid-cols-4 gap-6 relative">
            {PROCESS.map((p, idx) => (
              <Reveal key={p.step} delay={idx * 100} className="relative">
                {idx < PROCESS.length - 1 && (
                  <span className="hidden md:block absolute top-12 -right-3 w-6 h-px bg-gold/50" aria-hidden="true" />
                )}
                <div className="group bg-white border border-navy/8 rounded-2xl p-7 h-full hover:shadow-card hover:border-gold/40 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <span className="w-12 h-12 rounded-full bg-steel text-white flex items-center justify-center group-hover:bg-navy transition-colors">
                      <p.icon size={22} strokeWidth={1.75} />
                    </span>
                    <span className="font-display text-2xl font-light text-gold/70">{p.step}</span>
                  </div>
                  <h3 className="font-display text-xl text-navy font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-charcoal/60 leading-relaxed">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}