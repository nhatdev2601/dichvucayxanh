'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProject } from '@/lib/projects';
import { uploadImage } from '@/lib/upload';
import { ProjectFormData } from '@/types';
import { slugify } from '@/lib/utils';

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    slug: '',
    description: '',
    content: '',
    location: '',
    coverImage: '',
    gallery: [],
    completedDate: '',
    seoTitle: '',
    seoDescription: '',
    isPublished: false,
  });

  const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const imageId = await uploadImage(file);
      setFormData({ ...formData, coverImage: imageId });
    } catch (error) {
      console.error('Error uploading cover image:', error);
      alert('Lỗi upload ảnh cover');
    } finally {
      setLoading(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setLoading(true);
      const uploadPromises = Array.from(files).map(file => uploadImage(file));
      const imageIds = await Promise.all(uploadPromises);
      setFormData({ ...formData, gallery: [...formData.gallery, ...imageIds] });
    } catch (error) {
      console.error('Error uploading gallery images:', error);
      alert('Lỗi upload ảnh gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    const newGallery = formData.gallery.filter((_, idx) => idx !== index);
    setFormData({ ...formData, gallery: newGallery });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.coverImage) {
      alert('Vui lòng upload ảnh cover');
      return;
    }

    try {
      setLoading(true);
      await createProject(formData);
      alert('Tạo dự án thành công!');
      router.push('/admin/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Lỗi tạo dự án');
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
        <h1 className="text-3xl font-bold mb-8">Tạo Dự Án Mới</h1>

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
              placeholder="Nhập tiêu đề dự án"
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

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Mô tả ngắn *</label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Mô tả ngắn gọn về dự án"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">Nội dung *</label>
            <textarea
              required
              rows={15}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Nội dung chi tiết (hỗ trợ Markdown)"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-2">Địa điểm *</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Vị trí dự án (VD: Quận 1, TP.HCM)"
            />
          </div>

          {/* Completed Date */}
          <div>
            <label className="block text-sm font-medium mb-2">Ngày hoàn thành</label>
            <input
              type="date"
              value={formData.completedDate ? new Date(formData.completedDate).toISOString().slice(0, 10) : ''}
              onChange={(e) => setFormData({ ...formData, completedDate: e.target.value ? new Date(e.target.value).toISOString() : '' })}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium mb-2">Ảnh Cover *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverImageUpload}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {formData.coverImage && (
              <div className="mt-2">
                <img
                  src={`https://sgp.cloud.appwrite.io/v1/storage/buckets/69843fba001b3a343ee8/files/${formData.coverImage}/view?project=6984107f001d794d3c29`}
                  alt="Cover Preview"
                  className="w-48 h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-sm font-medium mb-2">Thư viện ảnh</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleGalleryUpload}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {formData.gallery.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {formData.gallery.map((imageId, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={`https://sgp.cloud.appwrite.io/v1/storage/buckets/69843fba001b3a343ee8/files/${imageId}/view?project=6984107f001d794d3c29&width=200&height=200`}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

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
              {loading ? 'Đang xử lý...' : 'Tạo Dự Án'}
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
