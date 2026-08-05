import {
  Car,
  Home as HomeIcon,
  Plane,
  HeartPulse,
  Flame,
  HardHat,
  Ship,
  Scale,
  Package,
  Users,
  Briefcase,
  Building2,
  Landmark,
  GraduationCap,
  Stethoscope,
  Church,
  Truck,
  Wheat,
  ShieldCheck,
  PhoneCall,
  FileText,
  Search,
  CheckCircle2,
} from "lucide-react";

import teamPlaceholder from "../assets/img-placeholder.jpg";
import heroFamily from "../assets/family.jpg";
import heroBusiness from "../assets/people-meeting.jpg";
import heroMotor from "../assets/car.jpg";
import heroClaims from "../assets/advisor.jpg";
import heroGetStarted from "../assets/handshake.jpg";

export const SITE = {
  name: "Mahogany Insurance Brokers",
  shortName: "Mahogany",
  tagline: "Insurance, arranged with care",
  phone: "+265 888 590 727",
  phoneHref: "tel:+265888590727",
  whatsapp: "https://wa.me/265888590727",
  email: "fthenda@milbrol.com",
  address: "Umoyo House, 2nd Floor, North Wing",
  city: "Blantyre, Malawi",
  hours: "Mon – Fri, 8:00 – 17:00",
};

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  {
    to: "/about",
    label: "About",
    children: [
      { to: "/about", label: "Our Story" },
      { to: "/team", label: "Management" },
    ],
  },
  { to: "/services", label: "Insurance Solutions" },
  { to: "/claims", label: "Claims Help" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
];

export const HERO_SLIDES = [
  {
    eyebrow: "Licensed Insurance Broker · Blantyre, Malawi",
    title: ["Protecting What", "Matters Most"],
    accent: "Matters Most",
    subtitle: "Insurance, arranged with care.",
    cta: { to: "/quote", label: "Request a Quote" },
    cta2: { to: "/services", label: "Explore Our Services" },
    image: heroFamily,
    alt: "A professional Malawian family smiling outdoors",
  },
  {
    eyebrow: "Business Insurance",
    title: ["Protect Your Business", "with Confidence"],
    accent: "with Confidence",
    subtitle: "Protect your business from the unexpected.",
    cta: { to: "/services", label: "Business Solutions" },
    cta2: { to: "/contact", label: "Contact Our Team" },
    image: heroBusiness,
    alt: "Modern office buildings and professionals in a boardroom",
  },
  {
    eyebrow: "Motor Insurance",
    title: ["Drive with", "Peace of Mind"],
    accent: "Peace of Mind",
    subtitle: "Private and commercial cover you can rely on.",
    cta: { to: "/quote", label: "Get a Motor Quote" },
    cta2: { to: "/services", label: "Learn More" },
    image: heroMotor,
    alt: "A modern vehicle on a highway",
  },
  {
    eyebrow: "Claims Assistance",
    title: ["Here When You", "Need Us Most"],
    accent: "Need Us Most",
    subtitle: "We handle the paperwork and follow up on your behalf.",
    cta: { to: "/claims", label: "Claims Assistance" },
    cta2: { to: "/contact", label: "Contact Us" },
    image: heroClaims,
    alt: "An insurance advisor assisting a client with claim documents",
  },
  {
    eyebrow: "Get Started",
    title: ["Let's Find the Right", "Cover for You"],
    accent: "Cover for You",
    subtitle: "Personalized cover that fits your needs and budget.",
    cta: { to: "/quote", label: "Request a Free Quote" },
    cta2: { to: SITE.phoneHref, label: "Call Us Today" },
    image: heroGetStarted,
    alt: "A friendly consultant meeting with a client in a modern office",
  },
];

