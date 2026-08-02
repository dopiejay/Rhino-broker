import { useState } from "react";
import {
  CheckCircle2,
  Send,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  UploadCloud,
  ShieldCheck,
  FileText,
  User,
} from "lucide-react";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { QUOTE_TYPES } from "../data/site";
import { submitQuote } from "../lib/api";
import { useSiteContent } from "../site/SiteContentContext";

const CONTACT_METHODS = ["Phone", "Email", "WhatsApp"];

export default function Quote() {
  const { site } = useSiteContent();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    type: "",
    method: "Phone",
    details: "",
  });
  const [fileName, setFileName] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFile(e) {
    const f = e.target.files?.[0];
    setFileName(f ? f.name : "");
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    submitQuote({
      name: form.name,
      company: form.company || "",
      phone: form.phone,
      email: form.email || "",
      insurance_type: form.type,
      preferred_contact: form.method,
      details: form.details,
    })
      .then(() => setSubmitted(true))
      .catch((err) => setError(err.message))
      .finally(() => setSubmitting(false));
  }

  const inputCls =
    "w-full bg-white border border-navy/15 rounded-xl px-4 py-3.5 text-sm focus-ring focus:border-gold transition-colors placeholder:text-charcoal/35";

  return (
    <div>
      <PageHero
        eyebrow="Get Started"
        title="Request your"
        accent="free quote."
        description="Tell us a little about what you'd like covered and we'll come back with options compared across insurers — no obligation, no pressure."
      />

      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-[380px_1fr] gap-14 lg:gap-20 items-start">
          {/* Contact sidebar */}
          <div className="lg:sticky lg:top-24 space-y-5">
            <Reveal className="bg-navy-deep text-white rounded-3xl p-8 grain relative overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden="true" />
              <h3 className="font-display text-xl mb-6">Prefer to talk first?</h3>
              <div className="space-y-5 text-sm">
                <a href={site.phoneHref} className="flex items-center gap-4 group">
                  <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-emerald-light shrink-0 group-hover:bg-emerald group-hover:text-white transition-colors">
                    <Phone size={18} />
                  </span>
                  <span>
                    <span className="block text-white/50 text-xs uppercase tracking-wider">Call us</span>
                    <span className="font-semibold">{site.phone}</span>
                  </span>
                </a>
                <a href={`mailto:${site.email}`} className="flex items-center gap-4 group">
                  <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-emerald-light shrink-0 group-hover:bg-emerald group-hover:text-white transition-colors">
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
                  <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-emerald-light shrink-0 group-hover:bg-emerald group-hover:text-white transition-colors">
                    <MessageCircle size={18} />
                  </span>
                  <span>
                    <span className="block text-white/50 text-xs uppercase tracking-wider">WhatsApp</span>
                    <span className="font-semibold">Chat instantly</span>
                  </span>
                </a>
                <div className="flex items-center gap-4">
                  <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-gold shrink-0">
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
                  <CheckCircle2 size={16} className="text-emerald shrink-0 mt-0.5" />
                  Compared across 20+ insurers, not one shelf
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald shrink-0 mt-0.5" />
                  The premium we quote is the premium you'd pay direct
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald shrink-0 mt-0.5" />
                  No obligation, and no pressure to decide today
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Form */}
          <div>
            {submitted ? (
              <div className="bg-white border border-navy/8 rounded-3xl p-10 md:p-14 text-center shadow-card animate-fadeup">
                <span className="w-20 h-20 rounded-full bg-emerald-soft text-emerald flex items-center justify-center mx-auto mb-7">
                  <CheckCircle2 size={40} />
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-navy mb-3">
                  Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}.
                </h2>
                <p className="text-charcoal/60 text-lg leading-relaxed max-w-md mx-auto mb-8">
                  We've received your {form.type ? `${form.type.toLowerCase()} ` : ""}request and
                  will get back to you {form.method === "Email" ? "by email" : `on ${form.phone || "your number"}`} shortly
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
                <h2 className="font-display text-2xl md:text-3xl text-navy mb-2">Tell us what you're covering</h2>
                <p className="text-charcoal/55 text-sm mb-9">
                  Fields marked * are required. The more you share, the more accurate your quote.
                </p>

                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-navy mb-2">Full name *</label>
                      <input
                        id="name" name="name" type="text" required value={form.name} onChange={handleChange}
                        className={inputCls} placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-navy mb-2">Company (optional)</label>
                      <input
                        id="company" name="company" type="text" value={form.company || ""} onChange={handleChange}
                        className={inputCls} placeholder="If you're enquiring for a business"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-navy mb-2">Phone number *</label>
                      <input
                        id="phone" name="phone" type="tel" required value={form.phone} onChange={handleChange}
                        className={inputCls} placeholder="+265 9XX XXX XXX"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">Email</label>
                      <input
                        id="email" name="email" type="email" value={form.email} onChange={handleChange}
                        className={inputCls} placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="type" className="block text-sm font-semibold text-navy mb-2">Type of insurance *</label>
                    <select id="type" name="type" required value={form.type} onChange={handleChange} className={inputCls}>
                      <option value="" disabled>Select an option</option>
                      {QUOTE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <fieldset>
                    <legend className="text-sm font-semibold text-navy mb-3">How should we contact you?</legend>
                    <div className="flex flex-wrap gap-3">
                      {CONTACT_METHODS.map((m) => (
                        <label key={m} className="cursor-pointer">
                          <input
                            type="radio"
                            name="method"
                            value={m}
                            checked={form.method === m}
                            onChange={handleChange}
                            className="peer sr-only"
                          />
                          <span className="inline-flex items-center gap-2 border border-navy/15 rounded-full px-5 py-2.5 text-sm font-medium text-charcoal/70 peer-checked:bg-navy peer-checked:text-white peer-checked:border-navy transition-colors focus-ring">
                            {m === "Phone" ? <Phone size={14} /> : m === "Email" ? <Mail size={14} /> : <MessageCircle size={14} />}
                            {m}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="details" className="block text-sm font-semibold text-navy mb-2">Tell us more *</label>
                    <textarea
                      id="details" name="details" rows={5} required value={form.details} onChange={handleChange}
                      className={`${inputCls} resize-none`}
                      placeholder="What are you looking to cover? For example: 'A 2019 Toyota Hilux for my transport business' or 'Group medical for 30 employees'. Any detail helps us quote accurately."
                    />
                  </div>

                  <div>
                    <label htmlFor="file" className="block text-sm font-semibold text-navy mb-2">Supporting documents (optional)</label>
                    <label
                      htmlFor="file"
                      className={`flex items-center justify-center gap-3 border-2 border-dashed rounded-xl px-6 py-8 text-center cursor-pointer transition-colors ${
                        fileName ? "border-emerald bg-emerald-soft" : "border-navy/20 bg-cream hover:border-gold"
                      }`}
                    >
                      <UploadCloud size={22} className={fileName ? "text-emerald" : "text-charcoal/40"} />
                      <span className="text-sm text-charcoal/60">
                        {fileName ? (
                          <span className="font-semibold text-emerald-dark flex items-center gap-2">
                            <FileText size={15} /> {fileName}
                          </span>
                        ) : (
                          <>Drag a file here, or <span className="text-navy font-semibold underline">browse</span> — vehicle reg, policy, or notes.</>
                        )}
                      </span>
                    </label>
                    <input id="file" name="file" type="file" className="sr-only" onChange={handleFile} />
                    <p className="text-xs text-charcoal/45 mt-2 flex items-center gap-1.5">
                      <ShieldCheck size={13} className="text-emerald" />
                      Attachments stay confidential between you and our team.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-emerald text-white font-semibold text-sm px-8 py-4 rounded-full hover:bg-emerald-dark transition-colors focus-ring disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending..." : "Submit Quote Request"} <Send size={16} />
                  </button>
                  {error && (
                    <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      {error} Please try again, or call us directly.
                    </p>
                  )}
                  <p className="text-xs text-center text-charcoal/45 flex items-center justify-center gap-1.5">
                    <User size={13} /> We'll only use your details to prepare your quote.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
