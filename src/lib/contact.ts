import { databases } from '@/lib/appwrite';
import { ContactForm } from '@/types';
import { ID } from 'appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CONTACTS_COLLECTION_ID!;

export async function submitContactForm(data: ContactForm) {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        ...data,
        createdAt: new Date().toISOString(),
      }
    );
    return { success: true, data: response };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error };
  }
}
