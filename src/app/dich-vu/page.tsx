import { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedServices } from '@/lib/services';
import { getImageUrl } from '@/lib/utils';
import { getServiceMeta } from '@/lib/service-config';
import JsonLdScript from '@/components/seo/JsonLdScript';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Dịch vụ cây xanh chuyên nghiệp | Cưa cây, Cắt tỉa, Bứng cây, Trồng cây',
  description: 'Cung cấp 4 dịch vụ cây xanh chủ đạo: cưa cây, cắt tỉa cây, bứng cây và trồng cây chuyên nghiệp tại TP.HCM. Đội ngũ kỹ thuật giàu kinh nghiệm, giá cả hợp lý.',
  openGraph: {
    title: 'Dịch vụ cây xanh chuyên nghiệp | Dịch Vụ Cây Xanh TP.HCM',
    description: 'Cung cấp dịch vụ cưa cây, cắt tỉa, bứng cây và trồng cây chuyên nghiệp tại TP.HCM',
  },
  alternates: {
    canonical: '/dich-vu',
  },
};

export default async function DichVuPage() {
  const services = await getPublishedServices();

  const servicesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Dịch vụ cây xanh TP.HCM',
    description: '4 dịch vụ cây xanh chủ đạo tại TP.HCM',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.shortDescription,
        url: `https://www.dichvucayxanh.me/dich-vu/${service.slug}`,
        provider: {
          '@type': 'LocalBusiness',
          name: 'Dịch Vụ Cây Xanh TP.HCM',
        },
      },
    })),
  };

  return (
    <>
      <JsonLdScript data={servicesJsonLd} />

      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-semibold mb-4 backdrop-blur-sm">
            DỊCH VỤ CHUYÊN NGHIỆP
          </span>
          <h1 className="text-5xl md:text-6xl font-black uppercase mb-4">
            Dịch Vụ Cây Xanh
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto">
            4 dịch vụ chủ đạo đáp ứng mọi nhu cầu về cây xanh tại TP.HCM
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service) => {
              const meta = getServiceMeta(service.slug);
              const displayImageId = service.coverImage;
              const imageUrl = displayImageId ? getImageUrl(displayImageId) : '';
              const imageAlt = service.altText || service.title;

              return (
                <div
                  key={service.$id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${meta.gradient} flex items-center justify-center`}>
                        <svg className="h-24 w-24 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={meta.icon} />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className={`${meta.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
                        {meta.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={meta.icon} />
                        </svg>
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {service.title}
                      </h2>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    {/* Features */}
                    {meta.features.length > 0 && (
                      <ul className="space-y-2.5 mb-6">
                        {meta.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700">
                            <svg className="h-5 w-5 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="pt-5 border-t border-gray-100 flex items-center justify-between">
                      <p className="text-lg font-bold text-gray-900">Liên hệ để báo giá</p>
                    </div>

                    <Link
                      href={`/dich-vu/${service.slug}`}
                      className="mt-5 w-full inline-flex items-center justify-center px-6 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary-600 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Tìm Hiểu Thêm
                      <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {services.length === 0 && (
            <div className="text-center py-16">
              <svg className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="text-gray-500 text-xl">Chưa có dịch vụ nào được xuất bản</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bạn cần tư vấn dịch vụ cây xanh?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Liên hệ ngay với chúng tôi để được hỗ trợ và báo giá chi tiết
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0982675730"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-primary bg-white rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0982675730
            </a>
            <Link
              href="/lien-he"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white border-2 border-white rounded-full hover:bg-white hover:text-primary transition-all duration-300"
            >
              Gửi yêu cầu tư vấn
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
