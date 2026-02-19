# Active TeleCare Solutions

A modern, responsive website for Active TeleCare Solutions Limited - a professional telecare and remote healthcare monitoring service provider based in the Isle of Man.

## Overview

This website showcases Active TeleCare Solutions' products and services, providing information about their telecare offerings and enabling potential clients to get in touch.

## Features

- **Responsive Design**: Fully responsive layout with mobile hamburger menu
- **Modern UI**: Clean, professional design with custom teal (#3ebdad) and yellow (#d9cf72) brand colors
- **Contact Form**: Integrated contact form with email functionality via Resend API
- **Dynamic Navigation**: Active page highlighting with smooth transitions
- **Shrinking Header**: Header reduces in size on scroll for better UX
- **Multiple Pages**:
  - Home: Hero section with testimonials and content grid
  - About Us: Company information and leadership profile
  - Products & Services: Comprehensive listing of offerings
  - Contact Us: Contact form and company details

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Font**: Inter (Google Fonts)
- **Email**: Resend API
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Resend API account (for contact form)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your environment variables:
   ```
   RESEND_API_KEY=your_resend_api_key
   CONTACT_EMAIL=your_email@example.com
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/app` - Next.js app router pages
- `/components` - React components (Header, Footer, Hero, etc.)
- `/public/images` - Static images and assets
- `/app/api/contact` - API route for contact form

## Contact Form Setup

The contact form uses Resend for email delivery. To set it up:

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Add the API key to your `.env.local` file
4. (Optional) Verify your domain in Resend for production use

## Deployment

This project is optimized for deployment on Vercel:

```bash
npm run build
```

Make sure to add your environment variables in your deployment platform's settings.

## License

All rights reserved - Active TeleCare Solutions Limited