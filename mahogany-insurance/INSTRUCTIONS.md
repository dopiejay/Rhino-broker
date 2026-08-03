# Mahogany Insurance Brokers — Demo Website

A React (Vite) + Tailwind demo site built as a speculative pitch for
Mahogany Insurance Brokers Limited, a licensed insurance broker in
Blantyre with no existing website.

## What's included

- **Home** — auto-rotating hero (4 message slides, no photography — see
  note below on why), trust strip, services preview, quote CTA
- **Who We Are (About)** — vision/mission, values, a "journey" timeline
  built from the verifiable facts (licensing, the 2019 MEC brokerage
  contract), and a credibility section
- **Insurance Solutions (Services)** — grouped into Personal, Business,
  and Employee Benefits categories, 11 products total
- **Claims Help** — a 4-step "how a claim works" explainer, plus a claim
  forms / emergency contact strip
- **Resources** — insurance tips and an FAQ accordion, aimed at SEO and
  building trust before someone even calls
- **Request a Quote** — a working form (name, phone, email, insurance type,
  details) that submits to the backend and shows a success state
- **Contact** — office address, phone, email, WhatsApp link, embedded map

Brand palette: white/cream as the dominant background, dark navy as the
structural color (headers, hero, footer, headings), light green used
sparingly as the accent (primary buttons, active nav state, small
highlights), and brass/gold as a secondary accent. Signature detail: a
thin wood-grain-style ring divider between sections, echoing the
company name and "rings of experience."

**Why there's no photography:** hotlinking or embedding photos pulled
from a web search into a real commercial site risks using someone
else's copyrighted work without a license. The hero is built as a bold
color/type carousel instead. Once you're talking to Mahogany directly,
swap in real photos of their office/team, or licensed stock (Unsplash's
license permits commercial use), and it'll come together fast — the
layout is already built to hold images if you want to add them later.

**No fabricated stats or testimonials.** I deliberately left out things
like client counts or quotes, since making those up for a pitch to a
real company is a credibility risk if anyone ever asks where a number
came from. Add real ones once you have them.

## Running it locally

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually http://localhost:5173).

## Deploying (e.g. to Vercel)

```bash
npm run build
```

This outputs a production build to `dist/`. Push this project to a
GitHub repo and import it into Vercel (framework preset: Vite), or run
`npx vercel` from this folder if you have the Vercel CLI installed.

## Before this goes live / gets pitched — things to verify or add

1. **Confirm contact details.** Phone, email, and office address were
   pulled from public broker-directory listings, not from the company
   directly — verify these are current before publishing.
2. **WhatsApp number** on the Contact page currently reuses the phone
   number as a guess — confirm they actually have WhatsApp on that line.
3. **Contact form opens an email draft.** Submitting "Send us a message"
   opens a pre-filled email to the office address (it doesn't post to the
   backend). If you'd rather have messages land in a database inbox, the
   backend previously had a `/api/messages` inbox + admin Messages page —
   happy to restore that.
4. **No real photography or team info used.** I deliberately didn't
   invent staff names, photos, or a founding story — only used facts
   that are publicly verifiable (licensing, the MEC contract). If you
   get real photos/team info from them, swap them in for a stronger
   About page.
5. **Google Maps embed** is a generic search-based embed for "Umoyo
   House, Blantyre" — swap in their exact pin if you get one.

## Project structure

```
src/
  components/   Navbar, Footer, GrainDivider (signature element), HeroSlider
  pages/        Home, About, Services, Claims, Resources, Quote, Contact
  layouts/      PublicLayout (site chrome for the public routes)
  admin/        The admin dashboard (login, dashboard, quotes, content editor)
  site/         SiteContentProvider — merges backend content over built-in defaults
  App.jsx       Routing — public pages plus /admin/* for the dashboard
  index.css     Base styles, fonts, focus states
tailwind.config.js   Brand color tokens (navy, emerald, gold, cream, charcoal,
                     green, brass, parchment, ink)
```

## Ideas held back for a "Phase 2" pitch (not built yet)

Worth mentioning to Mahogany as a roadmap if the initial site lands
well, rather than building them into this demo: a client portal for
tracking policies/claims, secure document uploads, renewal reminders,
and a quote calculator. (An admin dashboard already exists at
`/admin` for managing quote requests and editing site content.)
Keeping these as a follow-up conversation avoids overbuilding the demo
before they've even said yes.
