import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint('https://sgp.cloud.appwrite.io/v1')
  .setProject('6984107f001d794d3c29');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { client };

// Database & Collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_DATABASE_ID || '69843ba7000b363f2961';
export const SERVICES_COLLECTION_ID = process.env.NEXT_PUBLIC_SERVICES_COLLECTION_ID || 'services';
export const POSTS_COLLECTION_ID = process.env.NEXT_PUBLIC_POSTS_COLLECTION_ID || 'posts';
export const PROJECTS_COLLECTION_ID = process.env.NEXT_PUBLIC_PROJECTS_COLLECTION_ID || 'projects';
export const STORAGE_BUCKET_ID = process.env.NEXT_PUBLIC_STORAGE_BUCKET_ID || '69843fba001b3a343ee8';
