# Appwrite Setup Guide

## Step 1: Create Appwrite Account

1. Go to [cloud.appwrite.io](https://cloud.appwrite.io)
2. Sign up for a free account
3. Create a new project named "Dịch Vụ Cây Xanh"

## Step 2: Get Project ID

1. In your project dashboard, copy the **Project ID**
2. Update `.env.local`:
   ```
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   ```

## Step 3: Create Database

1. Click "Databases" in the left sidebar
2. Click "Create database"
3. Name it "dichvucayxanh-db"
4. Copy the **Database ID**
5. Update `.env.local`:
   ```
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
   ```

## Step 4: Create Collections

### Collection 1: Services

1. Click "Create collection"
2. Name: "services"
3. Add attributes:
   - `title` (String, 255 characters, required)
   - `description` (String, 1000 characters, required)
   - `icon` (String, 100 characters)
   - `price` (String, 100 characters)
   - `features` (Array of strings)
   - `imageUrl` (URL, 500 characters)
4. Set permissions:
   - Role: Any
   - Read: ✓
   - Create: ✓ (for demo)
5. Copy Collection ID to `.env.local`:
   ```
   NEXT_PUBLIC_APPWRITE_SERVICES_COLLECTION_ID=your_collection_id
   ```

### Collection 2: Projects

1. Create collection named "projects"
2. Add attributes:
   - `title` (String, 255, required)
   - `description` (String, 1000, required)
   - `location` (String, 255, required)
   - `imageUrl` (URL, 500, required)
   - `completedDate` (String, 100)
   - `category` (String, 100, required)
3. Set permissions (same as Services)
4. Copy Collection ID to `.env.local`

### Collection 3: Contacts

1. Create collection named "contacts"
2. Add attributes:
   - `name` (String, 255, required)
   - `phone` (String, 50, required)
   - `email` (Email, 255)
   - `service` (String, 100, required)
   - `message` (String, 2000, required)
   - `createdAt` (DateTime, required)
3. Set permissions:
   - Role: Any
   - Create: ✓
   - Read: ✓ (for admin only in production)
4. Copy Collection ID to `.env.local`

## Step 5: Add Sample Data

### Sample Service:

```json
{
  "title": "Cắt tỉa cây xanh",
  "description": "Dịch vụ cắt tỉa chuyên nghiệp, tạo hình đẹp mắt",
  "icon": "scissors",
  "price": "500.000đ+",
  "features": [
    "Cắt tỉa tạo hình",
    "Loại bỏ cành khô",
    "Đảm bảo an toàn",
    "Vệ sinh sạch sẽ"
  ],
  "imageUrl": "https://images.unsplash.com/photo-1416879595882-3373a0480b5b"
}
```

### Sample Project:

```json
{
  "title": "Sân vườn biệt thự Phú Mỹ Hưng",
  "description": "Thiết kế và thi công sân vườn 500m2",
  "location": "Quận 7, TP.HCM",
  "imageUrl": "https://images.unsplash.com/photo-1558904541-efa843a96f01",
  "completedDate": "Tháng 11, 2025",
  "category": "Biệt thự"
}
```

## Step 6: Test Integration

1. Restart your Next.js dev server
2. Navigate to the services or contact pages
3. Check browser console for any errors
4. Test form submission
5. Verify data appears in Appwrite dashboard

## Troubleshooting

**Problem:** "Project not found"
- Solution: Check `NEXT_PUBLIC_APPWRITE_PROJECT_ID` is correct

**Problem:** "Database not found"
- Solution: Verify `NEXT_PUBLIC_APPWRITE_DATABASE_ID`

**Problem:** "Collection not found"
- Solution: Check all collection IDs in `.env.local`

**Problem:** "Unauthorized"
- Solution: Set collection permissions to "Any" for read/write (demo only)

## Production Security

For production deployment:

1. Create API keys with specific permissions
2. Implement server-side validation
3. Restrict collection permissions
4. Add rate limiting
5. Validate all user inputs
6. Use environment-specific configurations

## Resources

- [Appwrite Documentation](https://appwrite.io/docs)
- [Next.js Integration](https://appwrite.io/docs/quick-starts/nextjs)
- [Appwrite Console](https://cloud.appwrite.io)
