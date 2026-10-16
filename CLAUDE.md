# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint via eslint .
npx tsc --noEmit # Typecheck (CI runs this with unit tests and lint)
npm test         # Vitest watch mode
npm run test:unit # Component and API tests (single run)
npm run test:e2e  # Production build and Playwright Chromium tests
npm run test:e2e:ui # Interactive Playwright UI
```

Tests live in `tests/unit` (Vitest/React Testing Library) and `tests/e2e` (Playwright). Install Chromium with `npx playwright install chromium` before running browser tests. Playwright uses fake credentials and a local read-only Supabase fixture on ports 3100/3101; no real service credentials are required. It rebuilds `.next`, so do not run alongside a dev server or another build. See README.md for details.

## Architecture

Next.js 16 App Router project with React 19, TypeScript and Tailwind CSS. All pages live in `/app` as `page.tsx` files. Shared UI lives in `/components`. Requires Node.js 22.12+ (CI uses Node 22).

**Data flow for products:**
- Supabase PostgreSQL holds the `products` table (id, name, description, price, billing_frequency, image_url)
- Product images stored in Supabase Storage bucket `product-images`; `ProductManager` uploads them directly from the browser
- Public reads via anon key; writes require authenticated session (RLS enforced). Any authenticated user can manage products; there is no admin role check
- `/app/products/page.tsx` — server component that reads `products` with the anon client and passes them to `/components/Products.tsx`
- `/components/Products.tsx` — renders the public catalog from props with click-to-expand modals (no fetching)
- `/app/api/products/` — GET reads with the anon client; POST/PUT/DELETE build an anon-key client that forwards the caller's `Authorization` header, check `supabase.auth.getUser()`, and rely on RLS. They do **not** use the service role key
- `/components/admin/ProductManager.tsx` — full CRUD UI; rendered by `/app/admin/page.tsx`, which shows a login form until a client-side Supabase Auth session check succeeds

**Supabase clients:**
- `lib/supabase.ts` — anon-key client, used in client components and for public reads
- `lib/supabase-server.ts` — service-role client helper, currently unused. It bypasses RLS; keep it server-only if it is ever used

**Contact form:** `/app/api/contact/` sends email via Resend API. Requires `RESEND_API_KEY` and `CONTACT_EMAIL` env vars.

## Environment Variables

```
RESEND_API_KEY
CONTACT_EMAIL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY   # optional: only read by the unused lib/supabase-server.ts
```

## Brand

Primary colors: teal `#3ebdad`, yellow `#d9cf72`. Fonts: Inter & Nunito (Google Fonts).
