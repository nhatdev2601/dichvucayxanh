import { databases, DATABASE_ID, SERVICES_COLLECTION_ID } from './appwrite';
import { Service, ServiceFormData } from '@/types';
import { Query, ID, Permission, Role } from 'appwrite';

// Get all published services
export async function getPublishedServices(): Promise<Service[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      SERVICES_COLLECTION_ID,
      [Query.equal('isPublished', true), Query.orderDesc('$createdAt')]
    );
    return response.documents as Service[];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

// Get service by slug
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      SERVICES_COLLECTION_ID,
      [Query.equal('slug', slug), Query.equal('isPublished', true), Query.limit(1)]
    );
    return response.documents.length > 0 ? (response.documents[0] as Service) : null;
  } catch (error) {
    console.error('Error fetching service:', error);
    return null;
  }
}

// Get service by ID (admin)
export async function getServiceById(id: string): Promise<Service | null> {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      SERVICES_COLLECTION_ID,
      id
    );
    return response as Service;
  } catch (error) {
    console.error('Error fetching service by ID:', error);
    return null;
  }
}

// Get all services (admin)
export async function getAllServices(): Promise<Service[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      SERVICES_COLLECTION_ID,
      [Query.orderDesc('$createdAt'), Query.limit(100)]
    );
    return response.documents as Service[];
  } catch (error) {
    console.error('Error fetching all services:', error);
    return [];
  }
}

// Create service (admin)
export async function createService(data: ServiceFormData): Promise<Service> {
  const response = await databases.createDocument(
    DATABASE_ID,
    SERVICES_COLLECTION_ID,
    ID.unique(),
    data,
    [
      Permission.read(Role.any()),
      Permission.update(Role.users()),
      Permission.delete(Role.users()),
    ]
  );
  return response as Service;
}

// Update service (admin)
export async function updateService(id: string, data: Partial<ServiceFormData>): Promise<Service> {
  const response = await databases.updateDocument(
    DATABASE_ID,
    SERVICES_COLLECTION_ID,
    id,
    data
  );
  return response as Service;
}

// Delete service (admin)
export async function deleteService(id: string): Promise<boolean> {
  try {
    await databases.deleteDocument(DATABASE_ID, SERVICES_COLLECTION_ID, id);
    return true;
  } catch (error) {
    console.error('Error deleting service:', error);
    return false;
  }
}
