# How to Add Photos to Your FD-Boxing Website

## Photos Needed

Based on the design, you need **2 main photos**:

### 1. Hero Section Photo (Federico with Championship Belts)
- **Location**: Right side of homepage hero section
- **Style**: Portrait photo like the design (black background, showing strength/authority)
- **Recommended Size**: 800x1000px (portrait orientation)
- **Format**: JPG or PNG
- **Suggested Name**: `federico-hero.jpg`

**What to photograph:**
- Professional portrait
- Black or dark background
- Federico in boxing attire or with championship belts
- Serious, confident expression
- Good lighting on face and upper body

### 2. Training Photo (Federico with Students)
- **Location**: "How We Got Started" section
- **Style**: Action shot of Federico training students
- **Recommended Size**: 800x600px (landscape orientation)
- **Format**: JPG or PNG
- **Suggested Name**: `federico-training.jpg`

**What to photograph:**
- Federico coaching/training students
- Gym environment
- Active, dynamic shot (pad work, technique demonstration)
- Multiple people visible
- Natural gym lighting

---

## Step-by-Step: Adding Photos

### Option 1: Quick Add (You Do It)

1. **Prepare your photos:**
   - Resize to recommended dimensions
   - Optimize file size (under 500KB each)
   - Name them: `federico-hero.jpg` and `federico-training.jpg`

2. **Add to project:**
   ```bash
   # Navigate to your project
   cd fd-boxing-website

   # Create images folder if it doesn't exist
   mkdir -p public/images

   # Copy your photos to public/images/
   # On Windows:
   copy C:\path\to\your\federico-hero.jpg public\images\
   copy C:\path\to\your\federico-training.jpg public\images\
   ```

3. **Update Hero.tsx:**
   - Open: `components/sections/Hero.tsx`
   - Find line 74: `<div className="absolute inset-0 bg-gray-800 rounded-lg flex items-center justify-center">`
   - Replace the entire inner `<div>` (lines 74-80) with:
   ```tsx
   <div className="absolute inset-0 rounded-lg overflow-hidden">
     <Image
       src="/images/federico-hero.jpg"
       alt="Federico De Vesa"
       fill
       className="object-cover object-center"
       priority
     />
   </div>
   ```

4. **Update About.tsx:**
   - Open: `components/sections/About.tsx`
   - Find line 19: `<div className="aspect-[4/3] bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg shadow-2xl flex items-center justify-center overflow-hidden">`
   - Replace the entire inner `<div>` (lines 20-25) with:
   ```tsx
   <div className="aspect-[4/3] rounded-lg shadow-2xl overflow-hidden relative">
     <Image
       src="/images/federico-training.jpg"
       alt="Federico De Vesa training students"
       fill
       className="object-cover object-center"
     />
   </div>
   ```

5. **Test it:**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

---

### Option 2: I'll Do It (Send Me Photos)

Just send me the 2 photos and I'll:
1. Optimize them
2. Add them to the project
3. Update the code
4. Push the changes

**Send to:** [your email/contact method]

---

## Photo Optimization Tips

### Using Online Tools (Free):
1. **TinyPNG** (https://tinypng.com)
   - Reduces file size without quality loss
   - Upload → Download optimized

2. **Squoosh** (https://squoosh.app)
   - Google's image compressor
   - More control over quality/size

### Ideal Photo Specs:
- **Format**: JPG for photos (smaller file size)
- **Quality**: 80-85% (good balance)
- **Size**: Under 500KB per image
- **Dimensions**:
  - Hero: 800-1200px width (portrait)
  - Training: 1200-1600px width (landscape)

---

## Additional Photos (Optional)

### Gallery Section
If you want to add more photos to the gallery:

1. Prepare 6-12 photos showing:
   - Seminars in different cities
   - Training sessions
   - Federico with students
   - Action shots (pad work, sparring)
   - Group photos after seminars

2. Name them: `gallery-1.jpg`, `gallery-2.jpg`, etc.

3. Add to: `public/images/gallery/`

4. I'll update the Gallery component to display them

---

## Need Help?

If you're not comfortable editing code:
1. Just add the photos to `public/images/` folder
2. Send me a message
3. I'll update the components for you

The site will still look great with placeholders, but real photos will make it **much more powerful** and professional!

---

## Quick Reference

| Photo | Size | Location | File Name |
|-------|------|----------|-----------|
| Hero Portrait | 800x1000px | `public/images/` | `federico-hero.jpg` |
| Training Scene | 800x600px | `public/images/` | `federico-training.jpg` |
| Gallery (optional) | 800x800px | `public/images/gallery/` | `gallery-1.jpg` ... |

---

*Questions? Just ask!*
