import { getImageUrl } from './utils';

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  type: 'service' | 'post' | 'project';
  slug: string;
  image?: string;
}

const BUSINESS_NAME = 'Dịch Vụ Cây Xanh';
const LOCATION = 'TP.HCM';
const DOMAIN = 'https://dichvucayxanh.me';

export function generateSEOTitle(config: SEOConfig): string {
  if (config.title) return config.title;
  
  const typeMap = {
    service: 'Dịch vụ',
    post: 'Bài viết',
    project: 'Dự án'
  };
  
  return `${config.title || ''} tại ${LOCATION} | ${typeMap[config.type]} ${BUSINESS_NAME} uy tín`;
}

export function generateSEODescription(config: SEOConfig, excerpt: string): string {
  if (config.description) return config.description;
  
  return `${excerpt.slice(0, 250)} - Liên hệ ${BUSINESS_NAME} tại ${LOCATION} để được tư vấn miễn phí. Uy tín - Chuyên nghiệp - Giá cả hợp lý.`;
}

export function generateSEOKeywords(title: string, type: string): string {
  const baseKeywords = [
    title.toLowerCase(),
    `${type} cây xanh`,
    `${type} cây xanh ${LOCATION}`,
    `${type} cây xanh TP.HCM`,
    `dịch vụ cây xanh ${LOCATION}`,
    'dịch vụ cây xanh uy tín',
    'dịch vụ cây xanh giá rẻ'
  ];
  
  return baseKeywords.join(', ');
}

export function generateCanonicalURL(path: string): string {
  return `${DOMAIN}${path}`;
}

export function generateOpenGraph(config: {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article';
}) {
  return {
    title: config.title,
    description: config.description,
    url: config.url,
    siteName: BUSINESS_NAME,
    images: config.image ? [{
      url: config.image,
      width: 1200,
      height: 630,
      alt: config.title,
    }] : [],
    locale: 'vi_VN',
    type: config.type || 'website',
  };
}

export function generateTwitterCard(config: {
  title: string;
  description: string;
  image?: string;
}) {
  return {
    card: 'summary_large_image' as const,
    title: config.title,
    description: config.description,
    images: config.image ? [config.image] : [],
  };
}

export function generateServiceSchema(service: {
  title: string;
  shortDescription: string;
  coverImage?: string;
  slug: string;
  schemaType?: string;
}) {
  const imageUrl = service.coverImage ? getImageUrl(service.coverImage) : '';
  
  return {
    '@context': 'https://schema.org',
    '@type': service.schemaType || 'Service',
    name: service.title,
    description: service.shortDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: BUSINESS_NAME,
      url: DOMAIN,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'TP. Hồ Chí Minh',
        addressCountry: 'VN',
      },
      telephone: '+84908396962',
    },
    areaServed: {
      '@type': 'City',
      name: 'TP. Hồ Chí Minh',
    },
    url: `${DOMAIN}/dich-vu/${service.slug}`,
    ...(imageUrl && { image: imageUrl }),
  };
}

export function generateArticleSchema(post: {
  title: string;
  excerpt: string;
  coverImage?: string;
  slug: string;
  publishedAt?: string;
  $createdAt: string;
}) {
  const imageUrl = post.coverImage ? getImageUrl(post.coverImage) : '';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl || undefined,
    datePublished: post.publishedAt || post.$createdAt,
    dateModified: post.publishedAt || post.$createdAt,
    author: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      url: DOMAIN,
    },
    publisher: {
      '@type': 'Organization',
      name: BUSINESS_NAME,
      url: DOMAIN,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${DOMAIN}/bai-viet/${post.slug}`,
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${DOMAIN}${item.url}`,
    })),
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS_NAME,
    image: `${DOMAIN}/logo.png`,
    '@id': DOMAIN,
    url: DOMAIN,
    telephone: '+84908396962',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'TP. Hồ Chí Minh',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.8231,
      longitude: 106.6297,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '08:00',
      closes: '18:00',
    },
    sameAs: [
      'https://facebook.com/dichvucayxanh',
      'https://zalo.me/dichvucayxanh',
    ],
  };
}
