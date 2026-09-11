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
  Landmark,
  ShieldCheck,
  PhoneCall,
  FileText,
  Search,
  CheckCircle2,
  Handshake,
  BadgeCheck,
  Eye,
  Heart,
} from "lucide-react";

import teamPlaceholder from "../assets/img-placeholder.jpg";
import heroFamily from "../assets/family.jpg";
import heroBusiness from "../assets/people-meeting.jpg";
import heroClaims from "../assets/advisor.jpg";
import heroGetStarted from "../assets/handshake.jpg";
import personStanding from "../assets/person-standing.jpg";
import S1House from "../assets/house.jpg";
import S2Business from "../assets/business.jpg";
import S3Employees from "../assets/employee.jpg";
import S4Car from "../assets/car.jpg";
import guideFirstTime from "../assets/firstTime.jpg";
import guideGroup from "../assets/group.jpg";
import claimChase from "../assets/chase.jpg";
import aboutBroker from "../assets/broker.jpg";
import aboutStory from "../assets/story.jpg";

export const SITE = {
  name: "Rhino Insurance Brokers & Consulting",
  shortName: "Rhino",
  tagline: "Strong Protection. Smarter Decisions.",
  phone: "+265 888 590 727",
  phoneHref: "tel:+265888590727",
  whatsapp: "https://wa.me/265888590727",
  email: "rhinoinfo@rhinoinsurancemw.com",
  address: "Umoyo House, 2nd Floor, North Wing",
  city: "Blantyre, Malawi",
  hours: "Mon – Fri, 8:00 – 17:00",
};

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Rhino" },
  { to: "/services", label: "Insurance Solutions" },
  { to: "/insights", label: "Insights" },
  { to: "/contact", label: "Contact" },
];

export const HERO_SLIDES = [
  {
    eyebrow: "Rhino Insurance Brokers & Consulting",
    title: ["Strong Protection.", "Smarter Decisions."],
    accent: "Smarter Decisions.",
    subtitle: "Helping individuals, businesses and organisations navigate insurance and risk with greater confidence.",
    cta: { to: "/services", label: "Explore Our Solutions" },
    cta2: { to: "/contact", label: "Talk to an Advisor" },
    image: heroFamily,
    alt: "A professional African business environment",
  },
  {
    eyebrow: "Business Insurance",
    title: ["Protecting What Keeps", "Your Business Moving."],
    accent: "Your Business Moving.",
    subtitle: "From everyday risks to more complex exposures, we help businesses explore protection solutions that support continuity and growth.",
    cta: { to: "/services", label: "Explore Business Solutions" },
    cta2: { to: "/contact", label: "Contact Our Team" },
    image: heroBusiness,
    alt: "Malawian professionals in a business meeting",
  },
  {
    eyebrow: "Expert Guidance",
    title: ["Guidance That Makes", "Insurance Clearer."],
    accent: "Insurance Clearer.",
    subtitle: "Professional advice to help you understand your options and make confident protection decisions.",
    cta: { to: "/services", label: "Explore Our Solutions" },
    cta2: { to: "/contact", label: "Talk to an Advisor" },
    image: heroClaims,
    alt: "A consultant explaining insurance options to a client",
  },
  {
    eyebrow: "Get Started",
    title: ["Let's Talk About", "Your Protection."],
    accent: "Your Protection.",
    subtitle: "Tell us what you need, and our team can help you take the next step.",
    cta: { to: "/quote", label: "Request a Quote" },
    cta2: { to: "/contact", label: "Contact Us" },
    image: heroGetStarted,
    alt: "A friendly consultant meeting with a client",
  },
];

export const PROCESS = [
  {
    step: "01",
    icon: PhoneCall,
    title: "Start the Conversation",
    body: "Tell us about your situation and what you want to protect.",
  },
  {
    step: "02",
    icon: Search,
    title: "Understand Your Needs",
    body: "We help you identify important protection considerations.",
  },
  {
    step: "03",
    icon: Scale,
    title: "Explore Your Options",
    body: "Consider suitable insurance solutions and available options.",
  },
  {
    step: "04",
    icon: BadgeCheck,
    title: "Move Forward With Confidence",
    body: "Make a more informed decision about your protection.",
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
      "Rhino handled our motor and business cover for the electoral process. Their team was professional, responsive and easy to work with throughout.",
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
      "As a church we needed cover that suited a community organisation. Rhino treated us like a real client, not a small account.",
    name: "Church Administrator",
    role: "Religious organisation, Blantyre",
  },
];

