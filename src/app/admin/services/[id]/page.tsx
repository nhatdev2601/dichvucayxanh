'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getServiceById, updateService } from '@/lib/services';
import { ServiceFormData } from '@/types';
import { slugify } from '@/lib/utils';
import ImageUpload from '@/components/admin/ImageUpload';
import MultiImageUpload from '@/components/admin/MultiImageUpload';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.featuredImage) {
      alert('Vui lòng upload ảnh chính (featuredImage)');
      return;
    }

    try {
      setLoading(true);
      await updateService(serviceId, formData);
      alert('Cập nhật dịch vụ thành công!');
      router.push('/admin/services');
    } catch (error: any) {
      console.error('Error updating service:', error);
      alert(`Lỗi cập nhật dịch vụ: ${error?.message || 'Không xác định'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: slugify(title),
      seoTitle: title,
    });
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
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Chỉnh Sửa Dịch Vụ</h1>
          <a
            href={`/dich-vu/${formData.slug}`}
            target="_blank"
            className="text-green-600 hover:text-green-700 text-sm flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Xem trang
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Tiêu đề *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Nhập tiêu đề dịch vụ"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-2">Slug *</label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50"
              placeholder="slug-tu-dong"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Mô tả ngắn *</label>
            <textarea
              required
              rows={3}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Mô tả ngắn gọn về dịch vụ"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">Nội dung *</label>
            <textarea
              required
              rows={10}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Nội dung chi tiết (hỗ trợ Markdown)"
            />
          </div>

          {/* Cover Image */}
          <ImageUpload
            value={formData.featuredImage || ''}
            onChange={(fileId) => setFormData({ ...formData, featuredImage: fileId })}
            label="Ảnh Chính (Featured Image) *"
            required
          />

          {/* Alt Text */}
          <div>
            <label className="block text-sm font-medium mb-2">Mô tả ảnh (Alt Text)</label>
            <input
              type="text"
              value={formData.altText || ''}
              onChange={(e) => setFormData({ ...formData, altText: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Mô tả cho ảnh chính (tốt cho SEO)"
            />
          </div>

          {/* Images Gallery */}
          <MultiImageUpload
            value={formData.images || []}
            onChange={(fileIds) => setFormData({ ...formData, images: fileIds })}
            label="Các ảnh nhỏ (Images Gallery)"
          />

          {/* Cover Image */}
          <ImageUpload
            value={formData.coverImage}
            onChange={(fileId) => setFormData({ ...formData, coverImage: fileId })}
            label="Ảnh Cover (Tùy chọn)"
          />

          {/* SEO Title */}
          <div>
            <label className="block text-sm font-medium mb-2">SEO Title</label>
            <input
              type="text"
              value={formData.seoTitle}
              onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Tiêu đề SEO (mặc định dùng tiêu đề chính)"
            />
          </div>

          {/* SEO Description */}
          <div>
            <label className="block text-sm font-medium mb-2">SEO Description</label>
            <textarea
              rows={2}
              value={formData.seoDescription}
              onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Mô tả SEO"
            />
          </div>

          {/* SEO Keywords */}
          <div>
            <label className="block text-sm font-medium mb-2">SEO Keywords</label>
            <input
              type="text"
              value={formData.seoKeywords}
              onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="từ khóa 1, từ khóa 2, từ khóa 3"
            />
          </div>

          {/* Schema Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Schema Type</label>
            <select
              value={formData.schemaType}
              onChange={(e) => setFormData({ ...formData, schemaType: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="Service">Service</option>
              <option value="Product">Product</option>
              <option value="ProfessionalService">Professional Service</option>
            </select>
          </div>

          {/* Publish Status */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              className="w-4 h-4"
            />
            <label className="text-sm font-medium">Xuất bản</label>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Đang xử lý...' : 'Cập Nhật Dịch Vụ'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
