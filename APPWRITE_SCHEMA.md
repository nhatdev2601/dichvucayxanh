# Appwrite Database Schema

**Database ID:** `69843ba7000b363f2961`
**Storage Bucket ID:** `69843fba001b3a343ee8`

## Collections

### services
```json
{
  "title": "string(150), required, indexed",
  "slug": "string(150), required, unique, indexed",
  "shortDescription": "string(300), required",
  "content": "string(20000), required",
  "coverImage": "string(50), required",
  "seoTitle": "string(160), optional",
  "seoDescription": "string(300), optional",
  "seoKeywords": "string(300), optional",
  "schemaType": "string(50), default: Service",
  "isPublished": "boolean, default: false",
  "$createdAt": "datetime",
  "$updatedAt": "datetime"
}
```

**Indexes:**
- title (asc)
- slug (asc, unique)
- isPublished (asc)

---

### posts
```json
{
  "title": "string(150), required, indexed",
  "slug": "string(150), required, unique, indexed",
  "excerpt": "string(300), required",
  "content": "string(20000), required",
  "coverImage": "string(50), required",
  "category": "string(50), required",
  "tags": "string[], optional",
  "publishedAt": "string(50), optional",
  "seoTitle": "string(160), optional",
  "seoDescription": "string(300), optional",
  "isPublished": "boolean, default: false",
  "$createdAt": "datetime",
  "$updatedAt": "datetime"
}
```

**Indexes:**
- slug (asc, unique)
- isPublished (asc)
- category (asc)

---

### projects
```json
{
  "title": "string(150), required, indexed",
  "slug": "string(150), required, unique, indexed",
  "description": "string(300), required",
  "content": "string(20000), required",
  "coverImage": "string(50), required",
  "gallery": "string[], optional",
  "location": "string(150), required",
  "completedDate": "string(50), optional",
  "seoTitle": "string(160), optional",
  "seoDescription": "string(300), optional",
  "isPublished": "boolean, default: false",
  "$createdAt": "datetime",
  "$updatedAt": "datetime"
}
```

**Indexes:**
- slug (asc, unique)
- isPublished (asc)
- location (asc)

---

## Storage Rules
- Bucket: cayxanh
- Max file size: 10MB
- Allowed formats: jpg, jpeg, png, webp, gif
- Auto-convert to WebP when possible
- Generate responsive thumbnails
