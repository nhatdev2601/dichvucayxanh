'use client';

import { useEffect } from 'react';
import { trackPhoneClick, trackZaloClick, trackCTAClick } from '@/lib/analytics';

/**
 * Global analytics event tracker.
 * Automatically fires GA4 events for phone clicks, Zalo clicks,
 * and CTA buttons across every page — no per-component changes needed.
 */
export default function AnalyticsEvents() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      const button = target.closest('button');
      const path = window.location.pathname;

      if (anchor) {
        const href = anchor.getAttribute('href') || '';
        const text = anchor.innerText?.trim() || '';

        // Track all tel: clicks
        if (href.startsWith('tel:')) {
          const phone = href.replace('tel:', '').replace(/\s/g, '');
          trackPhoneClick(phone, path);
          return;
        }

        // Track Zalo clicks
        if (href.includes('zalo.me')) {
          trackZaloClick(path);
          return;
        }

        // Track "Báo giá" / "Nhận báo giá" CTA clicks
        if (
          text.includes('Báo giá') ||
          text.includes('báo giá') ||
          text.includes('Gọi ngay') ||
          text.includes('Liên hệ') ||
          text.includes('Tư vấn')
        ) {
          trackCTAClick(text.substring(0, 50), path);
        }
      }

      if (button) {
        const text = button.innerText?.trim() || '';
        if (
          text.includes('Gửi') ||
          text.includes('gửi') ||
          text.includes('Submit') ||
          text.includes('Liên hệ') ||
          text.includes('Báo giá')
        ) {
          // Form submit buttons are tracked separately via handleSubmit
        }
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
}
