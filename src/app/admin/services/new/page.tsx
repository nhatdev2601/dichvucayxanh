'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createService } from '@/lib/services';
import { ServiceFormData } from '@/types';
import ServiceForm from '@/components/admin/ServiceForm';

const EMPTY_FORM: ServiceFormData = {
  title: '',
  slug: '',
  shortDescription: '',
  content: '',
  coverImage: '',
  featuredImage: '',
  images: [],
  altText: '',
  seoTitle: '',
  seoDescription: '',
  seoKeywords: '',
  schemaType: 'Service',
  isPublished: false,
};

export default function NewServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: ServiceFormData) => {
    try {
      setLoading(true);
      const result = await createService(data);
      if (!result) throw new Error('Khong nhan duoc ket qua');
      alert('Tao dich vu thanh cong!');
      router.push('/admin/services');
    } catch (error: any) {
      console.error('Error creating service:', error);
      alert(`Loi tao dich vu: ${error?.message || 'Khong xac dinh'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Tao Dich Vu Moi</h1>
          <p className="text-sm text-gray-500 mt-1">Dien thong tin ben duoi de tao dich vu moi.</p>
        </div>

        <ServiceForm
          initialData={EMPTY_FORM}
          onSubmit={handleSubmit}
          loading={loading}
          mode="create"
        />
      </div>
    </div>
  );
}
