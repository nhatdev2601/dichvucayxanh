'use client';

import { useState, useEffect } from 'react';
import { getAllServices, deleteService } from '@/lib/services';
import { Service } from '@/types';
import { getImagePreviewUrl } from '@/lib/upload';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    setIsLoading(true);
    const data = await getAllServices();
    setServices(data);
    setIsLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Bạn có chắc muốn xóa dịch vụ này?')) return;
    
    const success = await deleteService(id);
    if (success) {
      loadServices();
    } else {
      alert('Lỗi khi xóa dịch vụ');
    }
  }

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý dịch vụ</h1>
        <a
          href="/admin/services/new"
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
        >
          Thêm dịch vụ mới
        </a>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hình ảnh</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiêu đề</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Schema Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map((service) => (
              <tr key={service.$id}>
                <td className="px-6 py-4">
                  {service.coverImage && (
                    <img
                      src={getImagePreviewUrl(service.coverImage)}
                      alt={service.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{service.title}</td>
                <td className="px-6 py-4 text-gray-600">{service.slug}</td>
                <td className="px-6 py-4 text-gray-600">{service.schemaType || '-'}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    service.isPublished 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {service.isPublished ? 'Đã xuất bản' : 'Nháp'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <a
                      href={`/admin/services/${service.$id}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      Sửa
                    </a>
                    <button
                      onClick={() => handleDelete(service.$id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
