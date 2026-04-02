'use client';

import { trackPhoneClick, trackZaloClick, trackCTAClick, trackFormSubmit } from '@/lib/analytics';

export default function TestAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🧪 Google Analytics Test Page
          </h1>
          <p className="text-gray-600 mb-8">
            Mở DevTools Console (F12) để xem events được gửi. Sau đó check GA4 Realtime.
          </p>

          {/* Status Check */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-blue-900 mb-4">✓ GA4 Status</h2>
            <button
              onClick={() => {
                const isReady = typeof window !== 'undefined' && typeof window.gtag === 'function';
                if (isReady) {
                  console.log('✅ GA4 is ready!');
                  console.log('dataLayer:', window.dataLayer);
                  alert('✅ GA4 is ready! Check console for details.');
                } else {
                  console.error('❌ GA4 not loaded yet');
                  alert('❌ GA4 not loaded. Refresh and try again.');
                }
              }}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Check GA4 Status
            </button>
          </div>

          {/* Test Buttons */}
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Test Phone Click</h3>
              <div className="space-y-3">
                <a
                  href="tel:0908396962"
                  className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                >
                  ☎️ Click to call: 0982675730
                </a>
                <button
                  onClick={() => trackPhoneClick('0908396962', '/test')}
                  className="ml-4 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700"
                >
                  🧪 Manual Test Phone Event
                </button>
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Test Zalo Click</h3>
              <div className="space-y-3">
                <a
                  href="https://zalo.me/0982675730"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  💬 Chat Zalo
                </a>
                <button
                  onClick={() => trackZaloClick('/test')}
                  className="ml-4 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700"
                >
                  🧪 Manual Test Zalo Event
                </button>
              </div>
            </div>

            <div className="border-l-4 border-yellow-500 pl-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Test CTA Click</h3>
              <div className="space-y-3">
                <a
                  href="/bao-gia"
                  className="inline-block px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700"
                >
                  📋 Nhận báo giá miễn phí
                </a>
                <button
                  onClick={() => trackCTAClick('Báo giá test button', '/test')}
                  className="ml-4 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700"
                >
                  🧪 Manual Test CTA Event
                </button>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Test Form Submit</h3>
              <button
                onClick={() => trackFormSubmit('test_form', { page: '/test' })}
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700"
              >
                📝 Test Form Submit Event
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-12 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📖 Hướng dẫn kiểm tra:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Mở <strong>DevTools Console</strong> (F12)</li>
              <li>Click vào các nút bên trên</li>
              <li>Xem events xuất hiện trong Console với icon 📊</li>
              <li>Vào GA4 → <strong>Báo cáo</strong> → <strong>Thời gian thực</strong></li>
              <li>Scroll xuống phần <strong>"Sự kiện theo tên sự kiện"</strong></li>
              <li>
                Tìm event{' '}
                <code className="bg-gray-200 px-2 py-1 rounded">click_phone</code> và{' '}
                <code className="bg-gray-200 px-2 py-1 rounded">click_zalo</code>
              </li>
            </ol>
          </div>

          <div className="mt-8 text-center">
            <a
              href="/"
              className="text-primary hover:underline font-semibold"
            >
              ← Quay về Trang chủ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
