# Mahogany Insurance Brokers — Project

Two parts, meant to run together:

- **mahogany-insurance/** — one React (Vite + Tailwind) app containing BOTH
  the public website and the admin dashboard. The admin lives under the
  `/admin` route of the same app.
- **mahogany-backend/** — the API (Node/Express + PostgreSQL) that stores
  quote requests and the editable site content.

The public site works fine on its own with no backend running — every page
falls back to its built-in default text. Connect the backend and the Quote
form actually submits (stored in Postgres), and content edits made in the
admin dashboard go live on the public site.

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
- `CORS_ORIGINS` — the origins (frontend dev server and deployed site)
  allowed to call the API. Unset = all origins allowed.

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

## 3. Set up the site + admin (one app)

```bash
cd mahogany-insurance
npm install
cp .env.example .env
npm run dev
```

In local dev the site runs at `http://localhost:5173` and the admin
dashboard at `http://localhost:5173/admin`.

`VITE_API_URL` in `.env` tells the app where the backend is:
- Local dev: `http://localhost:4000`
- Production: the deployed backend's URL (e.g. `https://your-backend.onrender.com`)

## What the admin dashboard does

Log in at `/admin/login` with the `ADMIN_USERNAME` / `ADMIN_PASSWORD` you
set in the backend's `.env`.

- **Dashboard** (`/admin`) — counts of new / contacted / closed quote
  requests, with quick links
- **Quote Requests** (`/admin/quotes`) — every submission from the site's
  "Request a Quote" form, with contact details, the message, and buttons to
  mark it new / contacted / closed, or delete it. Includes a per-status
  filter, a stats summary, and an **Export CSV** button
- **Site Content** (`/admin/content`) — edit the content the business needs
  to keep up to date: **contact details** (address, phone, email, hours,
  WhatsApp), **FAQs**, **News & Updates**, and **Insurance Tips**. Changes
  go live on the public site immediately after saving. Everything else on
  the site is managed in code (see `mahogany-insurance/src/data/site.js`)
  and is not editable from the admin
- **Admin Users** (`/admin/users`) — create and delete admin logins
  (you can't delete your own account)

## How the site, admin, and backend fit together

- The app fetches `/api/content` on load and merges any saved blocks over
  its built-in defaults — so every page still renders if the backend is
  down.
- Submitting the Quote form POSTs to `/api/quotes`. It shows an error and
  stays on the form if the request fails, and falls back to "call/WhatsApp
  us" messaging.
- The Contact form opens a pre-filled email to the office address rather
  than posting to the API.
- Note: the "Supporting documents" attachment field on the Quote form is
  currently UI-only — files are not uploaded. Send documents by email or
  WhatsApp until upload is added.

## Deploying

Frontend and backend are hosted separately.

### Frontend (site + admin) — e.g. Vercel

Push the repo, import `mahogany-insurance` into Vercel (framework preset:
Vite, build command `npm run build`, output `dist`). Set the environment
variable:

- `VITE_API_URL` — your deployed backend's URL (do NOT set it to localhost)

`vercel.json` rewrites unknown paths to `index.html` so `/admin`,
`/admin/quotes`, etc. work on refresh.

### Backend — e.g. Render / Railway / Fly.io

- Build/start command: `npm start`
- Environment variables (same as your backend `.env`, minus `PORT` if the
  host sets its own):
  - `DATABASE_URL` — your Neon connection string
  - `JWT_SECRET` — any long random string
  - `ADMIN_USERNAME` / `ADMIN_PASSWORD`
  - `CORS_ORIGINS` — your frontend's origin (e.g. `https://your-site.vercel.app`),
    or leave unset to allow all origins
- Run `npm run seed` once against the deployed database (or after first deploy).

> Render free-tier note: the service sleeps after 15 min idle and takes ~30s
> to wake on the first request.

## Still worth doing before this goes live

1. **Change the seeded admin password** to something you actually intend
   to keep, and don't commit `.env` files anywhere.
2. **Photos** — every page has a clearly labeled placeholder box where a
   real photo should go (office, team, clients, etc.). Swap those in once
   you have them; see `mahogany-insurance/INSTRUCTIONS.md` for the list.
3. **Confirm the seeded contact details** (phone/email/address) are
   accurate — they came from public directory listings, not from Mahogany
   directly.
4. **Add more admin users if needed** — use the **Admin Users** page
   (`/admin/users`) to create additional logins as you need them.
