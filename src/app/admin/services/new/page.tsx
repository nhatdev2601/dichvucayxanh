'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createService } from '@/lib/services';
import { ServiceFormData } from '@/types';
import { slugify } from '@/lib/utils';
import ImageUpload from '@/components/admin/ImageUpload';
import MultiImageUpload from '@/components/admin/MultiImageUpload';

export default function NewServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ServiceFormData>({
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
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.featuredImage) {
      alert('Vui lòng upload ảnh chính (featuredImage)');
      return;
    }

    try {
      setLoading(true);
      const result = await createService(formData);
      if (!result) throw new Error('Không nhận được kết quả');
      alert('Tạo dịch vụ thành công!');
      router.push('/admin/services');
    } catch (error: any) {
      console.error('Error creating service:', error);
      alert(`Lỗi tạo dịch vụ: ${error?.message || 'Không xác định'}`);
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

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Tạo Dịch Vụ Mới</h1>

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

          {/* Featured Image */}
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

          {/* Cover Image (Legacy/Optional) */}
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
              {loading ? 'Đang xử lý...' : 'Tạo Dịch Vụ'}
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
