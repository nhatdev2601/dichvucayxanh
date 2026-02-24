import { storage } from './appwrite';
import { ID } from 'appwrite';

const BUCKET_ID = '69843fba001b3a343ee8';

export async function uploadImage(file: File): Promise<string> {
  try {
    const response = await storage.createFile(
      BUCKET_ID,
      ID.unique(),
      file
    );
    return response.$id;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}

export async function deleteImage(fileId: string): Promise<boolean> {
  try {
    await storage.deleteFile(BUCKET_ID, fileId);
    return true;
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
}

export function getImagePreviewUrl(fileId: string): string {
  if (!fileId) return '';
  const endpoint = 'https://sgp.cloud.appwrite.io/v1';
  const projectId = '6984107f001d794d3c29';
  return `${endpoint}/storage/buckets/${BUCKET_ID}/files/${fileId}/preview?project=${projectId}&width=400&height=300`;
}
