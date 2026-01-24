# Quick Start Guide for Federico

Hey Federico! Your new website is ready. Here's everything you need to know to get it live and manage it.

## What You Got

Your new website has:
- ✅ Professional design with your FD-Boxing branding (red, black, white)
- ✅ European Tour calendar with booking system
- ✅ About section showcasing your experience
- ✅ Gallery for your photos
- ✅ Testimonials from students
- ✅ Contact form for academy bookings
- ✅ Mobile-friendly (looks great on phones)
- ✅ Fast and modern

## Getting It Online (5 Steps)

### Step 1: Create Supabase Account (FREE Database)
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with email
4. Create a new project:
   - Name: `fd-boxing`
   - Database Password: (choose a strong password and save it!)
   - Region: Choose closest to Europe
5. Wait 2 minutes for setup

### Step 2: Set Up Database
1. In Supabase dashboard, click "SQL Editor" (left sidebar)
2. Open the file `supabase-schema.sql` (in your project folder)
3. Copy ALL the text
4. Paste in Supabase SQL Editor
5. Click "Run" (bottom right)
6. You should see "Success. No rows returned"

✅ Done! Your database is ready.

### Step 3: Get Your API Keys
1. In Supabase, go to Settings → API
2. You'll see:
   - **Project URL** - copy this
   - **anon public** key - copy this too
3. Save both somewhere safe (you'll need them in the next step)

### Step 4: Deploy to Vercel (FREE Hosting)
1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" - use your GitHub account (or create one)
3. Once logged in, click "Add New" → "Project"
4. Click "Import Git Repository"
5. If this is your first time:
   - Push your code to GitHub first (or I can help with this)
   - Then import from GitHub
6. Vercel will detect Next.js automatically
7. **IMPORTANT**: Before clicking Deploy, add Environment Variables:
   - Click "Environment Variables"
   - Add `NEXT_PUBLIC_SUPABASE_URL` = (paste your Project URL from Step 3)
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (paste your anon key from Step 3)
8. Click "Deploy"
9. Wait ~2 minutes

🎉 **YOUR SITE IS LIVE!** You'll get a URL like `fd-boxing.vercel.app`

### Step 5: Add Your Custom Domain (federicodevesa.com)
1. In Vercel, go to your project → Settings → Domains
2. Type `federicodevesa.com`
3. Vercel will show you DNS settings
4. Go to where you bought your domain (GoDaddy, Namecheap, etc.)
5. Update DNS records as Vercel instructs
6. Wait 24-48 hours (domain changes take time)

✅ Done! Your site will be at `federicodevesa.com`

---

## Managing Your Website

### How to Add/Update Tour Dates

1. Go to [supabase.com](https://supabase.com)
2. Login to your project
3. Click "Table Editor" → "tour_dates"
4. Click "+ Insert Row"
5. Fill in:
   - **city**: e.g., "Barcelona"
   - **country**: e.g., "Spain"
   - **date**: e.g., "2026-03-15" (YYYY-MM-DD format)
   - **end_date**: (optional) if it's multi-day
   - **venue**: e.g., "Elite Boxing Academy" or "Available"
   - **status**: Choose one:
     - `confirmed` = Venue booked, show to public
     - `pending` = Date reserved but venue TBA
     - `available` = Open slot for bookings
   - **spots_available**: Number of people who can attend
   - **description**: Short note
6. Click "Save"

**Changes are LIVE immediately!** Refresh your website to see them.

### How to View Booking Requests

1. Go to Supabase → Table Editor → "bookings"
2. You'll see all requests with:
   - Academy name
   - Contact person
   - Email & phone
   - Preferred dates
   - Number of participants
   - Message
3. You can:
   - Export to Excel (click "Export to CSV")
   - Update status (pending → confirmed → rejected)
   - Email them back directly

### How to Update Photos

**For Now (Placeholders):**
Your site has placeholder images. To add real photos:

1. Add photos to the `public` folder in your project
2. Edit these files:
   - `components/sections/About.tsx` - your main photo
   - `components/sections/Gallery.tsx` - gallery photos
   - `components/layout/Header.tsx` - logo (or use text logo)

**Need help?** I can do this for you - just send me the photos.

### How to Update Your Bio/Text

1. Open `components/sections/About.tsx`
2. Find the paragraph starting with "With over 15 years..."
3. Change the text to your actual story
4. Save and push to GitHub
5. Vercel auto-deploys (2 minutes)

### How to Change Testimonials

1. Open `components/sections/Testimonials.tsx`
2. Find the `testimonials` array
3. Add/edit testimonials:
```typescript
{
  id: '5',
  name: 'John Smith',
  role: 'Head Coach',
  academy: 'London Boxing Club',
  quote: 'Amazing seminar! Our team learned so much.',
  rating: 5,
}
```
4. Save and push to GitHub

---

## Common Questions

**Q: How much does this cost?**
- Vercel: FREE (up to 100GB bandwidth/month - plenty for your site)
- Supabase: FREE (up to 500MB database - more than enough)
- Total: $0/month 🎉

**Q: What if I get 1000 booking requests?**
- Still free! Supabase can handle it.

**Q: How do I get email notifications for bookings?**
- I can set this up with Resend (also free tier)
- You'll get an email every time someone books

**Q: Can I update content myself?**
- Yes! Use Supabase for tour dates and bookings
- For text/photos, you can:
  - Learn basic editing (I can teach you)
  - Or send me updates and I'll do it

**Q: What if the site goes down?**
- Vercel has 99.99% uptime
- If there's an issue, check [status.vercel.com](https://status.vercel.com)
- You can also email me

**Q: How do I update my social media links?**
- Edit `components/layout/Footer.tsx`
- Change the Instagram/Facebook/YouTube URLs
- Push to GitHub

---

## Need Help?

**For Technical Issues:**
- Email me
- Or check the `DEPLOYMENT.md` file for detailed guides

**For Content Updates:**
- Use Supabase for tour dates
- Send me photos/text for other updates

---

## What's Next?

1. ✅ Get site online (follow 5 steps above)
2. 📸 Send me real photos to replace placeholders
3. ✍️ Update your bio/story
4. 📅 Add real tour dates
5. 📱 Share on Instagram (@FD.BOXING)
6. 💪 Start booking seminars!

---

**Remember:**
- Supabase = Your database (tour dates, bookings)
- Vercel = Your hosting (makes site live)
- GitHub = Your code storage (optional but recommended)

You got this! 🥊

---

*Questions? Just ask - I'm here to help!*