export const NEWS = [
  {
    category: "Company Update",
    title: "Rhino Insurance renews public-sector brokerage mandate",
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
    image: S1House,
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
    image: S2Business,
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
    image: S3Employees,
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
    title: "Ensure Safety",
    body: "Make sure everyone involved is safe and take reasonable steps to prevent further loss or damage.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Document What Happened",
    body: "Record relevant information about the incident, including dates, times and any supporting details.",
  },
  {
    icon: Search,
    step: "03",
    title: "Contact Rhino or Your Insurer",
    body: "Reach out to your Rhino representative or the appropriate insurer to report the incident.",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "We Guide You Forward",
    body: "We help you understand next steps and support you through the process where we can.",
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
    title: "Protection",
    icon: ShieldCheck,
    body: "Good protection starts with understanding what matters.",
  },
  {
    title: "Clarity",
    icon: Eye,
    body: "Insurance decisions should be easier to understand.",
  },
  {
    title: "Confidence",
    icon: Heart,
    body: "Clients should feel more confident about important protection decisions.",
  },
  {
    title: "Partnership",
    icon: Handshake,
    body: "Long-term relationships matter.",
  },
];

export const JOURNEY = [
  {
    year: "Listen",
    title: "We Listen",
    body: "Understanding your situation is the first step towards better protection.",
  },
  {
    year: "Understand",
    title: "We Understand",
    body: "We take the time to identify your specific needs and considerations.",
  },
  {
    year: "Advise",
    title: "We Advise",
    body: "Professional guidance to help you navigate insurance and risk decisions.",
  },
  {
    year: "Support",
    title: "We Support",
    body: "Ongoing guidance through renewals, claims and important moments.",
  },
];

export const CREDENTIALS = [
  {
    icon: ShieldCheck,
    title: "Professional Information",
    body: "Relevant regulatory and corporate information will be displayed here. Once verified, this could include licensing and registration details.",
  },
];

export const TEAM = [
  {
    name: "F. name",
    role: "Managing Director & Principal Broker",
    bio: "Leads the firm with over a decade of broking experience, and oversees our public-sector and institutional client relationships.",
    image: teamPlaceholder,
  },
  {
    name: "A. name",
    role: "Senior Broker — Commercial Lines",
    bio: "Specialises in fire, marine, engineering and liability programmes for businesses, contractors and logistics operators.",
    image: teamPlaceholder,
  },
  {
    name: "C. name",
    role: "Broker — Personal & Motor",
    bio: "Arranges motor, home and travel cover, making sure individuals and families understand exactly what their policy covers.",
    image: teamPlaceholder,
  },
  {
    name: "M. name",
    role: "Claims & Client Services",
    bio: "The first person clients speak to when it matters most. Handles claim lodgement, document collection and insurer follow-ups.",
    image: teamPlaceholder,
  },
  {
    name: "T. name",
    role: "Employee Benefits Specialist",
    bio: "Compares group medical and group life schemes for employers, schools and NGOs, and keeps schemes running smoothly year-round.",
    image: teamPlaceholder,
  },
  {
    name: "L. name",
    role: "Client Accounts & Renewals",
    bio: "Keeps every renewal, invoice and policy document organised, so nothing lapses and nothing slips through the cracks.",
    image: teamPlaceholder,
  },
];

export const FAQS = [
  {
    q: "What does an insurance broker do?",
    a: "A broker acts on your behalf, not the insurer's. We compare policies across multiple insurance companies, help you understand the cover and exclusions, and support you through the process.",
  },
  {
    q: "Is it more expensive to use a broker?",
    a: "No. Brokers are typically paid a commission by the insurer, not by you. You get comparison and advice at no extra cost on the premium itself.",
  },
  {
    q: "What documents do I need to get started?",
    a: "It depends on the cover. For motor insurance, your vehicle details are usually enough to start. For business cover, a short description of your premises or operations helps us understand your needs.",
  },
  {
    q: "Can I switch brokers if I already have a policy?",
    a: "Yes. You can typically appoint a new broker to service an existing policy, or bring your cover across at your next renewal.",
  },
  {
    q: "Do you serve clients outside Blantyre?",
    a: "Yes. We serve clients across Malawi. Most documentation and communication can be handled remotely.",
  },
];

