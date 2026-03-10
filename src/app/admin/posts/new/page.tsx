'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/lib/posts';
import { uploadImage } from '@/lib/upload';
import { PostFormData } from '@/types';
import { slugify } from '@/lib/utils';

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<PostFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    seoTitle: '',
    seoDescription: '',
    category: '',
    tags: [],
    isPublished: false,
    publishedAt: '',
  });
  const [tagInput, setTagInput] = useState('');
  const [showYoutubePanel, setShowYoutubePanel] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const insertYouTubeEmbed = () => {
    const url = youtubeUrl.trim();
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|v\/|shorts\/)|youtu\.be\/)+([\w-]{11})/
    );
    const videoId = match?.[1];
    if (!videoId) {
      alert('URL YouTube không hợp lệ. Vui lòng dùng youtube.com/watch?v=... hoặc youtu.be/...');
      return;
    }
    const embedHtml =
      `\n<div class="youtube-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;max-width:100%;margin:1.5rem 0">` +
      `<iframe src="https://www.youtube.com/embed/${videoId}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allowfullscreen loading="lazy" title="YouTube video player"></iframe></div>\n`;
    const textarea = contentRef.current;
    const pos = textarea?.selectionStart ?? formData.content.length;
    const newContent = formData.content.slice(0, pos) + embedHtml + formData.content.slice(pos);
    setFormData((prev) => ({ ...prev, content: newContent }));
    setYoutubeUrl('');
    setShowYoutubePanel(false);
    setTimeout(() => {
      if (textarea) {
        textarea.focus();
        const newPos = pos + embedHtml.length;
        textarea.setSelectionRange(newPos, newPos);
      }
    }, 0);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const imageId = await uploadImage(file);
      setFormData({ ...formData, coverImage: imageId });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Lỗi upload ảnh');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.coverImage) {
      alert('Vui lòng upload ảnh cover');
      return;
    }

    try {
      setLoading(true);
      const dataToSubmit = {
        ...formData,
        publishedAt: formData.isPublished ? (formData.publishedAt || new Date().toISOString()) : ''
      };
      await createPost(dataToSubmit);
      alert('Tạo bài viết thành công!');
      router.push('/admin/posts');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Lỗi tạo bài viết');
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
        <h1 className="text-3xl font-bold mb-8">Tạo Bài Viết Mới</h1>

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
              placeholder="Nhập tiêu đề bài viết"
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

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium mb-2">Trích dẫn *</label>
            <textarea
              required
              rows={3}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Mô tả ngắn gọn về bài viết"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium mb-2">Nội dung *</label>
            {/* YouTube Toolbar */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-300 rounded-t-lg border-b-0">
              <button
                type="button"
                onClick={() => setShowYoutubePanel((v) => !v)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg border transition ${
                  showYoutubePanel
                    ? 'bg-red-600 text-white border-red-600'
                    : 'text-red-600 bg-red-50 hover:bg-red-100 border-red-200'
                }`}
                title="Chèn video YouTube"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Chèn YouTube
              </button>
              <span className="text-xs text-gray-400">Đặt con trỏ vào vị trí muốn chèn rồi nhấn nút</span>
            </div>
            {showYoutubePanel && (
              <div className="flex items-center gap-2 px-3 py-2.5 bg-red-50 border border-gray-300 border-b-0 flex-wrap">
                <input
                  type="url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="Dán link YouTube: youtube.com/watch?v=... hoặc youtu.be/..."
                  className="flex-1 min-w-0 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 outline-none bg-white"
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), insertYouTubeEmbed())}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={insertYouTubeEmbed}
                  className="px-4 py-1.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition flex-shrink-0"
                >
                  Chèn vào nội dung
                </button>
                <button
                  type="button"
                  onClick={() => { setShowYoutubePanel(false); setYoutubeUrl(''); }}
                  className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-800 transition"
                >
                  Hủy
                </button>
              </div>
            )}
            <textarea
              ref={contentRef}
              required
              rows={15}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-b-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Nội dung chi tiết (hỗ trợ HTML + YouTube embed)"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium mb-2">Ảnh Cover *</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {formData.coverImage && (
              <div className="mt-2">
                <img
                  src={`https://sgp.cloud.appwrite.io/v1/storage/buckets/69843fba001b3a343ee8/files/${formData.coverImage}/view?project=6984107f001d794d3c29`}
                  alt="Preview"
                  className="w-48 h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-2">Danh mục *</label>
            <select
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Chọn danh mục</option>
              <option value="Tin tức">Tin tức</option>
              <option value="Hướng dẫn">Hướng dẫn</option>
              <option value="Kiến thức">Kiến thức</option>
              <option value="Chăm sóc cây">Chăm sóc cây</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="flex-1 px-4 py-2 border rounded-lg"
                placeholder="Nhập tag và nhấn Enter"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Thêm
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
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
            <label className="text-sm font-medium">Xuất bản ngay</label>
          </div>

          {/* Published Date (if publishing) */}
          {formData.isPublished && (
            <div>
              <label className="block text-sm font-medium mb-2">Ngày xuất bản</label>
              <input
                type="datetime-local"
                value={formData.publishedAt ? new Date(formData.publishedAt).toISOString().slice(0, 16) : ''}
                onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value ? new Date(e.target.value).toISOString() : '' })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Đang xử lý...' : 'Tạo Bài Viết'}
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
