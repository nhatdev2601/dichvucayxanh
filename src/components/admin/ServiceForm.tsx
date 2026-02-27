'use client';

import { useState, useCallback } from 'react';
import { ServiceFormData } from '@/types';
import { slugify } from '@/lib/utils';
import ImageUpload from './ImageUpload';
import MultiImageUpload from './MultiImageUpload';

interface ServiceFormProps {
  initialData: ServiceFormData;
  onSubmit: (data: ServiceFormData) => Promise<void>;
  loading: boolean;
  mode: 'create' | 'edit';
  serviceSlug?: string;
}

// ------- helpers -------
function truncate(str: string, max: number) {
  if (!str) return '';
  return str.length > max ? str.slice(0, max - 1).trimEnd() + '…' : str;
}

function autoKeywords(title: string, shortDescription: string): string {
  const stopWords = new Set([
    'và', 'của', 'là', 'cho', 'với', 'trong', 'tại', 'các', 'có', 'được',
    'về', 'từ', 'một', 'the', 'and', 'of', 'in', 'for', 'with', 'a', 'an',
    'to', 'that', 'this', 'on', 'at', 'by',
  ]);
  const all = `${title} ${shortDescription}`.toLowerCase();
  const words = all.match(/[\wÀ-ỹà-ỹ]{3,}/gu) ?? [];
  const freq: Record<string, number> = {};
  for (const w of words) {
    if (!stopWords.has(w)) freq[w] = (freq[w] ?? 0) + 1;
  }
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([w]) => w)
    .join(', ');
}

// ------- sub-components -------
function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h2 className="font-semibold text-gray-800 text-base">{title}</h2>
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );
}

function CharCount({ value, max, warn = max * 0.85 }: { value: string; max: number; warn?: number }) {
  const len = value.length;
  const color = len > max ? 'text-red-500' : len >= warn ? 'text-yellow-500' : 'text-gray-400';
  return (
    <span className={`text-xs font-mono ml-1 ${color}`}>
      {len}/{max}
    </span>
  );
}

function FieldLabel({ label, required, htmlFor, counter }: { label: string; required?: boolean; htmlFor?: string; counter?: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="flex items-center justify-between text-sm font-medium text-gray-700 mb-1.5">
      <span>
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      {counter}
    </label>
  );
}

