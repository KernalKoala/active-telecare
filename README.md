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
  - Privacy Policy: GDPR-compliant privacy information
  - Admin: Protected dashboard for product management (requires authentication)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Fonts**: Inter & Nunito (Google Fonts)
- **Email**: Resend API
- **Database & Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Analytics**: Vercel Analytics
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
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
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/app
  /about                    - About Us page
  /admin                    - Admin dashboard page with authentication
  /api
    /contact                - Contact form API endpoint (Resend integration)
    /products               - Products API endpoints (GET all, GET by ID)
    /products/create        - Product creation endpoint
    /test-supabase          - Supabase connection test endpoint
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
  supabase.ts               - Supabase client configuration
  supabase-server.ts        - Server-side Supabase client

/public/images              - Static images, logo, and product photos
```

## Contact Form Setup

The contact form uses Resend for email delivery. To set it up:

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Add the API key to your `.env.local` file
4. (Optional) Verify your domain in Resend for production use

## Supabase Setup

Supabase provides the database, authentication, and storage services for this application. See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed setup instructions.

### Quick Setup:

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL scripts from SUPABASE_SETUP.md to create:
   - `products` table with Row Level Security policies
   - `product-images` storage bucket
3. Create admin users in Authentication > Users
4. Add your Supabase credentials to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
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
- Recent UI improvement: Product images now display with gray background and contained sizing for consistent appearance

### Contact Form

- Form submissions are sent via Resend API to the configured email address
- Client-side validation ensures required fields are filled
- Success/error feedback displayed to users
- Form automatically resets after successful submission

### Authentication & Security

- Supabase Auth handles admin authentication with email/password
- Only authenticated users can access the admin dashboard at `/admin`
- Row Level Security (RLS) policies protect database operations:
  - Public read access for products
  - Authenticated-only write access for product management
- Service role key used for server-side operations

## Deployment

This project is optimized for deployment on Vercel:

```bash
npm run build
```

Make sure to add your environment variables in your deployment platform's settings.

## License

All rights reserved - Active TeleCare Solutions Limited
