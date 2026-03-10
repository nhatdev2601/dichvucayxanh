import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import JsonLdScript from "@/components/seo/JsonLdScript";
import AnalyticsEvents from "@/components/analytics/AnalyticsEvents";

const inter = Inter({ 
  subsets: ["latin", "vietnamese"],
  display: 'swap',
  variable: '--font-geist-sans'
});

export const metadata: Metadata = {
  title: {
    default: "Dịch Vụ Cây Xanh TP.HCM | Cưa Cây - Cắt Tỉa - Bứng Cây - Trồng Cây",
    template: "%s | Dịch Vụ Cây Xanh TP.HCM"
  },
  description: "Dịch vụ cây xanh chuyên nghiệp tại TP.HCM: cưa cây, cắt tỉa cây, bứng cây, trồng cây. Đội ngũ kỹ thuật giàu kinh nghiệm, giá cả cạnh tranh. Hotline: 0982675730",
  keywords: ["dịch vụ cây xanh", "cưa cây", "cắt tỉa cây", "bứng cây", "trồng cây", "dịch vụ cây xanh TP.HCM", "Sài Gòn"],
  authors: [{ name: "Dịch Vụ Cây Xanh" }],
  creator: "Dịch Vụ Cây Xanh",
  publisher: "Dịch Vụ Cây Xanh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.dichvucayxanh.me'),
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.svg',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Dịch Vụ Cây Xanh TP.HCM | Cưa Cây - Cắt Tỉa - Bứng Cây - Trồng Cây",
    description: "Dịch vụ cây xanh chuyên nghiệp tại TP.HCM: cưa cây, cắt tỉa cây, bứng cây, trồng cây",
    url: 'https://www.dichvucayxanh.me',
    siteName: 'Dịch Vụ Cây Xanh',
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dịch Vụ Cây Xanh TP.HCM",
    description: "Dịch vụ cưa cây, cắt tỉa cây, bứng cây, trồng cây chuyên nghiệp tại TP.HCM",
  },
  verification: {
    google: 'KHVJbwnJPl5iKRFur7C-rQaJDaXvdZnx_NpEMGpsPfY',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Dịch Vụ Cây Xanh',
  description: 'Dịch vụ cây xanh chuyên nghiệp tại TP.HCM',
  url: 'https://www.dichvucayxanh.me',
  telephone: '+84908396962',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'VN',
    addressLocality: 'TP. Hồ Chí Minh',
  },
  areaServed: {
    '@type': 'City',
    name: 'TP. Hồ Chí Minh',
  },
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '150',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TV4Q87N9PS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TV4Q87N9PS');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AnalyticsEvents />
        <JsonLdScript data={organizationJsonLd} />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
