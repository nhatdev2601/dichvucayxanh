# Dịch Vụ Cây Xanh - Production Website

Production-ready Next.js website with Appwrite backend for tree services business.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Appwrite** (Database, Storage, Auth)
- SEO-optimized

## Appwrite Schema

### Collections Created (HARDCODED IN APPWRITE):

#### 1. **services** (SEO Money Pages)
- `title` (string, 150) - Service title
- `slug` (string, 120, unique, indexed) - URL slug
- `shortDescription` (string, 300) - Brief description
- `content` (string, 30000) - Full HTML content
- `featuredImageId` (string, 50) - Appwrite Storage file ID
- `featuredImageAlt` (string, 160) - Image alt text (SEO)
- `priceFrom` (string, 50) - Starting price
- `seoTitle` (string, 160) - Meta title
- `seoDescription` (string, 160) - Meta description
- `isPublished` (boolean) - Publish status

#### 2. **posts** (SEO Blog)
- `title` (string, 150)
- `slug` (string, 120, unique, indexed)
- `excerpt` (string, 300)
- `content` (string, 40000) - Full HTML content
- `featuredImageId` (string, 50)
- `featuredImageAlt` (string, 160)
- `seoTitle` (string, 160)
- `seoDescription` (string, 160)
- `category` (string, 50)
- `isPublished` (boolean)

#### 3. **projects** (Trust + Entity SEO)
- `title` (string, 150)
- `slug` (string, 120, unique, indexed)
- `location` (string, 120)
- `description` (string, 500)
- `content` (string, 20000) - Full HTML content
- `imageIds` (string[]) - Array of Appwrite Storage file IDs
- `serviceType` (string, 50)
- `completedAt` (datetime)
- `isPublished` (boolean)

#### 4. **images** (Storage Bucket)
- Create bucket named "images"
- Set permissions for public read

## Setup Instructions

### 1. Update Environment Variables

Edit `.env.local` with your actual Appwrite collection IDs:

```bash
NEXT_PUBLIC_DATABASE_ID=<your-database-id>
NEXT_PUBLIC_SERVICES_COLLECTION_ID=<your-services-collection-id>
NEXT_PUBLIC_POSTS_COLLECTION_ID=<your-posts-collection-id>
NEXT_PUBLIC_PROJECTS_COLLECTION_ID=<your-projects-collection-id>
NEXT_PUBLIC_STORAGE_BUCKET_ID=<your-bucket-id>
```

**To get these IDs:**
1. Go to Appwrite Console: https://cloud.appwrite.io/
2. Select project: `6984107f001d794d3c29`
3. Go to Databases → Click your database → Copy Database ID
4. Click each collection → Copy Collection ID
5. Go to Storage → Click bucket → Copy Bucket ID

### 2. Create Admin User

In Appwrite Console:
1. Go to Auth
2. Create a new user with email/password
3. Use these credentials to login at `/admin/login`

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Access Admin Dashboard

1. Go to `http://localhost:3000/admin/login`
2. Login with your Appwrite user credentials
3. Create services, posts, and projects

## Project Structure

```
src/
├── app/
│   ├── admin/              # Admin dashboard (auth protected)
│   │   ├── login/          # Login page
│   │   ├── services/       # Service CRUD
│   │   ├── posts/          # Post CRUD
│   │   └── projects/       # Project CRUD
│   ├── dich-vu/            # Services listing
│   │   └── [slug]/         # Dynamic service pages
│   ├── bai-viet/           # Blog listing
│   │   └── [slug]/         # Dynamic post pages
│   ├── du-an/              # Projects listing
│   │   └── [slug]/         # Dynamic project pages
│   ├── layout.tsx          # Root layout with SEO
│   └── sitemap.ts          # Dynamic sitemap
├── components/
│   ├── seo/                # JSON-LD scripts
│   ├── layout/             # Header, Footer
│   └── ui/                 # UI components
├── lib/
│   ├── appwrite.ts         # Appwrite client config
│   ├── auth.ts             # Authentication functions
│   ├── services.ts         # Services CRUD operations
│   ├── posts.ts            # Posts CRUD operations
│   ├── projects.ts         # Projects CRUD operations
│   ├── upload.ts           # Image upload helpers
│   └── utils.ts            # Vietnamese slug, image URLs
└── types/
    └── index.ts            # TypeScript interfaces
```

## SEO Features

✅ Dynamic metadata with `generateMetadata`  
✅ Clean SEO routes: `/dich-vu/[slug]`, `/bai-viet/[slug]`, `/du-an/[slug]`  
✅ Dynamic sitemap.xml from Appwrite data  
✅ JSON-LD: LocalBusiness, Service, Article schemas  
✅ 1 H1 per page, proper heading hierarchy  
✅ Canonical URLs  
✅ OpenGraph + Twitter cards  
✅ Image alt text required in admin  

## Admin Dashboard Features

✅ Appwrite Auth protected routes  
✅ CRUD for services, posts, projects  
✅ Auto Vietnamese → slug conversion  
✅ Rich HTML content editor (textarea)  
✅ Image upload to Appwrite Storage  
✅ Required alt text for images  
✅ Draft/Publish toggle  
✅ Preview uploaded images  
✅ SEO fields (title, description) with character counter  

## Production Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

Add environment variables in Vercel dashboard.

### Other Platforms

```bash
npm run build
npm start
```

## Notes

- All Appwrite collections must be created manually in Appwrite Console
- Set appropriate permissions for each collection (read: public, write: admin)
- Storage bucket must allow public read for images
- Use Vietnamese characters in titles - they auto-convert to slugs
- HTML content supports H2-H4 tags (avoid H1)
- Image URLs are generated dynamically from file IDs

## Support

Domain: https://www.dichvucayxanh.me  
Appwrite Project: 6984107f001d794d3c29  
Endpoint: https://sgp.cloud.appwrite.io/v1
