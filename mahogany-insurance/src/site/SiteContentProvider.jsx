import { useEffect, useMemo, useState } from "react";
import {
  Car,
  Home as HomeIcon,
  Plane,
  HeartPulse,
  Flame,
  HardHat,
  Ship,
  Scale,
  Users,
  Package,
  PhoneCall,
  FileText,
  Search,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { getContent } from "../lib/api";
import { SiteContentContext } from "./SiteContentContext";
import {
  SITE,
  HERO_SLIDES,
  VALUES,
  JOURNEY,
  SERVICE_CATEGORIES,
  CLAIM_STEPS,
  FAQS,
  NEWS,
  TIPS,
} from "../data/site";

const ICON_MAP = {
  Car,
  HomeIcon,
  Plane,
  HeartPulse,
  Flame,
  HardHat,
  Ship,
  Scale,
  Users,
  Package,
  PhoneCall,
  FileText,
  Search,
  CheckCircle: CheckCircle2,
  CheckCircle2,
  ShieldCheck,
};

function splitTitle(title) {
  const t = (title || "").trim();
  if (!t) return ["", ""];
  const idx = t.lastIndexOf(" ");
  if (idx === -1) return [t, ""];
  return [t.slice(0, idx), t.slice(idx + 1)];
}

function buildSite(contactInfo) {
  if (!contactInfo) return SITE;
  const phone = contactInfo.phone || SITE.phone;
  const rawWhatsapp = contactInfo.whatsapp || "";
  const whatsapp = rawWhatsapp
    ? rawWhatsapp.startsWith("http")
      ? rawWhatsapp
      : `https://wa.me/${rawWhatsapp.replace(/\D/g, "")}`
    : SITE.whatsapp;
  return {
    ...SITE,
    phone,
    phoneHref: `tel:${phone.replace(/[^\d+]/g, "")}`,
    email: contactInfo.email || SITE.email,
    address: contactInfo.address || SITE.address,
    hours: contactInfo.hours || SITE.hours,
    whatsapp,
  };
}

function mergeHeroSlides(live, fallback) {
  if (!Array.isArray(live) || live.length === 0) return fallback;
  return live.map((s, i) => {
    const fb = fallback[i] || fallback[0];
    const title = Array.isArray(s.title) ? s.title : splitTitle(s.title);
    return {
      eyebrow: s.eyebrow || fb?.eyebrow || "",
      title,
      accent: title[1] || fb?.accent || "",
      body: s.body || fb?.body || "",
      cta: {
        to: s.ctaTo || fb?.cta?.to || "/quote",
        label: s.ctaLabel || fb?.cta?.label || "Request a Free Quote",
      },
      cta2: fb?.cta2 || { to: "/services", label: "Explore Cover" },
      image: fb?.image,
      alt: fb?.alt || "",
    };
  });
}

function mergeValues(live, fallback) {
  if (!Array.isArray(live) || live.length === 0) return fallback;
  return live.map((v, i) => ({
    title: v.title || fallback[i]?.title || "",
    body: v.desc || fallback[i]?.body || "",
  }));
}

function mergeJourney(live, fallback) {
  if (!Array.isArray(live) || live.length === 0) return fallback;
  return live.map((j, i) => {
    const fb = fallback[i];
    const text = j.text || j.body || "";
    return {
      year: j.year || fb?.year || "",
      title: j.title || fb?.title || text.split(/[.!?]/)[0].slice(0, 60),
      body: text || fb?.body || "",
    };
  });
}

function mergeServiceCategories(live, fallback) {
  if (!Array.isArray(live) || live.length === 0) return fallback;
  return live.map((cat, i) => {
    const fb = fallback[i];
    const items = (cat.items || []).map((item) => {
      const fbItem = fb?.items?.find((x) => x.name === item.name);
      return {
        ...fbItem,
        icon: ICON_MAP[item.icon] || fbItem?.icon || ShieldCheck,
        name: item.name,
        desc: item.desc || fbItem?.desc || "",
        benefits: fbItem?.benefits || [],
        who: fbItem?.who || "",
      };
    });
    return {
      id: cat.id || fb?.id || `cat-${i + 1}`,
      label: cat.label || fb?.label || "",
      tagline: fb?.tagline || "",
      intro: cat.intro || fb?.intro || "",
      image: fb?.image || "",
      items,
    };
  });
}

function mergeClaimSteps(live, fallback) {
  if (!Array.isArray(live) || live.length === 0) return fallback;
  return live.map((s, i) => ({
    icon: ICON_MAP[s.icon] || fallback[i]?.icon || FileText,
    step: String(i + 1).padStart(2, "0"),
    title: s.title || fallback[i]?.title || "",
    body: s.desc || fallback[i]?.body || "",
  }));
}

function mergeFaqs(live, fallback) {
  if (!Array.isArray(live) || live.length === 0) return fallback;
  return live.map((f, i) => ({
    q: f.q || fallback[i]?.q || "",
    a: f.a || fallback[i]?.a || "",
  }));
}

function mergeNews(live, fallback) {
  if (!Array.isArray(live) || live.length === 0) return fallback;
  return live.map((n, i) => ({
    category: n.category || fallback[i]?.category || "News",
    title: n.title || fallback[i]?.title || "",
    date: n.date || fallback[i]?.date || "",
    body: n.body || fallback[i]?.body || "",
  }));
}

function mergeTips(live, fallback) {
  if (!Array.isArray(live) || live.length === 0) return fallback;
  return live.map((t, i) => ({
    title: t.title || fallback[i]?.title || "",
    body: t.body || fallback[i]?.body || "",
  }));
}

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    let active = true;
    getContent().then((data) => {
      if (active) setContent(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo(() => {
    const blocks = content || {};
    return {
      ready: !!content,
      site: buildSite(blocks.contact_info),
      heroSlides: mergeHeroSlides(blocks.home_hero?.slides, HERO_SLIDES),
      values: mergeValues(blocks.about_values?.items, VALUES),
      journey: mergeJourney(blocks.about_journey?.items, JOURNEY),
      aboutIntro: blocks.about_intro || null,
      serviceCategories: mergeServiceCategories(blocks.services_categories?.items, SERVICE_CATEGORIES),
      claimSteps: mergeClaimSteps(blocks.claims_steps?.items, CLAIM_STEPS),
      faqs: mergeFaqs(blocks.faqs?.items, FAQS),
      news: mergeNews(blocks.news?.items, NEWS),
      tips: mergeTips(blocks.tips?.items, TIPS),
    };
  }, [content]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}