export const TIPS = [
  {
    title: "Understanding the Role of an Insurance Broker",
    body: "A broker works on your behalf to compare options across the market, helping you find cover that fits your needs and budget.",
  },
  {
    title: "Questions to Ask Before Reviewing Your Insurance Cover",
    body: "Has your situation changed? Are your sums insured up to date? Do you understand your exclusions? These are important questions to consider.",
  },
  {
    title: "Protecting Business Assets: Where to Begin",
    body: "Start by identifying what you have, what it's worth, and what risks it faces. From there, you can explore appropriate protection.",
  },
  {
    title: "Why Risk Planning Matters for Growing Businesses",
    body: "As your business grows, your exposure changes. Regular risk reviews help ensure your protection keeps pace.",
  },
  {
    title: "Disclose Honestly",
    body: "Accurate information at inception protects you later. Non-disclosure is one of the most common reasons claims are declined.",
  },
  {
    title: "Report Incidents Promptly",
    body: "Timely reporting protects your cover and speeds up settlement. Keep your broker's number saved for when you need it.",
  },
];

export const QUOTE_TYPES = [
  "Motor Insurance",
  "Home & Property",
  "Personal Accident",
  "Travel Insurance",
  "Fire & Property",
  "Marine & Goods in Transit",
  "Engineering",
  "Public / Employer Liability",
  "Group Medical & Life",
  "Business Insurance",
  "Risk Advisory",
  "Other / Not Sure",
];

export const CLIENT_TYPES = ["Individual", "Business", "Organisation"];

export const HOME_SERVICES = [
  {
    image: S4Car,
    title: "Motor Insurance",
    body: "Third-party and comprehensive cover for private and commercial vehicles.",
    to: "/services",
  },
  {
    image: S2Business,
    title: "Business Insurance",
    body: "Cover for fire, liability, marine, engineering and other business risks.",
    to: "/services",
  },
  {
    image: S3Employees,
    title: "Employee Benefits",
    body: "Group medical and group life schemes that help you look after your team.",
    to: "/services",
  },
];

export const WHO_WE_SERVE = [
  {
    icon: Users,
    title: "Individuals",
    body: "Helping people explore protection for the things that matter.",
  },
  {
    icon: Briefcase,
    title: "Businesses",
    body: "Supporting businesses as they manage everyday and evolving risks.",
  },
  {
    icon: Landmark,
    title: "Organisations",
    body: "Helping institutions consider protection within their wider risk environment.",
  },
  {
    icon: ShieldCheck,
    title: "Specialised Needs",
    body: "Supporting more complex protection requirements through professional guidance.",
  },
];

export const INSIGHTS_ARTICLES = [
  {
    category: "Insurance Basics",
    title: "Understanding the Role of an Insurance Broker",
    date: "Aug 2026",
    body: "A broker works on your behalf to compare options across the market, helping you find cover that fits your needs and budget.",
  },
  {
    category: "Protection Tips",
    title: "Questions to Ask Before Reviewing Your Insurance Cover",
    date: "Jul 2026",
    body: "Has your situation changed? Are your sums insured up to date? Do you understand your exclusions?",
  },
  {
    category: "Business Risk",
    title: "Protecting Business Assets: Where to Begin",
    date: "Jul 2026",
    body: "Start by identifying what you have, what it's worth, and what risks it faces. From there, you can explore appropriate protection.",
  },
  {
    category: "Business Risk",
    title: "Why Risk Planning Matters for Growing Businesses",
    date: "Jun 2026",
    body: "As your business grows, your exposure changes. Regular risk reviews help ensure your protection keeps pace.",
  },
];

export const IMAGES = {
  personStanding,
  firstTime: guideFirstTime,
  group: guideGroup,
  chase: claimChase,
  broker: aboutBroker,
  story: aboutStory,
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