export const WHY_US = [
  {
    number: "01",
    title: "We work for you",
    body: "A broker acts on your behalf, not any single insurer's. We compare across the market to find the best fit for your risk and budget.",
  },
  {
    number: "02",
    title: "Licensed & recognised",
    body: "Registered with the Insurance Institute of Malawi and listed among approved intermediaries by Malawi's leading insurers.",
  },
  {
    number: "03",
    title: "No extra cost to you",
    body: "Brokers are paid by the insurer, not the client. You get comparison, advice and claims support at no additional premium.",
  },
  {
    number: "04",
    title: "We stay through claims",
    body: "Our work doesn't end at the sale. We handle the paperwork and follow up with the insurer until your claim is settled.",
  },
];

export const INDUSTRIES = [
  { icon: Briefcase, name: "SMEs & Corporates", desc: "Premises, stock, vehicles and liability cover for growing businesses." },
  { icon: Landmark, name: "Public Sector & Government", desc: "Brokerage contracts and asset cover for public institutions." },
  { icon: GraduationCap, name: "Educational Institutions", desc: "Property, liability and student protection for schools and colleges." },
  { icon: Stethoscope, name: "Healthcare & Clinics", desc: "Medical malpractice, property and staff cover for health facilities." },
  { icon: Truck, name: "Transport & Logistics", desc: "Fleet, goods in transit and cargo cover for operators and traders." },
  { icon: Wheat, name: "Agriculture & Cooperatives", desc: "Cover for produce, equipment, storage and agri-business assets." },
  { icon: Church, name: "Religious & Community Orgs", desc: "Cover designed for churches, NGOs and community institutions." },
  { icon: Building2, name: "NGOs & Development", desc: "Multi-asset and people cover for projects with donor requirements." },
];

export const PROCESS = [
  {
    step: "01",
    title: "Tell us what you need",
    body: "A quick conversation about what you're protecting — a vehicle, a home, a business, or your team.",
  },
  {
    step: "02",
    title: "We compare the market",
    body: "We source options from Malawi's leading insurers and explain the cover, limits and exclusions clearly.",
  },
  {
    step: "03",
    title: "You choose the right cover",
    body: "You pick the policy that fits. We arrange it, send you the documents and keep a copy on file.",
  },
  {
    step: "04",
    title: "We stay by your side",
    body: "We manage renewals, mid-term changes and claims — so you always have someone in your corner.",
  },
];

export const STATS = [
  { value: 12, suffix: "+", label: "Years broking in Malawi" },
  { value: 20, suffix: "+", label: "Insurers compared" },
  { value: 500, suffix: "+", label: "Policies arranged" },
  { value: 250, suffix: "+", label: "Claims supported" },
];

export const TESTIMONIALS = [
  {
    quote:
      "Mahogany handled our motor and business cover for the electoral process. Their team was professional, responsive and easy to work with throughout.",
    name: "Procurement Manager",
    role: "Public institution, Blantyre",
  },
  {
    quote:
      "They explained cover that other people had never taken the time to walk us through. We moved our entire fleet to their book and haven't looked back.",
    name: "Operations Director",
    role: "Transport & logistics company",
  },
  {
    quote:
      "When we had a claim, they did the chasing. We just handed over the documents and they followed up with the insurer until we were paid.",
    name: "Business Owner",
    role: "SME, Lilongwe",
  },
  {
    quote:
      "As a church we needed cover that suited a community organisation. Mahogany treated us like a real client, not a small account.",
    name: "Church Administrator",
    role: "Religious organisation, Blantyre",
  },
];

export const NEWS = [
  {
    category: "Company Update",
    title: "Mahogany renews public-sector brokerage mandate",
    date: "Feb 2026",
    body: "We continue to service the motor and business all-risk requirements of the Malawi Electoral Commission as a licensed intermediary.",
  },
  {
    category: "Insurance Tip",
    title: "Five things to check before renewing your motor policy",
    date: "Jan 2026",
    body: "Market value vs agreed value, passenger liability limits, excesses, courtesy cover and how long your claim history stays with you.",
  },
  {
    category: "Company Update",
    title: "Why group medical cover matters for growing employers",
    date: "Dec 2025",
    body: "A healthier workforce is a more productive one. We compare group medical and group life schemes across Malawi's insurers for your team.",
  },
];

