# Deployment Guide for FD-Boxing Website

This guide walks you through deploying your FD-Boxing website to production.

## Pre-Deployment Checklist

Before deploying, ensure you have:

- [ ] Supabase account created
- [ ] Database schema applied (`supabase-schema.sql`)
- [ ] Environment variables ready (Supabase URL and keys)
- [ ] Custom domain ready (if using)
- [ ] Content updated (photos, bio, testimonials)
- [ ] Social media links updated in Footer
- [ ] Tested locally (`npm run dev`)

## Option 1: Deploy to Vercel (Recommended - Free Tier Available)

### Why Vercel?
- Free tier with generous limits
- Automatic HTTPS
- Global CDN
- Perfect for Next.js (made by the same team)
- Zero-config deployments
- Easy custom domain setup

### Steps:

1. **Push to GitHub**
   ```bash
   cd fd-boxing-website
   git init
   git add .
   git commit -m "Initial commit - FD Boxing website"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login (can use GitHub account)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings

3. **Configure Environment Variables**

   In the Vercel dashboard, add these environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait ~2 minutes
   - Your site is live at `your-project.vercel.app`

5. **Add Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add `federicodevesa.com`
   - Update DNS records as instructed by Vercel:
     - Type: `A` Record
     - Name: `@`
     - Value: `76.76.21.21`

     AND

     - Type: `CNAME`
     - Name: `www`
     - Value: `cname.vercel-dns.com`

   - SSL certificate is automatic

### Future Updates

After initial deployment, updates are automatic:
```bash
git add .
git commit -m "Update content"
git push
```
Vercel automatically deploys on every push to `main` branch.

---

## Option 2: Deploy to Netlify (Alternative Free Option)

### Steps:

1. **Build the site locally**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Drag & drop the `.next` folder OR connect GitHub
   - Set build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`

3. **Environment Variables**
   - Site Settings → Environment Variables
   - Add Supabase credentials

4. **Custom Domain**
   - Domain Settings → Add custom domain
   - Follow DNS configuration

---

## Option 3: Deploy to Cloudflare Pages

### Steps:

1. **Connect GitHub**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Pages → Create a project
   - Connect to GitHub

2. **Configure Build**
   - Framework: Next.js
   - Build command: `npm run build`
   - Output directory: `.next`

3. **Environment Variables**
   - Add Supabase credentials

---

## Managing Your Custom Domain

### If using federicodevesa.com:

1. **Check current hosting**
   ```bash
   nslookup federicodevesa.com
   ```

2. **Update DNS records** (at your domain registrar)
   - Login to where you bought the domain (GoDaddy, Namecheap, etc.)
   - Go to DNS Management
   - Update A record to point to Vercel/Netlify/Cloudflare
   - Wait 24-48 hours for DNS propagation

3. **Verify**
   - Check `https://federicodevesa.com`
   - HTTPS should be automatic

---

## Post-Deployment Tasks

### 1. Test Everything

- [ ] All sections load correctly
- [ ] Navigation works
- [ ] Booking form submits successfully
- [ ] Check mobile responsiveness
- [ ] Test on different browsers

### 2. Set Up Supabase Email Notifications (Optional)

You can receive emails when someone books:

```typescript
// In app/api/bookings/route.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// After successful booking insert:
await resend.emails.send({
  from: 'FD-Boxing <bookings@fdboxing.com>',
  to: ['your-email@example.com'],
  subject: 'New Seminar Booking Request',
  html: `
    <h2>New Booking from ${academyName}</h2>
    <p><strong>Contact:</strong> ${contactName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Location:</strong> ${city}, ${country}</p>
    <p><strong>Preferred Dates:</strong> ${preferredDates}</p>
  `
});
```

### 3. Set Up Analytics (Optional)

**Google Analytics:**
1. Create GA4 property
2. Add tracking code to `app/layout.tsx`

**Vercel Analytics** (if using Vercel):
```bash
npm install @vercel/analytics
```

Then in `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 4. Configure Supabase for Production

1. **Enable RLS (Row Level Security)** - Already done in schema
2. **Review policies** - Ensure only admins can view bookings
3. **Set up backups** - Automatic in Supabase
4. **Monitor usage** - Check Supabase dashboard

---

## Troubleshooting

### Build Fails

**Error: Missing environment variables**
- Make sure you added Supabase credentials in deployment platform
- Check for typos in variable names

**Error: Module not found**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Site Not Loading

1. Check deployment logs in Vercel/Netlify
2. Verify environment variables are set
3. Check browser console for errors

### Forms Not Submitting

1. Verify Supabase credentials are correct
2. Check Supabase table exists
3. Review RLS policies in Supabase
4. Check browser network tab for API errors

### Custom Domain Not Working

1. Wait 24-48 hours for DNS propagation
2. Verify DNS records are correct
3. Clear browser cache
4. Try incognito/private mode

---

## Monitoring & Maintenance

### Weekly Tasks
- [ ] Check Supabase for new bookings
- [ ] Respond to booking requests
- [ ] Update tour dates as needed

### Monthly Tasks
- [ ] Review analytics
- [ ] Update content/photos
- [ ] Check for security updates: `npm audit`
- [ ] Update dependencies: `npm update`

### Updating Tour Dates

**Via Supabase Dashboard:**
1. Login to Supabase
2. Table Editor → tour_dates
3. Add/Edit/Delete rows as needed
4. Changes are live immediately

**Via SQL:**
```sql
INSERT INTO tour_dates (city, country, date, venue, status)
VALUES ('Vienna', 'Austria', '2026-06-15', 'Vienna Boxing Club', 'confirmed');
```

---

## Security Best Practices

1. **Never commit `.env.local`** - Already in `.gitignore`
2. **Use environment variables** for all secrets
3. **Keep dependencies updated**
   ```bash
   npm audit fix
   npm update
   ```
4. **Enable Supabase RLS** - Already configured
5. **Use HTTPS only** - Automatic with Vercel/Netlify/Cloudflare

---

## Getting Help

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Create an Issue**: GitHub repository

---

## Success! 🎉

Your FD-Boxing website is now live and ready to accept seminar bookings!

**Next Steps:**
1. Share the URL with academies and athletes
2. Promote on Instagram (@FD.BOXING)
3. Start booking that European tour!

---

*Built with ❤️ for the boxing community*
