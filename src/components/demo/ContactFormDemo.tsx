'use client';

import { useState } from 'react';
import { submitContactForm } from '@/lib/contact';
import { ContactForm } from '@/types';

export default function ContactFormDemo() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const response = await submitContactForm(formData);
      
      if (response.success) {
        setResult({
          success: true,
          message: 'Đã gửi yêu cầu thành công! Chúng tôi sẽ liên hệ với bạn sớm.',
        });
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: '',
          message: '',
        });
      } else {
        setResult({
          success: false,
          message: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
        });
      }
    } catch (error) {
      setResult({
        success: false,
        message: 'Có lỗi xảy ra. Vui lòng kiểm tra cấu hình Appwrite.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">
        Demo: Gửi yêu cầu qua Appwrite
      </h3>

      {result && (
        <div
          className={`mb-6 p-4 rounded-lg ${
            result.success
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          {result.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="demo-name" className="block text-sm font-semibold text-gray-700 mb-1">
            Họ và tên *
          </label>
          <input
            type="text"
            id="demo-name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Nguyễn Văn A"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="demo-phone" className="block text-sm font-semibold text-gray-700 mb-1">
              Số điện thoại *
            </label>
            <input
              type="tel"
              id="demo-phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="0982675730"
            />
          </div>

          <div>
            <label htmlFor="demo-email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="demo-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="email@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="demo-service" className="block text-sm font-semibold text-gray-700 mb-1">
            Dịch vụ quan tâm *
          </label>
          <select
            id="demo-service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Chọn dịch vụ</option>
            <option value="cat-tia">Cắt tỉa cây xanh</option>
            <option value="cham-soc">Chăm sóc cây xanh</option>
            <option value="trong-cay">Trồng cây cảnh quan</option>
            <option value="thiet-ke">Thiết kế sân vườn</option>
          </select>
        </div>

        <div>
          <label htmlFor="demo-message" className="block text-sm font-semibold text-gray-700 mb-1">
            Tin nhắn *
          </label>
          <textarea
            id="demo-message"
            name="message"
            required
            rows={3}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            placeholder="Nội dung yêu cầu..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary-600 transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Đang gửi...' : 'Gửi yêu cầu'}
        </button>
      </form>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Lưu ý:</strong> Demo này yêu cầu cấu hình Appwrite trong file .env.local
        </p>
      </div>
    </div>
  );
}
