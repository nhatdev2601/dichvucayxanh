import { databases, DATABASE_ID, POSTS_COLLECTION_ID } from './appwrite';
import { Post, PostFormData } from '@/types';
import { Query } from 'appwrite';

// Get all published posts
export async function getPublishedPosts(): Promise<Post[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      POSTS_COLLECTION_ID,
      [Query.equal('isPublished', true), Query.orderDesc('$createdAt')]
    );
    return response.documents as Post[];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Get post by slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      POSTS_COLLECTION_ID,
      [Query.equal('slug', slug), Query.equal('isPublished', true), Query.limit(1)]
    );
    return response.documents.length > 0 ? (response.documents[0] as Post) : null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Get posts by category
export async function getPostsByCategory(category: string): Promise<Post[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      POSTS_COLLECTION_ID,
      [Query.equal('category', category), Query.equal('isPublished', true), Query.orderDesc('$createdAt')]
    );
    return response.documents as Post[];
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
}

// Get all posts (admin)
export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      POSTS_COLLECTION_ID,
      [Query.orderDesc('$createdAt'), Query.limit(100)]
    );
    return response.documents as Post[];
  } catch (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }
}

// Create post (admin)
export async function createPost(data: PostFormData): Promise<Post | null> {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      POSTS_COLLECTION_ID,
      'unique()',
      data
    );
    return response as Post;
  } catch (error) {
    console.error('Error creating post:', error);
    return null;
  }
}

// Update post (admin)
export async function updatePost(id: string, data: Partial<PostFormData>): Promise<Post | null> {
  try {
    const response = await databases.updateDocument(
      DATABASE_ID,
      POSTS_COLLECTION_ID,
      id,
      data
    );
    return response as Post;
  } catch (error) {
    console.error('Error updating post:', error);
    return null;
  }
}

// Delete post (admin)
export async function deletePost(id: string): Promise<boolean> {
  try {
    await databases.deleteDocument(DATABASE_ID, POSTS_COLLECTION_ID, id);
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    return false;
  }
}
