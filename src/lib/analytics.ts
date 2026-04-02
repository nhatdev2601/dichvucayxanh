declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const GA_MEASUREMENT_ID = 'G-TV4Q87N9PS';

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  const shouldLog = process.env.NODE_ENV !== 'production';

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
    if (shouldLog) {
      console.log(`📊 GA4 Event: ${eventName}`, params);
    }
  } else {
    if (shouldLog) {
      console.warn('⚠️ gtag not available yet');
    }
  }
}

export function trackPhoneClick(phone: string, location?: string) {
  // Use GA4 recommended event: 'generate_lead'
  trackEvent('generate_lead', {
    currency: 'VND',
    value: 1,
    method: 'phone_click',
    phone_number: phone,
    page_location: location || (typeof window !== 'undefined' ? window.location.pathname : ''),
  });
  
  // Also send custom event for detailed tracking
  trackEvent('click_phone', {
    phone_number: phone,
    page_location: location || (typeof window !== 'undefined' ? window.location.pathname : ''),
  });
}

export function trackZaloClick(location?: string) {
  // Use GA4 recommended event: 'generate_lead'
  trackEvent('generate_lead', {
    currency: 'VND',
    value: 1,
    method: 'zalo_click',
    page_location: location || (typeof window !== 'undefined' ? window.location.pathname : ''),
  });
  
  // Also send custom event
  trackEvent('click_zalo', {
    page_location: location || (typeof window !== 'undefined' ? window.location.pathname : ''),
  });
}

export function trackFormSubmit(formName: string, params?: Record<string, string>) {
  trackEvent('form_submit', {
    form_name: formName,
    ...params,
  });
}

export function trackCTAClick(ctaName: string, location?: string) {
  trackEvent('cta_click', {
    cta_name: ctaName,
    page_location: location || (typeof window !== 'undefined' ? window.location.pathname : ''),
  });
}
