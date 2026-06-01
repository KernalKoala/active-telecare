# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint via next lint
```

No test suite is configured.

## Architecture

Next.js 14 App Router project with TypeScript and Tailwind CSS. All pages live in `/app` as `page.tsx` files. Shared UI lives in `/components`.

**Data flow for products:**
- Supabase PostgreSQL holds the `products` table (id, name, description, price, billing_frequency, image_url)
- Product images stored in Supabase Storage bucket `product-images`
- Public reads via anon key; writes require authenticated session (RLS enforced)
- `/app/api/products/` — server-side API routes using the service role key (`lib/supabase-server.ts`)
- `/components/Products.tsx` — fetches and renders the public catalog with click-to-expand modals
- `/components/admin/ProductManager.tsx` — full CRUD UI; only reachable via `/app/admin/page.tsx` which guards with Supabase Auth

**Two Supabase clients:**
- `lib/supabase.ts` — browser client (anon key, used in client components)
- `lib/supabase-server.ts` — server client (service role key, used in API routes)

**Contact form:** `/app/api/contact/` sends email via Resend API. Requires `RESEND_API_KEY` and `CONTACT_EMAIL` env vars.

## Environment Variables

```
RESEND_API_KEY
CONTACT_EMAIL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

## Brand

Primary colors: teal `#3ebdad`, yellow `#d9cf72`. Fonts: Inter & Nunito (Google Fonts).
