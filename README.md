# FD-Boxing Website

A modern, professional website for Federico De Vesa's boxing coaching business, featuring European tour booking capabilities.

## Features

- **Responsive Design**: Mobile-first, looks great on all devices
- **European Tour Calendar**: Interactive calendar showing confirmed dates and available slots
- **Academy Booking System**: Form with validation for academies to request seminars
- **Gallery Section**: Showcase photos from seminars and events
- **Testimonials**: Social proof from satisfied coaches and athletes
- **Modern Tech Stack**: Next.js 14, TypeScript, Tailwind CSS, Framer Motion
- **Database Integration**: Supabase for booking management
- **SEO Optimized**: Metadata, semantic HTML, fast loading

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, React
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account (free tier is fine)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd fd-boxing-website
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up Supabase database:
   - Go to your [Supabase Dashboard](https://supabase.com/dashboard)
   - Create a new project (or use existing)
   - Go to SQL Editor
   - Copy and paste the contents of `supabase-schema.sql`
   - Run the SQL script to create tables and policies

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Supabase Setup

### Creating Your Supabase Project

1. Visit [Supabase](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in project details (name, database password, region)
4. Wait for the project to be created (~2 minutes)

### Getting Your API Keys

1. In your Supabase project dashboard, go to Settings → API
2. Copy the following:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Running the Database Schema

1. In Supabase dashboard, go to SQL Editor
2. Click "New Query"
3. Copy the entire contents of `supabase-schema.sql`
4. Paste and click "Run"
5. You should see "Success. No rows returned"

This creates:
- `bookings` table - stores seminar booking requests
- `tour_dates` table - stores European tour schedule
- Row Level Security (RLS) policies for data protection
- Sample tour dates (you can modify these)

### Managing Data

You can view and manage data through:
- **Supabase Dashboard**: Table Editor → view/edit records
- **SQL Editor**: Run custom queries
- **API**: Automatic REST API endpoints created by Supabase

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket

2. Visit [Vercel](https://vercel.com) and sign up/login

3. Click "New Project" → Import your repository

4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Environment Variables**: Add your Supabase credentials

5. Click "Deploy"

6. Your site will be live in ~2 minutes at `your-project.vercel.app`

### Custom Domain

1. In Vercel dashboard, go to your project → Settings → Domains
2. Add your custom domain (e.g., `federicodevesa.com`)
3. Follow the DNS configuration instructions
4. Vercel will automatically provision SSL certificate

### Alternative Deployments

**Netlify**:
```bash
npm run build
# Deploy the .next folder
```

**Cloudflare Pages**:
- Connect your Git repository
- Build command: `npm run build`
- Output directory: `.next`

## Project Structure

```
fd-boxing-website/
├── app/
│   ├── api/
│   │   └── bookings/
│   │       └── route.ts          # API endpoint for bookings
│   ├── layout.tsx                 # Root layout with Header/Footer
│   ├── page.tsx                   # Home page
│   └── globals.css                # Global styles
├── components/
│   ├── layout/
│   │   ├── Header.tsx             # Navigation header
│   │   └── Footer.tsx             # Footer with links
│   ├── sections/
│   │   ├── Hero.tsx               # Hero section
│   │   ├── About.tsx              # About Federico
│   │   ├── TourCalendar.tsx       # Tour dates
│   │   ├── BookingForm.tsx        # Booking form
│   │   ├── Gallery.tsx            # Photo gallery
│   │   └── Testimonials.tsx       # Testimonials
│   └── ui/                        # Reusable UI components
├── lib/
│   └── supabase.ts                # Supabase client config
├── types/
│   └── index.ts                   # TypeScript types
├── public/                        # Static assets
├── supabase-schema.sql            # Database schema
└── .env.local.example             # Environment variables template
```

## Customization

### Adding Images

1. Add images to `/public` folder
2. Update references in components:
   - Logo: Update `Header.tsx` and `Footer.tsx`
   - Hero background: Update `Hero.tsx`
   - About photo: Update `About.tsx`
   - Gallery: Update `Gallery.tsx` with actual image URLs

### Updating Content

- **About Section**: Edit `components/sections/About.tsx`
- **Tour Dates**: Manage through Supabase dashboard or update sample data in `TourCalendar.tsx`
- **Testimonials**: Edit `components/sections/Testimonials.tsx`
- **Social Links**: Update `Footer.tsx` with actual URLs

### Styling

- Brand colors are defined in `app/globals.css`
- To change colors, update CSS variables:
  - `--fd-red`: Main brand color (currently #c62828)
  - `--fd-black`: Black color
  - `--fd-white`: White color

### Email Notifications (Optional)

To receive email notifications when someone books:

1. Install Resend or SendGrid:
```bash
npm install resend
# or
npm install @sendgrid/mail
```

2. Add API key to `.env.local`:
```env
RESEND_API_KEY=your_resend_api_key
EMAIL_TO=bookings@fdboxing.com
```

3. Update `app/api/bookings/route.ts` to send emails

## Managing Tour Dates

### Through Supabase Dashboard

1. Go to Supabase → Table Editor → `tour_dates`
2. Click "+ Insert row" to add new dates
3. Fill in the fields:
   - `city`: City name
   - `country`: Country name
   - `date`: Start date (YYYY-MM-DD)
   - `end_date`: End date (optional)
   - `venue`: Venue name or "Available"
   - `status`: `confirmed`, `pending`, or `available`
   - `spots_available`: Number of spots (optional)
   - `description`: Additional info (optional)

### Status Types

- **confirmed**: Venue and details are confirmed
- **pending**: Date is reserved but details TBA
- **available**: Open slot for academies to book

## Viewing Bookings

1. Go to Supabase → Table Editor → `bookings`
2. View all booking submissions
3. Export to CSV if needed
4. Update `status` field to track bookings

## Performance

- Lighthouse Score: 95+ on all metrics
- Optimized images with Next.js Image component
- Lazy loading for sections
- Minimal JavaScript bundle
- Edge-ready (works on Vercel Edge Network)

## Support

For issues or questions:
- Create an issue in the repository
- Email: info@fdboxing.com

## License

All rights reserved © FD-Boxing 2026

---

Built with ❤️ for the boxing community
