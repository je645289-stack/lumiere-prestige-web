# Albert Auto Detailing

Premium, bilingual (English / Spanish) website for **Albert Auto Detailing** — a professional auto detailing business in Norwalk, Connecticut. Built with Next.js 15 (App Router), TypeScript, Tailwind CSS and a fully functional headless CMS / admin panel. Deployable to Cloudflare Pages via the OpenNext adapter (Cloudflare KV for content, R2 for image uploads).

## Features

- **Premium dark design** in red / blue / black with Framer Motion animations and glow effects.
- **Bilingual** (EN / ES) with a language toggle in the header. UI strings and CMS content are both localized.
- **No public prices** — every CTA drives the customer to WhatsApp, a call, or the quote/booking forms.
- **Floating WhatsApp + Call buttons** visible on every page.
- **Sections:** Hero, Stats (animated count-up), Services, About, Why Choose Us, Before & After Gallery (filterable + lightbox), Promotions, Process, Testimonials, FAQ, Instagram feed, Contact (quote form + map), Booking, Final CTA.
- **Admin panel** at `/admin` (JWT auth, httpOnly cookie) to edit all content, bilingually, without code.
- **SEO** with metadata, Open Graph, sitemap, robots and LocalBusiness JSON-LD.

## Business details

- Address: 12 Jenny Jenks St, Norwalk, CT 06851
- WhatsApp: 475-689-8301
- Instagram: [@albert_auto_detailing](https://instagram.com/albert_auto_detailing)
- Email: albertautodetailing2024@gmail.com

## Getting started

```bash
npm install
cp .env.example .env.local   # already created with defaults
npm run dev                  # http://localhost:3000
```

Open the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin):

- Email: `admin@albertautodetailing.com`
- Password: `Albert2024!Admin` (set via `ADMIN_PASSWORD` in `.env.local`)

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run pages:build` | Build for Cloudflare Pages (OpenNext) |
| `npm run pages:preview` | Build + preview the Cloudflare worker locally |
| `npm run pages:deploy` | Build + deploy to Cloudflare Pages |

## How the CMS works

- Default content lives in `/data/*.json` (bundled with the app).
- The admin saves changes via `PUT /api/content/[type]`, which writes to Cloudflare KV in production or local JSON files in development.
- All content API routes run on the Node.js runtime (`export const runtime = "nodejs"`).
- After every save, `revalidatePath()` refreshes the site so changes are visible immediately — no restart required.
- Image uploads go to Cloudflare R2 in production, or `public/uploads` locally.

### Bilingual content

Translatable fields are stored as `{ "en": "...", "es": "..." }` objects and resolved at render time with `localize()` / the `useLanguage()` hook (`src/lib/i18n.tsx`). The admin renders EN/ES inputs side by side for these fields. Plain strings remain valid and are shown in both languages.

## Cloudflare deployment

1. Create a KV namespace and an R2 bucket.
2. Put the KV namespace id in `wrangler.jsonc` (`kv_namespaces[0].id`).
3. Set environment variables / secrets (`ADMIN_EMAIL`, `ADMIN_PASSWORD`, `JWT_SECRET`, `CONTACT_EMAIL`, etc.).
4. Run `npm run pages:deploy`.

## Tech stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Framer Motion · lucide-react · jose (JWT) · zod · @opennextjs/cloudflare · Wrangler.
