# Mahogany Insurance Brokers — Full Project

Three parts, meant to run together:

- **mahogany-insurance/** — the public website (React + Vite + Tailwind)
- **mahogany-backend/** — the API (Node/Express + PostgreSQL) that stores
  quote requests, contact-form messages and editable site content
- **mahogany-admin/** — the admin dashboard (React + Vite + Tailwind) for
  managing quote requests and messages, and editing site text

The public site works fine on its own with no backend running — every page
falls back to its built-in default text. Connect the backend and the Quote
and Contact forms actually submit (stored in Postgres), and content edits
made in the admin dashboard go live on the public site.

## 1. Set up the database

You need a PostgreSQL database. The easiest option is a free one at
[neon.tech](https://neon.tech) — create a project, copy the connection
string it gives you (it'll look like
`postgres://user:pass@host/dbname?sslmode=require`).

## 2. Set up the backend

```bash
cd mahogany-backend
npm install
cp .env.example .env
```

Edit `.env`:
- `DATABASE_URL` — your Neon (or other Postgres) connection string
- `JWT_SECRET` — any long random string
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — your admin login for the dashboard
- `CORS_ORIGINS` — the URLs the public site and admin app will run on
  (defaults already cover local dev)

Then create the database tables, admin user, and default content:

```bash
npm run seed
```

Start the server:

```bash
npm start
```

It runs on port 4000 by default. Visit `http://localhost:4000/api/health`
to confirm it's up.

## 3. Set up the public site

```bash
cd mahogany-insurance
npm install
cp .env.example .env
# edit .env if your backend isn't at http://localhost:4000
npm run dev
```

## 4. Set up the admin dashboard

```bash
cd mahogany-admin
npm install
cp .env.example .env
# edit .env if your backend isn't at http://localhost:4000
npm run dev
```

Log in with the `ADMIN_USERNAME` / `ADMIN_PASSWORD` you set in the
backend's `.env`.

## What the admin dashboard does

- **Dashboard** — quick counts of new / contacted / closed quote requests
  and unread contact-form messages
- **Quote Requests** — every submission from the site's "Request a Quote"
  form, with contact details, the message, and buttons to mark it new /
  contacted / closed, or delete it
- **Messages** — every submission from the site's Contact form, with
  buttons to mark it new / read / archived, or delete it
- **Site Content** — edit just the critical details: contact information
  (address/phone/email/hours/WhatsApp) and FAQs — changes go live on the
  public site immediately after saving. Everything else on the site is
  managed in code (see `mahogany-insurance/src/data/site.js`).

## How the public site and backend fit together

- The public site reads `VITE_API_URL` (default `http://localhost:4000`) to
  reach the backend.
- On load it fetches `/api/content` and merges any saved blocks over its
  built-in defaults — so every page still renders if the backend is down.
- Submitting the Quote form POSTs to `/api/quotes`; submitting the Contact
  form POSTs to `/api/messages`. Both show an error and stay on the form if
  the request fails, and fall back to "call/WhatsApp us" messaging.
- Note: the "Supporting documents" attachment field on the Quote form is
  currently UI-only — files are not uploaded. Send documents by email or
  WhatsApp until upload is added.

## Deploying

- **Database**: Neon (already cloud-hosted once you create the project)
- **Backend**: Render, Railway, or similar — set the same environment
  variables as your local `.env`, plus update `CORS_ORIGINS` to your real
  site/admin URLs once deployed
- **Public site & Admin dashboard**: Vercel — set `VITE_API_URL` to your
  deployed backend's URL for each

## Still worth doing before this goes live

1. **Change the seeded admin password** to something you actually intend
   to keep, and don't commit `.env` files anywhere.
2. **Photos** — every page has a clearly labeled placeholder box where a
   real photo should go (office, team, clients, etc.). Swap those in once
   you have them; see `mahogany-insurance/INSTRUCTIONS.md` for the list.
3. **Confirm the seeded contact details** (phone/email/address) are
   accurate — they came from public directory listings, not from Mahogany
   directly.
4. **Add more admin users if needed** — right now there's a single admin
   login seeded from `.env`. If more than one person needs access, the
   `admins` table supports multiple rows; you'd add a small "create user"
   script or endpoint for that.
