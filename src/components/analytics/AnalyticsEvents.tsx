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
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      const anchor = target.closest('a');
      const path = window.location.pathname;

      if (anchor) {
        const href = anchor.getAttribute('href') || '';
        const text = (anchor as HTMLElement).innerText?.trim() || '';

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

        // Track CTA button clicks
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
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return null;
}
