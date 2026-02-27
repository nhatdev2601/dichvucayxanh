'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getServiceById, updateService } from '@/lib/services';
import { ServiceFormData } from '@/types';
import ServiceForm from '@/components/admin/ServiceForm';

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [formData, setFormData] = useState<ServiceFormData>({
    title: '',
    slug: '',
    shortDescription: '',
    content: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    coverImage: '',
    featuredImage: '',
    images: [],
    altText: '',
    schemaType: 'Service',
    isPublished: false,
  });

  useEffect(() => {
    async function loadService() {
      const service = await getServiceById(serviceId);
      if (!service) {
        alert('Không tìm thấy dịch vụ');
        router.push('/admin/services');
        return;
      }
      setFormData({
        title: service.title,
        slug: service.slug,
        shortDescription: service.shortDescription,
        content: service.content,
        seoTitle: service.seoTitle,
        seoDescription: service.seoDescription,
        seoKeywords: service.seoKeywords || '',
        coverImage: service.coverImage || '',
        featuredImage: service.featuredImage || '',
        images: service.images || [],
        altText: service.altText || '',
        schemaType: service.schemaType || 'Service',
        isPublished: service.isPublished,
      });
      setPageLoading(false);
    }
    loadService();
  }, [serviceId, router]);

  const handleSubmit = async (data: ServiceFormData) => {
    try {
      setLoading(true);
      await updateService(serviceId, data);
      alert('Cập nhật dịch vụ thành công!');
      router.push('/admin/services');
    } catch (error: any) {
      console.error('Error updating service:', error);
      alert(`Lỗi cập nhật dịch vụ: ${error?.message || 'Không xác định'}`);
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Đang tải dịch vụ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Chỉnh Sửa Dịch Vụ</h1>
          <p className="text-sm text-gray-500 mt-1">Cập nhật thông tin dịch vụ bên dưới.</p>
        </div>

        <ServiceForm
          initialData={formData}
          onSubmit={handleSubmit}
          loading={loading}
          mode="edit"
          serviceSlug={formData.slug}
        />
      </div>
    </div>
  );
}


