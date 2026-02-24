// Appwrite Document Interface
export interface AppwriteDocument {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $databaseId: string;
  $collectionId: string;
}

// Service Collection
export interface Service extends AppwriteDocument {
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  coverImage: string;
  featuredImage?: string;
  images?: string[];
  altText?: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  schemaType: string;
  isPublished: boolean;
}

// Post Collection
export interface Post extends AppwriteDocument {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  seoTitle: string;
  seoDescription: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  publishedAt: string;
}

// Project Collection
export interface Project extends AppwriteDocument {
  title: string;
  slug: string;
  location: string;
  description: string;
  content: string;
  coverImage: string;
  gallery: string[];
  completedDate: string;
  seoTitle: string;
  seoDescription: string;
  isPublished: boolean;
}

// Contact Form
export interface ContactForm {
  name: string;
  phone: string;
  email?: string;
  service: string;
  message: string;
}

// Admin Forms
export interface ServiceFormData {
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  coverImage: string;
  featuredImage?: string;
  images?: string[];
  altText?: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  schemaType: string;
  isPublished: boolean;
}

export interface PostFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  seoTitle: string;
  seoDescription: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  publishedAt: string;
}

export interface ProjectFormData {
  title: string;
  slug: string;
  location: string;
  description: string;
  content: string;
  coverImage: string;
  gallery: string[];
  completedDate: string;
  seoTitle: string;
  seoDescription: string;
  isPublished: boolean;
}