// ------- main component -------
export default function ServiceForm({ initialData, onSubmit, loading, mode, serviceSlug }: ServiceFormProps) {
  const [formData, setFormData] = useState<ServiceFormData>(initialData);
  const [seoAutoMode, setSeoAutoMode] = useState<boolean>(mode === 'create');

  const set = useCallback((patch: Partial<ServiceFormData>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  }, []);

  // Auto-update SEO when title/shortDescription changes
  const handleTitleChange = (title: string) => {
    const patch: Partial<ServiceFormData> = {
      title,
      slug: slugify(title),
    };
    if (seoAutoMode) {
      patch.seoTitle = truncate(title + ' | Dịch Vụ Cây Xanh', 60);
      patch.seoKeywords = autoKeywords(title, formData.shortDescription);
    }
    set(patch);
  };

  const handleShortDescriptionChange = (shortDescription: string) => {
    const patch: Partial<ServiceFormData> = { shortDescription };
    if (seoAutoMode) {
      patch.seoDescription = truncate(shortDescription, 160);
      patch.seoKeywords = autoKeywords(formData.title, shortDescription);
    }
    set(patch);
  };

  const handleAutoGenSEO = () => {
    setSeoAutoMode(true);
    set({
      seoTitle: truncate(formData.title + ' | Dịch Vụ Cây Xanh', 60),
      seoDescription: truncate(formData.shortDescription, 160),
      seoKeywords: autoKeywords(formData.title, formData.shortDescription),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.featuredImage) {
      alert('Vui lòng upload Ảnh Chính (Featured Image)');
      return;
    }
    await onSubmit(formData);
  };

  // SEO preview snippet
  const previewTitle = formData.seoTitle || formData.title || 'Tiêu đề trang';
  const previewDesc = formData.seoDescription || formData.shortDescription || 'Mô tả trang ...';
  const previewSlug = formData.slug ? `/dich-vu/${formData.slug}` : '/dich-vu/slug-trang';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* ── 1. THÔNG TIN CƠ BẢN ── */}
      <SectionCard title="📝 Thông Tin Cơ Bản">
        {/* Title */}
        <div>
          <FieldLabel label="Tiêu đề" required htmlFor="title"
            counter={<CharCount value={formData.title} max={100} />}
          />
          <input
            id="title"
            type="text"
            required
            maxLength={100}
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            placeholder="Nhập tiêu đề dịch vụ"
          />
        </div>

        {/* Slug */}
        <div>
          <FieldLabel label="Slug (URL)" required htmlFor="slug" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 bg-gray-50 border border-gray-300 border-r-0 px-3 py-2.5 rounded-l-lg whitespace-nowrap">
              /dich-vu/
            </span>
            <input
              id="slug"
              type="text"
              required
              value={formData.slug}
              onChange={(e) => set({ slug: e.target.value })}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-gray-50"
              placeholder="slug-tu-dong"
            />
          </div>
        </div>

        {/* Short Description */}
        <div>
          <FieldLabel label="Mô tả ngắn" required htmlFor="shortDesc"
            counter={<CharCount value={formData.shortDescription} max={300} />}
          />
          <textarea
            id="shortDesc"
            required
            rows={3}
            maxLength={300}
            value={formData.shortDescription}
            onChange={(e) => handleShortDescriptionChange(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition resize-none"
            placeholder="Mô tả ngắn gọn về dịch vụ (hiển thị trong danh sách)"
          />
        </div>

        {/* Content */}
        <div>
          <FieldLabel label="Nội dung chi tiết" required htmlFor="content"
            counter={<CharCount value={formData.content} max={30000} />}
          />
          <textarea
            id="content"
            required
            rows={12}
            maxLength={30000}
            value={formData.content}
            onChange={(e) => set({ content: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition font-mono text-sm resize-y"
            placeholder="Nội dung chi tiết (hỗ trợ Markdown)"
          />
          <p className="text-xs text-gray-400 mt-1">Hỗ trợ Markdown: **in đậm**, *in nghiêng*, ## tiêu đề, - danh sách</p>
        </div>
      </SectionCard>

      {/* ── 2. HÌNH ẢNH ── */}
      <SectionCard title="🖼️ Hình Ảnh">
        {/* Featured Image */}
        <div>
          <ImageUpload
            value={formData.featuredImage || ''}
            onChange={(fileId) => set({ featuredImage: fileId })}
            label="Ảnh Chính (Featured Image) *"
            required
          />
          <p className="text-xs text-gray-400 mt-1">Ảnh hiển thị chính trên trang dịch vụ và khi chia sẻ mạng xã hội.</p>
        </div>

        {/* Alt Text */}
        <div>
          <FieldLabel label="Mô tả ảnh (Alt Text)" htmlFor="altText"
            counter={<CharCount value={formData.altText || ''} max={255} />}
          />
          <input
            id="altText"
            type="text"
            maxLength={255}
            value={formData.altText || ''}
            onChange={(e) => set({ altText: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            placeholder="Mô tả nội dung ảnh (giúp SEO & accessibility)"
          />
        </div>

        {/* Gallery */}
        <div>
          <MultiImageUpload
            value={formData.images || []}
            onChange={(fileIds) => set({ images: fileIds })}
            label="Ảnh Gallery (Images)"
          />
          <p className="text-xs text-gray-400 mt-1">Các ảnh phụ hiển thị trong gallery dịch vụ.</p>
        </div>

        {/* Cover Image */}
        <div>
          <ImageUpload
            value={formData.coverImage}
            onChange={(fileId) => set({ coverImage: fileId })}
            label="Ảnh Cover (Tùy chọn)"
          />
          <p className="text-xs text-gray-400 mt-1">Ảnh cover dùng cho thẻ thumbnail trong danh sách.</p>
        </div>
      </SectionCard>

      {/* ── 3. SEO ── */}
      <SectionCard title="🔍 Tối Ưu SEO">
        {/* Auto-generate button */}
        <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
          <div>
            <p className="text-sm font-medium text-green-800">Tự động tạo SEO</p>
            <p className="text-xs text-green-600 mt-0.5">
              Tự động điền SEO Title, Description và Keywords từ tiêu đề và mô tả.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-green-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={seoAutoMode}
                onChange={(e) => setSeoAutoMode(e.target.checked)}
                className="w-4 h-4 accent-green-600"
              />
              Tự động
            </label>
            <button
              type="button"
              onClick={handleAutoGenSEO}
              className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition font-medium"
            >
              ✨ Tạo ngay
            </button>
          </div>
        </div>

        {/* SEO Title */}
        <div>
          <FieldLabel label="SEO Title" htmlFor="seoTitle"
            counter={<CharCount value={formData.seoTitle} max={60} warn={50} />}
          />
          <input
            id="seoTitle"
            type="text"
            maxLength={60}
            value={formData.seoTitle}
            onChange={(e) => { setSeoAutoMode(false); set({ seoTitle: e.target.value }); }}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition ${
              formData.seoTitle.length > 60 ? 'border-red-400' : formData.seoTitle.length >= 50 ? 'border-yellow-400' : 'border-gray-300'
            }`}
            placeholder="Tiêu đề SEO (khuyến nghị 50–60 ký tự)"
          />
          <p className="text-xs text-gray-400 mt-1">Xuất hiện trên tab trình duyệt và kết quả tìm kiếm Google.</p>
        </div>

        {/* SEO Description */}
        <div>
          <FieldLabel label="SEO Description" htmlFor="seoDesc"
            counter={<CharCount value={formData.seoDescription} max={160} warn={130} />}
          />
          <textarea
            id="seoDesc"
            rows={3}
            maxLength={160}
            value={formData.seoDescription}
            onChange={(e) => { setSeoAutoMode(false); set({ seoDescription: e.target.value }); }}
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition resize-none ${
              formData.seoDescription.length > 160 ? 'border-red-400' : formData.seoDescription.length >= 130 ? 'border-yellow-400' : 'border-gray-300'
            }`}
            placeholder="Mô tả SEO (khuyến nghị 120–160 ký tự)"
          />
          <p className="text-xs text-gray-400 mt-1">Đoạn mô tả hiển thị dưới tiêu đề trong kết quả Google.</p>
        </div>

        {/* SEO Keywords */}
        <div>
          <FieldLabel label="SEO Keywords" htmlFor="seoKeywords"
            counter={<CharCount value={formData.seoKeywords || ''} max={300} />}
          />
          <input
            id="seoKeywords"
            type="text"
            maxLength={300}
            value={formData.seoKeywords || ''}
            onChange={(e) => { setSeoAutoMode(false); set({ seoKeywords: e.target.value }); }}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            placeholder="từ khóa 1, từ khóa 2, từ khóa 3, ..."
          />
          <p className="text-xs text-gray-400 mt-1">Các từ khóa cách nhau bằng dấu phẩy.</p>
        </div>

        {/* Schema Type */}
        <div>
          <FieldLabel label="Schema Type (JSON-LD)" htmlFor="schemaType" />
          <select
            id="schemaType"
            value={formData.schemaType || 'Service'}
            onChange={(e) => set({ schemaType: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition bg-white"
          >
            <option value="Service">Service – Dịch vụ thông thường</option>
            <option value="ProfessionalService">ProfessionalService – Dịch vụ chuyên nghiệp</option>
            <option value="Product">Product – Sản phẩm</option>
          </select>
          <p className="text-xs text-gray-400 mt-1">Loại dữ liệu có cấu trúc để Google hiểu nội dung tốt hơn.</p>
        </div>

        {/* SEO Preview */}
        {(formData.seoTitle || formData.title) && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Xem trước kết quả Google</p>
            <div className="border border-gray-200 rounded-lg p-4 bg-white space-y-0.5">
              <p className="text-xs text-green-700 truncate">dichvucayxanh.com{previewSlug}</p>
              <p className="text-lg text-blue-700 font-medium leading-snug line-clamp-1 hover:underline cursor-pointer">
                {previewTitle}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                {previewDesc}
              </p>
            </div>
          </div>
        )}
      </SectionCard>

      {/* ── 4. XUẤT BẢN ── */}
      <SectionCard title="⚙️ Cài Đặt Xuất Bản">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-800">Trạng thái xuất bản</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {formData.isPublished
                ? 'Dịch vụ đang hiển thị công khai trên website.'
                : 'Dịch vụ đang ở chế độ nháp, chưa hiển thị.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => set({ isPublished: !formData.isPublished })}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${
              formData.isPublished ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                formData.isPublished ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {mode === 'edit' && serviceSlug && (
          <div className="pt-2 border-t border-gray-100">
            <a
              href={`/dich-vu/${serviceSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-green-600 hover:text-green-700 hover:underline"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Xem trang dịch vụ
            </a>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
          >
            {loading && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading
              ? 'Đang xử lý...'
              : mode === 'create'
              ? '✅ Tạo Dịch Vụ'
              : '💾 Lưu Thay Đổi'}
          </button>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
          >
            Hủy
          </button>
        </div>
      </SectionCard>
    </form>
  );
}
