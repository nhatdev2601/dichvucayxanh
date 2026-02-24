import { databases, DATABASE_ID, PROJECTS_COLLECTION_ID } from './appwrite';
import { Project, ProjectFormData } from '@/types';
import { Query } from 'appwrite';

// Get all published projects
export async function getPublishedProjects(): Promise<Project[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      [Query.equal('isPublished', true), Query.orderDesc('completedAt')]
    );
    return response.documents as Project[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

// Get project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      [Query.equal('slug', slug), Query.equal('isPublished', true), Query.limit(1)]
    );
    return response.documents.length > 0 ? (response.documents[0] as Project) : null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

// Get projects by service type
export async function getProjectsByServiceType(serviceType: string): Promise<Project[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      [Query.equal('serviceType', serviceType), Query.equal('isPublished', true), Query.orderDesc('completedAt')]
    );
    return response.documents as Project[];
  } catch (error) {
    console.error('Error fetching projects by service type:', error);
    return [];
  }
}

// Get all projects (admin)
export async function getAllProjects(): Promise<Project[]> {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      [Query.orderDesc('$createdAt'), Query.limit(100)]
    );
    return response.documents as Project[];
  } catch (error) {
    console.error('Error fetching all projects:', error);
    return [];
  }
}

// Create project (admin)
export async function createProject(data: ProjectFormData): Promise<Project | null> {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      'unique()',
      data
    );
    return response as Project;
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
}

// Update project (admin)
export async function updateProject(id: string, data: Partial<ProjectFormData>): Promise<Project | null> {
  try {
    const response = await databases.updateDocument(
      DATABASE_ID,
      PROJECTS_COLLECTION_ID,
      id,
      data
    );
    return response as Project;
  } catch (error) {
    console.error('Error updating project:', error);
    return null;
  }
}

// Delete project (admin)
export async function deleteProject(id: string): Promise<boolean> {
  try {
    await databases.deleteDocument(DATABASE_ID, PROJECTS_COLLECTION_ID, id);
    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    return false;
  }
}