export const SERVICE_CATEGORIES = [
  {
    id: "personal",
    label: "Personal Insurance",
    tagline: "Cover for you, your family and the things you own.",
    intro:
      "Life's big purchases — a car, a home, a journey — deserve proper protection. We find personal cover that fits your budget without cutting corners.",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80",
    items: [
      {
        icon: Car,
        name: "Motor Insurance",
        desc: "Third-party and comprehensive cover for private vehicles.",
        benefits: ["Third-party & comprehensive options", "Agreed or market value", "Claims follow-up handled for you"],
        who: "Private car owners and families.",
      },
      {
        icon: HomeIcon,
        name: "Home Insurance",
        desc: "Protection for your house and its contents.",
        benefits: ["Buildings & contents", "Fire and allied perils", "Burglary & theft cover"],
        who: "Homeowners and tenants protecting valuables.",
      },
      {
        icon: Plane,
        name: "Travel Insurance",
        desc: "Cover for medical emergencies and disruptions while travelling.",
        benefits: ["Emergency medical expenses", "Baggage & trip cancellation", "Regional & international plans"],
        who: "Frequent travellers, students and families.",
      },
      {
        icon: HeartPulse,
        name: "Personal Accident",
        desc: "Financial protection if you're injured in an accident.",
        benefits: ["24-hour worldwide cover", "Weekly benefits while disabled", "Lump-sum on disablement"],
        who: "Individuals who want a simple safety net.",
      },
    ],
  },
  {
    id: "business",
    label: "Business Insurance",
    tagline: "Cover for the risks that come with running a business.",
    intro:
      "Your business is exposed to more than you think — fire, theft, third-party claims, machinery breakdown. We put together a programme that fits how you actually operate.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    items: [
      {
        icon: Flame,
        name: "Fire & Property",
        desc: "Protection for premises, stock and equipment against fire and allied perils.",
        benefits: ["Buildings, stock & equipment", "Business interruption option", "Burglary and theft"],
        who: "Shops, warehouses, offices and manufacturers.",
      },
      {
        icon: HardHat,
        name: "Engineering",
        desc: "Contractors' all risk, erection all risk and machinery breakdown.",
        benefits: ["Contract works in progress", "Machinery breakdown", "Contractors' plant & equipment"],
        who: "Contractors, builders and plant owners.",
      },
      {
        icon: Ship,
        name: "Marine & Goods in Transit",
        desc: "Cover for cargo moving by sea, air or road.",
        benefits: ["All-risk cargo cover", "Warehouse-to-warehouse", "Customs & bonded stocks"],
        who: "Importers, exporters and traders.",
      },
      {
        icon: Scale,
        name: "Public & Employer Liability",
        desc: "Protection against claims from your operations, premises or staff.",
        benefits: ["Third-party injury & damage", "Employer's liability", "Legal defence costs"],
        who: "Any business that welcomes the public or employs staff.",
      },
      {
        icon: Package,
        name: "Money & Burglary",
        desc: "Cover for cash in transit, cash on premises and theft.",
        benefits: ["Cash in transit & on premises", "Till shortfall", "Stock & fittings theft"],
        who: "Retailers, wholesalers and services dealing in cash.",
      },
    ],
  },
  {
    id: "benefits",
    label: "Employee Benefits",
    tagline: "Cover that helps you look after your team.",
    intro:
      "Your people are your most valuable asset. We compare group medical and group life schemes across insurers so you can offer real protection at a sensible cost.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80",
    items: [
      {
        icon: Users,
        name: "Group Medical",
        desc: "Health cover schemes for your employees and their families.",
        benefits: ["Inpatient & outpatient options", "Dependants cover", "Network of hospitals & clinics"],
        who: "SMEs, corporates, NGOs and institutions.",
      },
      {
        icon: HeartPulse,
        name: "Group Life",
        desc: "Life assurance schemes for your workforce.",
        benefits: ["Multiple of annual salary", "Funeral & disability options", "Simple enrolment & claims"],
        who: "Employers who want a safety net for their people.",
      },
    ],
  },
];

