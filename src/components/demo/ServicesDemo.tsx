'use client';

import { useState, useEffect } from 'react';
import { getPublishedServices } from '@/lib/services';
import { Service } from '@/types';

export default function ServicesDemo() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await getPublishedServices();
      setServices(data);
    } catch (err) {
      setError('Failed to load services');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="mt-2 text-gray-600">Đang tải dịch vụ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Chưa có dịch vụ nào được thêm vào Appwrite.</p>
        <p className="text-sm text-gray-500 mt-2">
          Vui lòng cấu hình Appwrite và thêm dữ liệu mẫu.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <div
          key={service.$id}
          className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
          <p className="text-gray-600 mb-4">{service.shortDescription}</p>
          <p className="text-primary font-bold text-lg mb-3">Liên hệ báo giá</p>
        </div>
      ))}
    </div>
  );
}
