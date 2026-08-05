import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { pool, initSchema } from "./db.js";

dotenv.config();

const defaultContent = {
  home_hero: {
    slides: [
      {
        eyebrow: "Licensed Insurance Broker · Blantyre, Malawi",
        title: ["Protecting What", "Matters Most"],
        subtitle: "Trusted insurance brokerage solutions for individuals, families, and businesses across Malawi.",
        body: "Whether you're protecting your family, your vehicle, or your business, Mahogany Insurance Brokers connects you with reliable insurance solutions tailored to your needs.",
        ctaLabel: "Request a Quote",
        ctaTo: "/quote",
      },
      {
        eyebrow: "Business Insurance",
        title: ["Protect Your Business", "with Confidence"],
        subtitle: "Helping businesses manage risk with comprehensive insurance solutions.",
        body: "From property and engineering insurance to public liability and goods in transit, we help businesses stay protected and prepared.",
        ctaLabel: "Business Solutions",
        ctaTo: "/services",
      },
      {
        eyebrow: "Motor Insurance",
        title: ["Drive with", "Peace of Mind"],
        subtitle: "Reliable motor insurance for private and commercial vehicles.",
        body: "We help you find the right motor insurance cover so you can stay focused on the road while we help manage the risks.",
        ctaLabel: "Get a Motor Quote",
        ctaTo: "/quote",
      },
      {
        eyebrow: "Claims Assistance",
        title: ["Here When You", "Need Us Most"],
        subtitle: "Supporting you through every step of the claims process.",
        body: "When the unexpected happens, our team is committed to helping you navigate the claims process efficiently and with confidence.",
        ctaLabel: "Claims Assistance",
        ctaTo: "/claims",
      },
      {
        eyebrow: "Get Started",
        title: ["Let's Find the Right", "Cover for You"],
        subtitle: "Professional advice. Trusted insurance partners. Personalized solutions.",
        body: "Speak with our experienced team today and receive guidance on choosing insurance that matches your needs and budget.",
        ctaLabel: "Request a Free Quote",
        ctaTo: "/quote",
      },
    ],
  },
  about_intro: {
    vision: "To be the insurance broker Malawians trust first — for clear advice, fair comparison, and dependable support when it matters most.",
    mission: "To connect individuals, SMEs and institutions across Malawi with the right cover from the right insurer — and to be there through renewals and claims.",
  },
  about_values: {
    items: [
      { title: "Client First", desc: "We place your interests ahead of any single insurer's, comparing across the market for the best fit." },
      { title: "Transparency", desc: "Clear terms, clear premiums, no fine print left unexplained." },
      { title: "Integrity", desc: "Licensed, accountable, and recognised by Malawi's leading insurance companies." },
      { title: "Standing By You", desc: "Our work doesn't end at the sale — we support you through renewals and claims." },
    ],
  },
  about_journey: {
    items: [
      { year: "Established", text: "Mahogany Insurance Brokers Limited is founded in Blantyre as an independent insurance intermediary." },
      { year: "Recognised", text: "Listed among licensed brokers by major Malawian insurers, including NICO General and United General Insurance." },
      { year: "2019", text: "Awarded a public-sector brokerage contract by the Malawi Electoral Commission, covering motor vehicle and business all-risk insurance." },
      { year: "Today", text: "Serving individuals, SMEs and institutions across Blantyre and beyond." },
    ],
  },
  services_categories: {
    items: [
      {
        label: "Personal Insurance",
        intro: "Cover for you, your family, and what you own.",
        items: [
          { icon: "Car", name: "Motor Insurance", desc: "Third-party and comprehensive cover for private vehicles." },
          { icon: "HomeIcon", name: "Home Insurance", desc: "Protection for your house and its contents." },
          { icon: "Plane", name: "Travel Insurance", desc: "Cover for medical emergencies and disruptions while travelling." },
          { icon: "HeartPulse", name: "Personal Accident", desc: "Financial protection if you're injured in an accident." },
        ],
      },
      {
        label: "Business Insurance",
        intro: "Cover for the risks that come with running a business.",
        items: [
          { icon: "Flame", name: "Fire & Property", desc: "Protection for premises, stock, and equipment against fire and allied perils." },
          { icon: "HardHat", name: "Engineering Insurance", desc: "Contractors' all risk, erection all risk, and machinery breakdown." },
          { icon: "Ship", name: "Marine & Goods in Transit", desc: "Cover for cargo moving by sea, air, or road." },
          { icon: "Scale", name: "Public & Employer Liability", desc: "Protection against claims from your operations, premises, or staff." },
          { icon: "Package", name: "Money & Burglary", desc: "Cover for cash in transit, cash on premises, and theft." },
        ],
      },
      {
        label: "Employee Benefits",
        intro: "Cover that helps you look after your team.",
        items: [
          { icon: "Users", name: "Group Medical", desc: "Health cover schemes for your employees." },
          { icon: "HeartPulse", name: "Group Life", desc: "Life assurance schemes for your workforce." },
        ],
      },
    ],
  },
  claims_steps: {
    items: [
      { icon: "PhoneCall", title: "Report It", desc: "Call or message us as soon as an incident happens. We'll guide you on the immediate next steps." },
      { icon: "FileText", title: "We Notify Your Insurer", desc: "We formally lodge your claim with the insurer and handle the paperwork on your behalf." },
      { icon: "Search", title: "We Follow Up", desc: "We track your claim's progress and chase the insurer so you don't have to." },
      { icon: "CheckCircle", title: "You Get Settled", desc: "We stay involved until your claim is settled fairly and on time." },
    ],
  },
  contact_info: {
    address: "Umoyo House, 2nd Floor, North Wing, Blantyre",
    phone: "+265 888 590 727",
    email: "fthenda@milbrol.com",
    hours: "Monday – Friday, 8:00 – 17:00",
    whatsapp: "265888590727",
  },
  faqs: {
    items: [
      { q: "What does an insurance broker actually do?", a: "A broker acts on your behalf, not the insurer's. We compare policies across multiple insurance companies, help you understand the cover and exclusions, arrange the policy and support you through renewals and claims." },
      { q: "Is it more expensive to use a broker?", a: "No. Brokers are typically paid a commission by the insurer, not by you. You get comparison and advice at no extra cost on the premium itself." },
      { q: "What documents do I need to get a quote?", a: "It depends on the cover. For motor insurance, your vehicle details and registration are usually enough to start. For business cover, a short description of your premises, stock or operations helps us quote accurately." },
      { q: "How long does a claim take to settle?", a: "Timelines vary by insurer and claim type, but keeping your documentation complete and responding quickly to requests helps avoid delays. We follow up on your behalf throughout." },
      { q: "Can I switch brokers if I already have a policy?", a: "Yes. You can typically appoint a new broker to service an existing policy, or bring your cover across at your next renewal." },
      { q: "Do you offer cover outside Blantyre?", a: "Yes. We serve clients across Malawi. Most documentation and communication can be handled remotely, and group and corporate schemes are arranged nationwide." },
    ],
  },
  news: {
    items: [
      { category: "Company Update", title: "Mahogany renews public-sector brokerage mandate", date: "Feb 2026", body: "We continue to service the motor and business all-risk requirements of the Malawi Electoral Commission as a licensed intermediary." },
      { category: "Insurance Tip", title: "Five things to check before renewing your motor policy", date: "Jan 2026", body: "Market value vs agreed value, passenger liability limits, excesses, courtesy cover and how long your claim history stays with you." },
      { category: "Company Update", title: "Why group medical cover matters for growing employers", date: "Dec 2025", body: "A healthier workforce is a more productive one. We compare group medical and group life schemes across Malawi's insurers for your team." },
    ],
  },
  tips: {
    items: [
      { title: "Review your cover annually", body: "Circumstances change — a new vehicle, an asset, or business growth can mean your existing cover no longer fits. An annual review catches gaps early." },
      { title: "Keep documentation organised", body: "Receipts, valuations and photos of insured items make claims faster to process if you ever need to make one." },
      { title: "Understand your exclusions", body: "Every policy has exclusions. Knowing what isn't covered is just as important as knowing what is." },
      { title: "Disclose honestly", body: "Accurate information at inception protects you later. Non-disclosure is one of the most common reasons claims are declined." },
      { title: "Report incidents immediately", body: "Timely reporting protects your cover and speeds up settlement. Keep your broker's number saved for when you need it." },
      { title: "Insure for replacement, not market value", body: "For buildings and stock, under-insurance can mean you're paid only a fraction of your loss. We help you get sums insured right." },
    ],
  },
};

async function seed() {
  await initSchema();

  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    console.error("Set ADMIN_PASSWORD in your .env before seeding.");
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 10);
  await pool.query(
    `INSERT INTO admins (username, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash`,
    [username, hash]
  );
  console.log(`Admin user "${username}" ready.`);

  for (const [key, data] of Object.entries(defaultContent)) {
    await pool.query(
      `INSERT INTO content_blocks (key, data)
       VALUES ($1, $2)
       ON CONFLICT (key) DO NOTHING`,
      [key, data]
    );
  }
  console.log("Default content seeded (existing content left untouched).");

  await pool.end();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
