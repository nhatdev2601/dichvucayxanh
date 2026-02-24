import { NextResponse } from 'next/server';
import {
  createService,
  getServiceById,
  getServiceBySlug,
  updateService,
  deleteService,
} from '@/lib/services';
import { ServiceFormData } from '@/types';

/**
 * GET /api/test-appwrite
 * Runs a full CRUD cycle (create -> read -> update -> delete) against Appwrite services collection.
 * Useful for verifying permissions and environment variables.
 */
export async function GET() {
  const slug = `test-service-${Date.now()}`;
  const basePayload: ServiceFormData = {
    title: 'Dịch vụ test',
    slug,
    shortDescription: 'Bản ghi dùng để test CRUD Appwrite',
    content: 'Nội dung test',
    coverImage: 'test-file-id',
    seoTitle: 'Test Service',
    seoDescription: 'Test CRUD Appwrite',
    seoKeywords: 'test,crud,appwrite',
    schemaType: 'Service',
    isPublished: false,
  };

  const steps: Array<Record<string, unknown>> = [];

  try {
    console.log('DEBUG: env values', {
      databaseId: process.env.NEXT_PUBLIC_DATABASE_ID,
      legacyDatabaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      servicesCollection: process.env.NEXT_PUBLIC_SERVICES_COLLECTION_ID,
      endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
      project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    });
    steps.push({
      step: 'env-check',
      databaseId: process.env.NEXT_PUBLIC_DATABASE_ID,
      servicesCollection: process.env.NEXT_PUBLIC_SERVICES_COLLECTION_ID,
    });

    const created = await createService(basePayload);
    steps.push({ step: 'create', status: 'ok', documentId: created.$id });

    const fetchedBySlug = await getServiceBySlug(slug);
    steps.push({
      step: 'read:slug',
      status: fetchedBySlug ? 'ok' : 'fail',
      match: fetchedBySlug?.$id === created.$id,
    });

    const updatedTitle = `${basePayload.title} (đã cập nhật)`;
    const updated = await updateService(created.$id, {
      title: updatedTitle,
      seoTitle: updatedTitle,
    });
    steps.push({ step: 'update', status: 'ok', newTitle: updated.title });

    const fetchedById = await getServiceById(created.$id);
    steps.push({
      step: 'read:id',
      status: fetchedById ? 'ok' : 'fail',
      titleMatches: fetchedById?.title === updatedTitle,
    });

    const deleted = await deleteService(created.$id);
    steps.push({ step: 'delete', status: deleted ? 'ok' : 'fail' });

    return NextResponse.json({ success: true, steps });
  } catch (error: any) {
    steps.push({
      step: 'error',
      status: 'fail',
      message: error?.message || 'Unknown error',
      stack: error?.response?.message ?? error?.stack,
    });
    return NextResponse.json({ success: false, steps }, { status: 500 });
  }
}
