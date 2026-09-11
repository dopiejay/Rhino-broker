import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { IMAGES } from "../data/site";
import { useSiteContent } from "../site/SiteContentContext";

const inputCls =
  "w-full bg-white border border-navy/15 rounded-xl px-4 py-3.5 text-sm focus-ring focus:border-gold transition-colors placeholder:text-charcoal/35";

export default function Contact() {
  const { site } = useSiteContent();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const subject = `[Website] ${form.subject}`;
    const body = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "—"}\n\n${form.message}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const cards = [
    {
      icon: Phone,
      title: "Call Us",
      value: site.phone,
      href: site.phoneHref,
    },
    {
      icon: Mail,
      title: "Email Us",
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: MapPin,
      title: "Visit Us",
      value: `${site.address}, ${site.city}`,
      href: null,
    },
  ];

  return (
    <div>
      <PageHero
        title="Let's Start With a Conversation."
        description="Whether you're exploring insurance options or want to discuss your organisation's protection needs, we'd be happy to hear from you."
        image={IMAGES.office}
      />

      {/* Contact cards */}
      <section className="py-16 md:py-20 bg-mist">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, idx) => {
            const inner = (
              <>
                <span className="w-12 h-12 rounded-full bg-navy/10 text-navy flex items-center justify-center mb-5 group-hover:bg-steel group-hover:text-white transition-colors">
                  <c.icon size={21} />
                </span>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-charcoal/45 mb-1.5">{c.title}</h3>
                <p className="font-display text-lg text-navy">{c.value}</p>
              </>
            );
            return (
              <Reveal key={c.title} delay={idx * 80}>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group bg-white border border-navy/8 rounded-2xl p-7 hover:shadow-card hover:border-gold/40 transition-all block h-full focus-ring"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="bg-white border border-navy/8 rounded-2xl p-7 h-full">
                    {inner}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Map + form */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <SectionHeading
              eyebrow="Find Us"
              title="Our Office in"
              accent="Blantyre."
              description="Our office is at Umoyo House — but for anything that can be handled remotely, we're only a call or email away."
              className="mb-8"
            />
            <Reveal className="rounded-2xl overflow-hidden border border-navy/8 shadow-card mb-8">
              <iframe
                title="Rhino Insurance Brokers & Consulting — Umoyo House, Blantyre"
                src="https://www.google.com/maps?q=Umoyo+House+Blantyre+Malawi&output=embed"
                width="100%"
                height="360"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.15]"
              />
            </Reveal>
            <Reveal delay={120} className="flex items-start gap-4 bg-mist border border-navy/8 rounded-2xl p-6">
              <MapPin size={22} className="text-gold-dark shrink-0 mt-0.5" />
              <div>
                <h3 className="font-display text-lg text-charcoal mb-1">Office Address</h3>
                <p className="text-charcoal/65 leading-relaxed">{site.address},<br />{site.city}</p>
              </div>
            </Reveal>
          </div>

          <div className="lg:sticky lg:top-24">
            {sent ? (
              <div className="bg-white border border-navy/8 rounded-3xl p-10 md:p-14 text-center shadow-card animate-fadeup">
                <span className="w-20 h-20 rounded-full bg-steel-soft text-navy flex items-center justify-center mx-auto mb-7">
                  <CheckCircle2 size={40} />
                </span>
                <h2 className="font-display text-3xl text-navy mb-3">Draft ready.</h2>
                <p className="text-charcoal/60 text-lg leading-relaxed max-w-md mx-auto">
                  We've opened your email app with the message filled in — just hit send
                  {form.name ? `, ${form.name.split(" ")[0]}` : ""}. Need us sooner?
                </p>
                <a
                  href={site.phoneHref}
                  className="mt-8 inline-flex items-center gap-2 bg-navy text-white font-semibold px-7 py-3.5 rounded-full hover:bg-navy-light transition-colors focus-ring"
                >
                  <Phone size={16} /> {site.phone}
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-navy/8 rounded-3xl p-8 md:p-10 shadow-card">
                <h2 className="font-display text-2xl text-navy mb-6">Send us a message</h2>
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">Name *</label>
                      <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} className={inputCls} placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">Email *</label>
                      <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={inputCls} placeholder="you@example.com" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-2">Phone</label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className={inputCls} placeholder="+265 9XX XXX XXX" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-navy mb-2">Subject *</label>
                    <select id="subject" name="subject" required value={form.subject} onChange={handleChange} className={inputCls}>
                      <option value="" disabled>Select a topic</option>
                      <option>New quote request</option>
                      <option>Existing policy / renewal</option>
                      <option>Report a claim</option>
                      <option>General enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-navy mb-2">Message *</label>
                    <textarea id="message" name="message" rows={5} required value={form.message} onChange={handleChange} className={`${inputCls} resize-none`} placeholder="How can we help?" />
                  </div>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-steel text-white font-semibold text-sm px-8 py-4 rounded-full hover:bg-steel-light transition-colors focus-ring"
                  >
                    Send Message <Send size={16} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
