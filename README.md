# Dịch Vụ Cây Xanh TP.HCM

A professional Next.js website for a Vietnamese landscaping and tree service business in Ho Chi Minh City.

## 🌟 Features

- **Modern Tech Stack**: Next.js 15 (App Router), TypeScript, TailwindCSS
- **SEO Optimized**: Meta tags, OpenGraph, Twitter Cards, JSON-LD Schema, Sitemap, Robots.txt
- **Appwrite Integration**: Backend for services, projects, and contact forms
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Professional UI/UX**: Clean design with green theme (#4CAF50)
- **Vietnamese Content**: Full support for Vietnamese language
- **Floating Contact Buttons**: Quick access to phone and Zalo
- **Performance**: Optimized images with next/image, fast loading

## 📁 Project Structure

```
dichvucayxanh/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with SEO
│   │   ├── page.tsx            # Homepage with hero
│   │   ├── dich-vu/            # Services page
│   │   ├── du-an/              # Projects page
│   │   ├── bao-gia/            # Quote request page
│   │   ├── gioi-thieu/         # About page
│   │   ├── lien-he/            # Contact page
│   │   ├── sitemap.ts          # Dynamic sitemap
│   │   ├── robots.ts           # Robots.txt
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      # Navigation header
│   │   │   └── Footer.tsx      # Site footer
│   │   ├── ui/
│   │   │   └── FloatingContactButtons.tsx
│   │   ├── seo/
│   │   │   └── JsonLdScript.tsx
│   │   └── demo/
│   │       ├── ServicesDemo.tsx
│   │       └── ContactFormDemo.tsx
│   ├── lib/
│   │   ├── appwrite.ts         # Appwrite client
│   │   ├── services.ts         # Services CRUD
│   │   ├── projects.ts         # Projects CRUD
│   │   ├── contact.ts          # Contact form handler
│   │   └── schema.ts           # JSON-LD schemas
│   └── types/
│       └── index.ts            # TypeScript types
├── public/
│   └── (add images here)
├── .env.local.example          # Environment variables template
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn or pnpm
- Appwrite account (free at cloud.appwrite.io)

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

Copy `.env.local.example` to `.env.local` and fill in your Appwrite credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
NEXT_PUBLIC_APPWRITE_SERVICES_COLLECTION_ID=your_services_collection_id
NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID=your_projects_collection_id
NEXT_PUBLIC_APPWRITE_CONTACTS_COLLECTION_ID=your_contacts_collection_id
```

3. **Set up Appwrite:**

- Create a new project at [cloud.appwrite.io](https://cloud.appwrite.io)
- Create a database
- Create three collections:
  - **Services**: title (string), description (string), icon (string), price (string), features (array), imageUrl (string)
  - **Projects**: title (string), description (string), location (string), imageUrl (string), completedDate (string), category (string)
  - **Contacts**: name (string), phone (string), email (string), service (string), message (string), createdAt (string)
- Set appropriate permissions (Read: Any, Write: Any for demo purposes)

4. **Run the development server:**

```bash
npm run dev
```

5. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Colors

The primary green color can be changed in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#4CAF50',  // Change this
    // ... other shades
  },
}
```

### Contact Information

Update phone number and contact info in:
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/ui/FloatingContactButtons.tsx`
- `src/lib/schema.ts` (for SEO)

### Images

Replace placeholder images from Unsplash with your own:
- Add images to `public/` folder
- Update image paths in page components
- Add `og-image.jpg` (1200x630px) for social sharing

## 📱 Pages

- **/** - Homepage with hero, services overview, why choose us
- **/dich-vu** - Detailed services with images and features
- **/du-an** - Project portfolio with filters
- **/bao-gia** - Quote request form with pricing guide
- **/gioi-thieu** - About us, team, values, statistics
- **/lien-he** - Contact page with form and map

## 🔍 SEO Features

✅ Semantic HTML5  
✅ One H1 per page  
✅ Proper heading hierarchy  
✅ Meta tags with Next.js metadata  
✅ OpenGraph tags  
✅ Twitter Cards  
✅ JSON-LD structured data (LocalBusiness schema)  
✅ Dynamic sitemap.xml  
✅ robots.txt  
✅ Optimized images with next/image  
✅ Vietnamese keyword optimization  

## 🛠️ Built With

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS
- [Appwrite](https://appwrite.io/) - Backend as a service
- [Inter Font](https://fonts.google.com/specimen/Inter) - Typography

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🚢 Deployment

This project can be deployed to:

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Railway**
- **DigitalOcean App Platform**

### Vercel Deployment

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## 📞 Contact

**Phone:** 0908 396 962  
**Email:** info@dichvucayxanh.com  
**Location:** TP. Hồ Chí Minh, Việt Nam

## 📄 License

This project is created for Dịch Vụ Cây Xanh TP.HCM.

---

**Made with ❤️ using Next.js and TailwindCSS**
