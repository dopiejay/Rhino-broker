import { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  ShieldCheck,
  User,
} from "lucide-react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { CLIENT_TYPES, QUOTE_TYPES, IMAGES } from "../data/site";
import { submitQuote } from "../lib/api";
import { useSiteContent } from "../site/SiteContentContext";

const STEP_LABELS = ["Who are you?", "What do you need?", "Contact details", "Tell us briefly"];

export default function Quote() {
  const { site } = useSiteContent();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    clientType: "",
    insuranceType: "",
    name: "",
    organisation: "",
    phone: "",
    email: "",
    details: "",
  });

  function update(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    submitQuote({
      name: form.name,
      phone: form.phone,
      email: form.email || "",
      insurance_type: form.insuranceType,
      details: `[${form.clientType}] ${form.details}`,
    })
      .then(() => setSubmitted(true))
      .catch((err) => setError(err.message))
      .finally(() => setSubmitting(false));
  }

  const inputCls =
    "w-full bg-white border border-navy/15 rounded-xl px-4 py-3.5 text-sm focus-ring focus:border-gold transition-colors placeholder:text-charcoal/35";

  const canNext = (() => {
    switch (step) {
      case 0: return form.clientType !== "";
      case 1: return form.insuranceType !== "";
      case 2: return form.name.trim() !== "" && form.phone.trim() !== "";
      default: return true;
    }
  })();

  return (
    <div>
      <PageHero
        title="Request your"
        accent="free quote."
        description="Tell us a little about what you'd like covered and we'll come back with options compared across insurers — no obligation, no pressure."
        image={IMAGES.handshake}
      />

      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-[380px_1fr] gap-14 lg:gap-20 items-start">
          {/* Contact sidebar */}
          <div className="lg:sticky lg:top-24 space-y-5">
            <Reveal className="bg-navy-deep text-white rounded-3xl p-8 grain relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden="true" />
              <h3 className="font-display text-xl mb-6">Prefer to talk first?</h3>
              <div className="space-y-5 text-sm">
                <a href={site.phoneHref} className="flex items-center gap-4 group">
                  <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-steel group-hover:text-white transition-colors">
                    <Phone size={18} />
                  </span>
                  <span>
                    <span className="block text-white/50 text-xs uppercase tracking-wider">Call us</span>
                    <span className="font-semibold">{site.phone}</span>
                  </span>
                </a>
                <a href={`mailto:${site.email}`} className="flex items-center gap-4 group">
                  <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-steel group-hover:text-white transition-colors">
                    <Mail size={18} />
                  </span>
                  <span>
                    <span className="block text-white/50 text-xs uppercase tracking-wider">Email us</span>
                    <span className="font-semibold break-all">{site.email}</span>
                  </span>
                </a>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-steel group-hover:text-white transition-colors">
                    <MessageCircle size={18} />
                  </span>
                  <span>
                    <span className="block text-white/50 text-xs uppercase tracking-wider">WhatsApp</span>
                    <span className="font-semibold">Chat instantly</span>
                  </span>
                </a>
                <div className="flex items-center gap-4">
                  <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                    <Clock size={18} />
                  </span>
                  <span>
                    <span className="block text-white/50 text-xs uppercase tracking-wider">Hours</span>
                    <span className="font-semibold">{site.hours}</span>
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className="bg-gold-soft border border-gold/30 rounded-3xl p-7">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={22} className="text-gold-dark shrink-0" />
                <h3 className="font-display text-lg text-navy">Why a quote from us is different</h3>
              </div>
              <ul className="space-y-3 text-sm text-charcoal/70">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-steel-dark shrink-0 mt-0.5" />
                  Compared across 20+ insurers, not one shelf
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-steel-dark shrink-0 mt-0.5" />
                  The premium we quote is the premium you'd pay direct
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-steel-dark shrink-0 mt-0.5" />
                  No obligation, and no pressure to decide today
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Form area */}
          <div>
            {submitted ? (
              <div className="bg-white border border-navy/8 rounded-3xl p-10 md:p-14 text-center shadow-card animate-fadeup">
                <span className="w-20 h-20 rounded-full bg-steel-soft text-navy flex items-center justify-center mx-auto mb-7">
                  <CheckCircle2 size={40} />
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-navy mb-3">
                  Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}.
                </h2>
                <p className="text-charcoal/60 text-lg leading-relaxed max-w-md mx-auto mb-8">
                  We've received your {form.insuranceType ? `${form.insuranceType.toLowerCase()} ` : ""}request and
                  will get back to you{form.phone ? ` on ${form.phone}` : ""} shortly
                  with quote options.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center gap-2 bg-navy text-white font-semibold px-7 py-3.5 rounded-full hover:bg-navy-light transition-colors focus-ring"
                  >
                    <Phone size={16} /> {site.phone}
                  </a>
                  <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-navy/25 text-navy font-semibold px-7 py-3.5 rounded-full hover:bg-navy/5 transition-colors focus-ring"
                  >
                    <MessageCircle size={16} /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-navy/8 rounded-3xl p-8 md:p-12 shadow-card">
                {/* Step indicator */}
                <div className="flex items-center justify-center gap-3 mb-10">
                  {STEP_LABELS.map((label, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                          i < step
                            ? "bg-steel text-white"
                            : i === step
                              ? "bg-navy text-white"
                              : "bg-navy/8 text-charcoal/40"
                        }`}
                      >
                        {i < step ? <CheckCircle2 size={18} /> : i + 1}
                      </div>
                      {i < STEP_LABELS.length - 1 && (
                        <div className={`w-8 h-0.5 rounded-full ${i < step ? "bg-steel" : "bg-navy/10"}`} />
                      )}
                    </div>
                  ))}
                </div>

                <h2 className="font-display text-2xl md:text-3xl text-navy text-center mb-2">
                  {STEP_LABELS[step]}
                </h2>
                <p className="text-charcoal/55 text-sm text-center mb-9">
                  Step {step + 1} of 4
                </p>

                {/* Step 0 — Who are you? */}
                {step === 0 && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    {CLIENT_TYPES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, clientType: t }))}
                        className={`flex-1 rounded-2xl border-2 px-6 py-8 text-center font-semibold transition-all ${
                          form.clientType === t
                            ? "border-navy bg-navy text-white shadow-md"
                            : "border-navy/15 bg-white text-navy hover:border-gold hover:bg-gold-soft"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 1 — What do you need? */}
                {step === 1 && (
                  <div>
                    <label htmlFor="insuranceType" className="block text-sm font-semibold text-navy mb-2">
                      Type of insurance
                    </label>
                    <select
                      id="insuranceType"
                      value={form.insuranceType}
                      onChange={update("insuranceType")}
                      className={inputCls}
                    >
                      <option value="" disabled>Select an option</option>
                      {QUOTE_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Step 2 — Contact details */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">Full name *</label>
                      <input
                        id="name" type="text" required value={form.name} onChange={update("name")}
                        className={inputCls} placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="organisation" className="block text-sm font-semibold text-navy mb-2">Organisation</label>
                      <input
                        id="organisation" type="text" value={form.organisation} onChange={update("organisation")}
                        className={inputCls} placeholder="Company or organisation name (optional)"
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-2">Phone number *</label>
                        <input
                          id="phone" type="tel" required value={form.phone} onChange={update("phone")}
                          className={inputCls} placeholder="+265 9XX XXX XXX"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">Email</label>
                        <input
                          id="email" type="email" value={form.email} onChange={update("email")}
                          className={inputCls} placeholder="you@example.com"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3 — Tell us briefly */}
                {step === 3 && (
                  <div>
                    <label htmlFor="details" className="block text-sm font-semibold text-navy mb-2">Details</label>
                    <textarea
                      id="details" rows={6} value={form.details} onChange={update("details")}
                      className={`${inputCls} resize-none`}
                      placeholder="What are you looking to cover? For example: 'A 2019 Toyota Hilux for my transport business' or 'Group medical for 30 employees'. Any detail helps us quote accurately."
                    />
                  </div>
                )}

                {/* Error */}
                {error && (
                  <p className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    {error} Please try again, or call us directly.
                  </p>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-10">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-navy/60 hover:text-navy transition-colors"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      disabled={!canNext}
                      onClick={() => setStep((s) => s + 1)}
                      className="inline-flex items-center gap-2 bg-navy text-white font-semibold text-sm px-8 py-3.5 rounded-full hover:bg-navy-light transition-colors focus-ring disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Next <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center gap-2 bg-steel text-white font-semibold text-sm px-8 py-4 rounded-full hover:bg-steel-light transition-colors focus-ring disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Sending..." : "Request Assistance"}
                    </button>
                  )}
                </div>

                <p className="mt-6 text-xs text-center text-charcoal/45 flex items-center justify-center gap-1.5">
                  <User size={13} /> We'll only use your details to prepare your quote.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
