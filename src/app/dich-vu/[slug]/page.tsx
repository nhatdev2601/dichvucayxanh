import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceBySlug, getPublishedServices } from '@/lib/services';
import { getImageUrl } from '@/lib/utils';
import { getServiceMeta } from '@/lib/service-config';
import JsonLdScript from '@/components/seo/JsonLdScript';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const services = await getPublishedServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: 'Không tìm thấy dịch vụ' };
  }

  const imageUrl = service.coverImage ? getImageUrl(service.coverImage) : '';

  return {
    title: service.seoTitle || service.title,
    description: service.seoDescription || service.shortDescription,
    keywords: service.seoKeywords || undefined,
    openGraph: {
      title: service.seoTitle || service.title,
      description: service.seoDescription || service.shortDescription,
      type: 'website',
      url: `https://dichvucayxanh.me/dich-vu/${service.slug}`,
      images: imageUrl ? [{ url: imageUrl, alt: service.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: service.seoTitle || service.title,
      description: service.seoDescription || service.shortDescription,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: `https://dichvucayxanh.me/dich-vu/${service.slug}`,
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const displayImageId = service.featuredImage || service.coverImage;
  const imageUrl = displayImageId ? getImageUrl(displayImageId) : '';
  const imageAlt = service.altText || service.title;
  const meta = getServiceMeta(service.slug);
  const allServices = await getPublishedServices();
  const otherServices = allServices.filter((s) => s.$id !== service.$id);

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': service.schemaType || 'Service',
    name: service.title,
    description: service.shortDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Dịch Vụ Cây Xanh TP.HCM',
      url: 'https://dichvucayxanh.me',
      telephone: '+84908396962',
    },
    areaServed: {
      '@type': 'City',
      name: 'TP. Hồ Chí Minh',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
    },
    ...(imageUrl && { image: imageUrl }),
  };

  return (
    <>
      <JsonLdScript data={serviceJsonLd} />

      {/* Hero Banner */}
      <section className="relative flex flex-col justify-end overflow-hidden min-h-[320px] md:min-h-[450px]">
        {/* Background image with fixed height wrapper */}
        <div className="absolute inset-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${meta.gradient}`}></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20"></div>
        </div>

        {/* Content — grows naturally, pushes section taller on mobile */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 md:pb-12 w-full">
          {/* Breadcrumb */}
          <nav className="mb-3 hidden sm:block">
            <ol className="flex items-center flex-wrap text-sm text-white/70">
              <li><Link href="/" className="hover:text-white transition-colors">Trang chủ</Link></li>
              <li className="mx-2">/</li>
              <li><Link href="/dich-vu" className="hover:text-white transition-colors">Dịch vụ</Link></li>
              <li className="mx-2">/</li>
              <li className="text-white font-medium line-clamp-1">{service.title}</li>
            </ol>
          </nav>
          <div className="flex items-center gap-3 mb-3">
            <span className={`${meta.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
              {meta.badge}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-3 leading-tight">
            {service.title}
          </h1>
          <p className="text-sm sm:text-base md:text-xl text-gray-200 max-w-3xl leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Features Highlights */}
              {meta.features.length > 0 && (
                <div className="bg-primary/5 rounded-2xl p-6 md:p-8 mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <svg className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Điểm nổi bật
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {meta.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                        <svg className="h-5 w-5 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Featured Image */}
              {imageUrl && (
                <div className="mb-8 rounded-2xl overflow-hidden shadow-lg ring-1 ring-gray-100">
                  <img
                    src={imageUrl}
                    alt={imageAlt}
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}

              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-strong:text-gray-900"
                dangerouslySetInnerHTML={{ __html: service.content }}
              />

              {/* Image Gallery */}
              {service.images && service.images.length > 0 && (
                <div className="mt-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-1 bg-primary rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900">Hình ảnh thực tế</h2>
                    <span className="ml-auto text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {service.images.length} ảnh
                    </span>
                  </div>

                  {/* Featured first image */}
                  <div className="rounded-2xl overflow-hidden shadow-lg mb-3 group relative">
                    <img
                      src={getImageUrl(service.images[0])}
                      alt={`${service.altText || service.title} - Ảnh 1`}
                      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                      1 / {service.images.length}
                    </span>
                  </div>

                  {/* Thumbnail grid */}
                  {service.images.length > 1 && (
                    <div className={`grid gap-3 ${service.images.length === 2 ? 'grid-cols-1' : service.images.length === 3 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
                      {service.images.slice(1).map((imgId, idx) => (
                        <div key={imgId} className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                          <img
                            src={getImageUrl(imgId)}
                            alt={`${service.altText || service.title} - Ảnh ${idx + 2}`}
                            className="w-full h-auto object-contain group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <span className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {idx + 2} / {service.images?.length}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact CTA Card */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8 text-white shadow-xl sticky top-24">
                <h3 className="text-2xl font-bold mb-3">Bạn cần dịch vụ này?</h3>
                <p className="text-green-100 mb-6">
                  Liên hệ ngay để nhận tư vấn miễn phí và báo giá chi tiết
                </p>

                <a
                  href="tel:0908396962"
                  className="w-full inline-flex items-center justify-center px-6 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg mb-4"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  0908 396 962
                </a>

                <Link
                  href="/lien-he"
                  className="w-full inline-flex items-center justify-center px-6 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-primary transition-all duration-300 mb-4"
                >
                  Gửi yêu cầu tư vấn
                </Link>

                <Link
                  href="/bao-gia"
                  className="w-full inline-flex items-center justify-center px-6 py-4 bg-white/20 text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-300"
                >
                  Xem bảng báo giá
                </Link>
              </div>

              {/* Other Services */}
              {otherServices.length > 0 && (
                <div className="mt-8 bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Dịch vụ khác</h3>
                  <div className="space-y-3">
                    {otherServices.map((s) => {
                      const sMeta = getServiceMeta(s.slug);
                      return (
                        <Link
                          key={s.$id}
                          href={`/dich-vu/${s.slug}`}
                          className="flex items-center gap-3 p-3 bg-white rounded-xl hover:shadow-md transition-all group"
                        >
                          <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sMeta.icon} />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-sm">
                              {s.title}
                            </p>
                            <span className={`${sMeta.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
                              {sMeta.badge}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Sẵn sàng sử dụng dịch vụ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Liên hệ ngay để được tư vấn miễn phí và nhận báo giá tốt nhất
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0908396962"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-600 transition-all shadow-lg"
            >
              Gọi ngay: 0908 396 962
            </a>
            <Link
              href="/dich-vu"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all"
            >
              Xem tất cả dịch vụ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