export const CLAIM_STEPS = [
  {
    icon: PhoneCall,
    step: "01",
    title: "Report it",
    body: "Call or message us as soon as an incident happens. We'll guide you on immediate next steps and what to record.",
  },
  {
    icon: FileText,
    step: "02",
    title: "We notify your insurer",
    body: "We formally lodge your claim with the insurer and handle the paperwork on your behalf.",
  },
  {
    icon: Search,
    step: "03",
    title: "We follow up",
    body: "We track your claim's progress, chase the insurer and keep you informed — so you don't have to.",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "You get settled",
    body: "We stay involved until your claim is settled fairly and on time.",
  },
];

export const CLAIM_DOCS = [
  {
    type: "Motor claims",
    docs: ["Completed claim form", "Police report", "Copy of driver's licence", "Registration certificate / log book"],
  },
  {
    type: "Fire & property claims",
    docs: ["Completed claim form", "Police / fire brigade report", "Stock valuation & invoices", "Photos of damage"],
  },
  {
    type: "Marine & goods in transit",
    docs: ["Completed claim form", "Bill of lading / waybill", "Commercial invoice & packing list", "Surveyor's report (if any)"],
  },
  {
    type: "Medical & life claims",
    docs: ["Completed claim form", "Medical certificate", "Death certificate (life)", "Supporting bills or reports"],
  },
];

export const VALUES = [
  {
    title: "Client first",
    body: "We place your interests ahead of any single insurer's, comparing across the market for the best fit.",
  },
  {
    title: "Transparency",
    body: "Clear terms, clear premiums and no fine print left unexplained.",
  },
  {
    title: "Integrity",
    body: "Licensed, accountable and recognised by Malawi's leading insurance companies.",
  },
  {
    title: "Standing by you",
    body: "Our work doesn't end at the sale — we support you through renewals and claims.",
  },
];

export const JOURNEY = [
  {
    year: "Established",
    title: "Founded in Blantyre",
    body: "Mahogany Insurance Brokers Limited is established as an independent insurance intermediary in Blantyre.",
  },
  {
    year: "Recognised",
    title: "Approved by leading insurers",
    body: "Listed among the approved brokers recognised by Malawi's leading insurance companies.",
  },
  {
    year: "2019",
    title: "Public-sector mandate",
    body: "Awarded a brokerage contract by the Malawi Electoral Commission covering motor vehicle and business all-risk insurance.",
  },
  {
    year: "Today",
    title: "Serving all of Malawi",
    body: "Supporting individuals, SMEs and institutions across Blantyre, Lilongwe and beyond — with more cover types than ever.",
  },
];

export const CREDENTIALS = [
  {
    icon: ShieldCheck,
    title: "Licensed intermediary",
    body: "Registered with the Insurance Institute of Malawi as a recognised insurance broker.",
  },
  {
    icon: Landmark,
    title: "Approved by major insurers",
    body: "Listed among approved intermediaries by Malawi's leading insurance companies.",
  },
  {
    icon: Briefcase,
    title: "Public-sector experience",
    body: "Awarded a brokerage contract by the Malawi Electoral Commission (2019).",
  },
  {
    icon: Users,
    title: "Clients across sectors",
    body: "Trusted by individuals, SMEs, NGOs, churches and public institutions across Malawi.",
  },
];

