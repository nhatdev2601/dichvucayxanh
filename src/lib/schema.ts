export interface JsonLd {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

export function generateLocalBusinessSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Dịch Vụ Cây Xanh TP.HCM',
    image: 'https://dichvucayxanh.com/og-image.jpg',
    '@id': 'https://dichvucayxanh.com',
    url: 'https://dichvucayxanh.com',
    telephone: '+84908396962',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'TP. Hồ Chí Minh',
      addressLocality: 'Hồ Chí Minh',
      addressRegion: 'TP.HCM',
      postalCode: '700000',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.8231,
      longitude: 106.6297,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '07:00',
        closes: '18:00',
      },
    ],
    sameAs: [
      'https://facebook.com/dichvucayxanh',
      'https://zalo.me/0908396962',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '150',
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  price?: string;
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Dịch Vụ Cây Xanh TP.HCM',
      telephone: '+84908396962',
    },
    ...(service.price && { offers: { '@type': 'Offer', price: service.price } }),
  };
}
