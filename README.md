# Active TeleCare Solutions

A modern, responsive website for Active TeleCare Solutions Limited - a professional telecare and remote healthcare monitoring service provider based in the Isle of Man.

## Overview

This website showcases Active TeleCare Solutions' products and services, providing information about their telecare offerings and enabling potential clients to get in touch.

## Features

- **Responsive Design**: Fully responsive layout with mobile hamburger menu
- **Modern UI**: Clean, professional design with custom teal (#3ebdad) and yellow (#d9cf72) brand colors
- **Hero Section**: Full-height hero banner with background image overlay and call-to-action button
- **Contact Form**: Integrated contact form with email functionality via Resend API
- **Admin Dashboard**: Protected admin area with Supabase authentication for product management
- **Dynamic Product Catalog**: Database-driven product listings with image uploads
- **Product Management**: Full CRUD operations for products with image storage
- **Interactive Product Cards**: Click-to-expand product details with modal view
- **Dynamic Navigation**: Active page highlighting with smooth transitions
- **Shrinking Header**: Header reduces in size on scroll for better UX
- **Analytics**: Vercel Analytics integration for visitor tracking
- **Multiple Pages**:
  - Home: Hero section with testimonials and content grid
  - About Us: Company information and leadership profile
  - Products: Dynamic product catalog with detailed modal views
  - Services: Healthcare monitoring services
  - Contact Us: Contact form and company details
  - Privacy Policy: Privacy information
  - Admin: Protected dashboard for product management (requires authentication)

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Styling**: Tailwind CSS 3
- **Linting**: ESLint 9 with Next.js Core Web Vitals and TypeScript flat configuration
- **Testing**: Vitest with React Testing Library for component/API tests; Playwright for Chromium browser tests
- **Fonts**: Inter & Nunito (Google Fonts)
- **Email**: Resend API
- **Database & Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Analytics**: Vercel Analytics
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 22.12.0 or newer and npm (Node.js 22 is used in CI; the test tooling requires a newer runtime than Next.js alone)
- Resend API account (for contact form)
- Supabase account (for database and backend services)

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file with your environment variables:

   ```
   # Resend Email API
   RESEND_API_KEY=your_resend_api_key
   CONTACT_EMAIL=your_email@example.com

   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   The `NEXT_PUBLIC_*` values are exposed to the browser. Keep `RESEND_API_KEY` server-only and set `CONTACT_EMAIL` to a real recipient; its code fallback is only a placeholder. `SUPABASE_SERVICE_ROLE_KEY` is referenced by the currently unused `lib/supabase-server.ts` helper, not by the active routes, so it is not needed for the current application flows. If using that helper, keep the key server-only: it bypasses RLS.

4. Complete the [Supabase setup](#supabase-setup) and [contact form setup](#contact-form-setup).
5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Development Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server at localhost:3000 |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run `eslint .` using `eslint.config.mjs` |

Run lint separately from the production build; Next.js 16 does not run it as part of `next build`.

### Testing

```bash
npm test                  # Vitest watch mode
npm run test:unit         # Run component and API tests once
npx playwright install chromium  # Install the browser once after npm install
npm run test:e2e          # Build the app and run Chromium browser tests
npm run test:e2e:ui       # Interactive Playwright UI
```

- **Unit/component tests** live in `tests/unit/`, configured by `vitest.config.mts`. API tests run in Node; component tests opt into jsdom and import `tests/unit/setup-dom.ts` for DOM matchers and cleanup. The initial suite covers product pricing and modal behavior, contact-form states, product creation authorization/database responses, and successful or thrown-error email responses. Fetch, Supabase, and Resend are mocked; no service credentials are needed.
- **Browser tests** live in `tests/e2e/`, configured by `playwright.config.ts`. They cover desktop/mobile navigation, the server-rendered catalogue and modal, contact success/failure, and the unauthenticated admin login screen. Playwright starts a read-only Supabase fixture on `127.0.0.1:3101`, builds the app with fake credentials, and serves it on `127.0.0.1:3100`. Both ports must be free; existing servers are never reused.
- Contact submissions are intercepted in the browser, and external browser requests are blocked. The fixture serves a fixed product without touching a real database. These tests do **not** verify real Supabase authentication/RLS or email delivery; those need a separate integration environment.
- The browser-test build still downloads Google Fonts. It writes to the normal `.next` directory, so do not run it alongside `next dev` or another build. Run a normal `npm run build` with your real environment before serving or deploying outside the test runner.
- Playwright writes its HTML report to `playwright-report/` and failure screenshots/traces to `test-results/`; these are ignored by Git. View the report with `npx playwright show-report`.

### Continuous Integration

`.github/workflows/ci.yml` runs on pull requests and pushes to `main`, and supports manual runs. Two parallel jobs run lint/type-checking/unit tests and a production build with Chromium tests. The browser job installs Chromium's Linux dependencies and uploads the HTML report and failure artifacts for 14 days. CI uses the same fake credentials and local fixture as local browser tests; no Supabase or Resend secrets or repository variables are required.

## Project Structure

```
/app
  /about                    - About Us page
  /admin                    - Admin dashboard page with authentication
  /api
    /contact                - Contact form API endpoint (Resend integration)
    /products               - GET public product list
    /products/create        - POST product (authenticated)
    /products/[id]           - PUT / DELETE product (authenticated; no GET by ID)
    /test-supabase           - GET public Supabase diagnostic endpoint
  /contact                  - Contact Us page
  /privacy-policy           - Privacy Policy page
  /products                 - Products catalog page
  /services                 - Services page
  layout.tsx                - Root layout with fonts and analytics
  page.tsx                  - Home page
  globals.css               - Global styles with Tailwind

/components
  About.tsx                 - About section component
  Contact.tsx               - Contact form with email submission
  ContentGrid.tsx           - Content grid for home page
  Footer.tsx                - Site footer with navigation
  Header.tsx                - Navigation header with scroll behavior
  Hero.tsx                  - Hero banner with background image
  Products.tsx              - Dynamic products listing with modal details
  Services.tsx              - Services listing component
  TealBanner.tsx            - Call-to-action banner
  Testimonials.tsx          - Customer testimonials
  /admin
    ProductManager.tsx      - Product CRUD interface for admin

/content
  privacy-policy.md         - Privacy policy content (markdown)

/lib
  supabase.ts               - Anon-key client for browser use and public API reads
  supabase-server.ts        - Unused service-role client helper (server-only use)

/public/images              - Static images, logo, and product photos

/tests/unit                 - Vitest component and API tests
/tests/e2e                  - Playwright browser tests and local Supabase fixture
```

## Contact Form Setup

The contact form uses Resend for email delivery. To set it up:

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Set `RESEND_API_KEY` and `CONTACT_EMAIL` in `.env.local` (and in your deployment environment).
4. Verify `activetelecare.im` in Resend for the configured sender, `Active Telecare <website@activetelecare.im>`. To use another domain, update the sender in `app/api/contact/route.ts` to an address on a domain you have verified.

`POST /api/contact` accepts `name`, `email`, `phone`, and `message`. The form supplies browser-side required-field validation, but the API does not validate or escape submitted fields before inserting them into email HTML. It returns HTTP 500 for thrown errors, but does not check Resend's returned `error` field, so HTTP 200 and the form's success message do not guarantee email delivery.

## Supabase Setup

Supabase provides the database, authentication, and storage services for this application. See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed setup instructions.

### Quick Setup:

1. Create a project at [supabase.com](https://supabase.com)
2. Follow the table SQL and storage instructions in `SUPABASE_SETUP.md`:
   - Create the `products` table and its four RLS policies (SELECT, INSERT, UPDATE, DELETE).
   - Create a public `product-images` bucket in the dashboard, then apply the storage policies for authenticated uploads and public reads.
3. Create trusted users in Authentication > Users. There is no separate admin role check; any authenticated user is permitted to manage products under the documented policies. Disable public sign-ups if access should be invite-only.
4. Add your Supabase credentials to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
5. Access the admin dashboard at `/admin` to manage products

### Database Schema:

The `products` table includes:

- `id` (UUID, primary key)
- `name` (text)
- `description` (text)
- `price` (decimal)
- `billing_frequency` (yearly | monthly | one-off)
- `image_url` (text)
- `created_at` (timestamp)

## Key Features Explained

### Product Management System

- Admin users can add, edit, and delete products through the `/admin` dashboard
- Product images are uploaded to Supabase Storage in the `product-images` bucket
- Products support three billing frequencies: yearly, monthly, or one-off
- Public product catalog at `/products` displays all products with click-to-expand modal details
- Product cards use optimized image display with `object-contain` and padding for better presentation
- Product images display with a gray background and contained sizing for consistent appearance

### Contact Form

- Form submissions are sent via Resend API to the configured email address
- Client-side validation ensures required fields are filled
- Success/error feedback displayed to users
- Form automatically resets after successful submission

### Authentication & Security

- Supabase Auth handles admin authentication with email/password
- `/admin` shows a login form until its client-side session check succeeds; there is no separate admin role check
- Product POST, PUT, and DELETE handlers independently check authentication via `supabase.auth.getUser()` and forward the request's Authorization header through an anon-key client
- The policies in `SUPABASE_SETUP.md` allow public product reads and authenticated product writes; they must be applied in your Supabase project
- Image uploads use the browser's authenticated Supabase session and storage policies
- The active product routes do not use the service-role helper; service-role access would bypass RLS
- `/api/test-supabase` is unauthenticated and returns diagnostic details, including products, the project URL, and errors (potentially stack traces). Remove or restrict this endpoint before a public deployment if those diagnostics should not be exposed

## Deployment

This project is optimized for deployment on Vercel:

```bash
npm run build
```

Configure Node.js 22.12.0 or newer and the environment variables from [Installation](#installation) in your deployment platform's settings. `NEXT_PUBLIC_*` values are embedded at build time, so changing them requires a rebuild. The build uses `next/font/google` for Inter and Nunito and needs network access to fetch those fonts.

Run `npm run lint` separately before deployment. For a self-hosted Node.js deployment, run `npm start` after `npm run build`. Review the authentication and diagnostic endpoint caveats above, and verify contact email delivery with your configured Resend sender and recipient.

## License

All rights reserved - Active TeleCare Solutions Limited