export const TEAM = [
  {
    name: "F. Thenda",
    role: "Managing Director & Principal Broker",
    bio: "Leads the firm with over a decade of broking experience, and oversees our public-sector and institutional client relationships.",
    image: teamPlaceholder,
  },
  {
    name: "A. Banda",
    role: "Senior Broker — Commercial Lines",
    bio: "Specialises in fire, marine, engineering and liability programmes for businesses, contractors and logistics operators.",
    image: teamPlaceholder,
  },
  {
    name: "C. Phiri",
    role: "Broker — Personal & Motor",
    bio: "Arranges motor, home and travel cover, making sure individuals and families understand exactly what their policy covers.",
    image: teamPlaceholder,
  },
  {
    name: "M. Mwale",
    role: "Claims & Client Services",
    bio: "The first person clients speak to when it matters most. Handles claim lodgement, document collection and insurer follow-ups.",
    image: teamPlaceholder,
  },
  {
    name: "T. Nkhoma",
    role: "Employee Benefits Specialist",
    bio: "Compares group medical and group life schemes for employers, schools and NGOs, and keeps schemes running smoothly year-round.",
    image: teamPlaceholder,
  },
  {
    name: "L. Chikopa",
    role: "Client Accounts & Renewals",
    bio: "Keeps every renewal, invoice and policy document organised, so nothing lapses and nothing slips through the cracks.",
    image: teamPlaceholder,
  },
];

export const FAQS = [
  {
    q: "What does an insurance broker actually do?",
    a: "A broker acts on your behalf, not the insurer's. We compare policies across multiple insurance companies, help you understand the cover and exclusions, arrange the policy and support you through renewals and claims.",
  },
  {
    q: "Is it more expensive to use a broker?",
    a: "No. Brokers are typically paid a commission by the insurer, not by you. You get comparison and advice at no extra cost on the premium itself.",
  },
  {
    q: "What documents do I need to get a quote?",
    a: "It depends on the cover. For motor insurance, your vehicle details and registration are usually enough to start. For business cover, a short description of your premises, stock or operations helps us quote accurately.",
  },
  {
    q: "How long does a claim take to settle?",
    a: "Timelines vary by insurer and claim type, but keeping your documentation complete and responding quickly to requests helps avoid delays. We follow up on your behalf throughout.",
  },
  {
    q: "Can I switch brokers if I already have a policy?",
    a: "Yes. You can typically appoint a new broker to service an existing policy, or bring your cover across at your next renewal.",
  },
  {
    q: "Do you offer cover outside Blantyre?",
    a: "Yes. We serve clients across Malawi. Most documentation and communication can be handled remotely, and group and corporate schemes are arranged nationwide.",
  },
];

export const TIPS = [
  {
    title: "Review your cover annually",
    body: "Circumstances change — a new vehicle, an asset, or business growth can mean your existing cover no longer fits. An annual review catches gaps early.",
  },
  {
    title: "Keep documentation organised",
    body: "Receipts, valuations and photos of insured items make claims faster to process if you ever need to make one.",
  },
  {
    title: "Understand your exclusions",
    body: "Every policy has exclusions. Knowing what isn't covered is just as important as knowing what is.",
  },
  {
    title: "Disclose honestly",
    body: "Accurate information at inception protects you later. Non-disclosure is one of the most common reasons claims are declined.",
  },
  {
    title: "Report incidents immediately",
    body: "Timely reporting protects your cover and speeds up settlement. Keep your broker's number saved for when you need it.",
  },
  {
    title: "Insure for replacement, not market value",
    body: "For buildings and stock, under-insurance can mean you're paid only a fraction of your loss. We help you get sums insured right.",
  },
];

export const QUOTE_TYPES = [
  "Motor Insurance",
  "Fire & Property",
  "Marine & Goods in Transit",
  "Engineering",
  "Public / Employer Liability",
  "Group Medical & Life",
  "Business Insurance",
  "Travel / Personal Accident",
  "Other / Not Sure",
];

export const IMAGES = {
  office:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
  meeting:
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1600&q=80",
  handshake:
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80",
  family:
    "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1600&q=80",
  documents:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
  claims:
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80",
};
