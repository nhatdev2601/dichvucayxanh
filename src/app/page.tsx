import Image from 'next/image';
import Link from 'next/link';
import JsonLdScript from '@/components/seo/JsonLdScript';
import { generateLocalBusinessSchema } from '@/lib/schema';
import { getPublishedServices } from '@/lib/services';
import { getImageUrl } from '@/lib/utils';
import { getServiceMeta } from '@/lib/service-config';

export const revalidate = 60;

export default async function HomePage() {
  const services = await getPublishedServices();

  return (
    <>
      <JsonLdScript data={generateLocalBusinessSchema()} />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2532&auto=format&fit=crop"
            alt="Dich vu cay xanh TP.HCM"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight mb-6 drop-shadow-lg">
            {"DỊCH VỤ CÂY XANH"}
            <span className="block text-primary mt-2 drop-shadow-md">{"TP. HỒ CHÍ MINH"}</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto font-medium drop-shadow-md">
            {"Chuyên cưa cây, cắt tỉa, bứng cây và trồng cây"}
            <span className="block mt-2">{"Đội ngũ chuyên nghiệp - Giá cả cạnh tranh"}</span>
          </p>

          <div className="flex items-center justify-center mb-8 text-2xl sm:text-3xl font-bold text-white">
            <svg className="h-8 w-8 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <a href="tel:0982675730" className="hover:text-primary transition-colors">
              0982675730
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/bao-gia"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-primary rounded-full hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              {"Nhận báo giá miễn phí"}
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/dich-vu"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {"Xem dịch vụ"}
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">
              {"DỊCH VỤ CỦA CHÚNG TÔI"}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {"4 Dịch Vụ Chủ Đạo"}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {"Giải pháp toàn diện cho mọi nhu cầu về cây xanh tại TP.HCM"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.length > 0 ? (
              services.map((service) => {
                const meta = getServiceMeta(service.slug);
                const displayImageId =  service.coverImage;
                const imageUrl = displayImageId ? getImageUrl(displayImageId) : '';
                const imageAlt = service.altText || service.title;

                return (
                  <div
                    key={service.$id}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                  >
                    <div className="relative h-56 overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={imageAlt}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${meta.gradient} flex items-center justify-center`}>
                          <svg className="h-20 w-20 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={meta.icon} />
                          </svg>
                        </div>
                      )}
                      <div className="absolute top-4 right-4">
                        <span className={`${meta.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
                          {meta.badge}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={meta.icon} />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                        {service.shortDescription}
                      </p>

                      {meta.features.length > 0 && (
                        <ul className="space-y-2 mb-5">
                          {meta.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-700">
                              <svg className="h-4 w-4 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <p className="text-lg font-bold text-gray-900">{"Liên hệ để báo giá"}</p>
                      </div>

                      <Link
                        href={`/dich-vu/${service.slug}`}
                        className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-600 transition-all duration-300 group-hover:shadow-lg"
                      >
                        {"Tìm Hiểu Thêm"}
                        <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              staticServices.map((service, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                >
                  <div className="relative h-56 overflow-hidden">
                    <div className={`w-full h-full bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                      <svg className="h-20 w-20 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.iconPath} />
                      </svg>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className={`${service.badgeColor} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
                        {service.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                    <ul className="space-y-2 mb-5">
                      {service.features.map((f, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <svg className="h-4 w-4 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-lg font-bold text-gray-900 mb-4">{"Liên hệ để báo giá"}</p>
                      <Link
                        href="/dich-vu"
                        className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-600 transition-all duration-300"
                      >
                        {"Tìm Hiểu Thêm"}
                        <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/dich-vu"
              className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-primary rounded-full hover:bg-primary-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              {"Xem tất cả dịch vụ"}
              <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">
              {"TẠI SAO CHỌN CHÚNG TÔI"}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {"Đối tác tin cậy cho cây xanh"}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {"Cam kết mang đến dịch vụ chất lượng cao nhất"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-primary/5 transition-colors duration-300">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white mb-6 shadow-lg">
                  <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.iconPath} />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-primary/10 text-primary font-semibold rounded-full text-sm mb-4">
              {"QUY TRÌNH LÀM VIỆC"}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {"Đơn giản & Nhanh chóng"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold mb-4 shadow-lg">
                  {index + 1}
                </div>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-primary/20"></div>
                )}
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {"Sẵn sàng làm đẹp không gian xanh?"}
          </h2>
          <p className="text-xl mb-8 text-green-100">
            {"Liên hệ ngay để được tư vấn miễn phí và nhận báo giá tốt nhất"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0982675730"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-primary bg-white rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {"Gọi ngay: 0982675730"}
            </a>
            <Link
              href="/lien-he"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-transparent border-2 border-white rounded-full hover:bg-white hover:text-primary transition-all duration-300"
            >
              {"Gửi yêu cầu tư vấn"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

const staticServices = [
  {
    title: 'Cưa Cây',
    description: 'Dịch vụ cưa cây an toàn, chuyên nghiệp cho cây to, cây già hoặc cây cản trở công trình.',
    badge: 'An toàn',
    badgeColor: 'bg-green-500',
    gradient: 'from-green-500 to-green-700',
    iconPath: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z',
    features: ['Cưa cây to an toàn', 'Thiết bị chuyên nghiệp', 'Đội ngũ có kinh nghiệm', 'Dọn dẹp sạch sẽ'],
  },
  {
    title: 'Cắt Tỉa Cây',
    description: 'Cắt tỉa cây chuyên nghiệp để cây phát triển khỏe mạnh, đẹp hơn và an toàn.',
    badge: 'Phổ biến',
    badgeColor: 'bg-blue-500',
    gradient: 'from-blue-500 to-blue-700',
    iconPath: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z',
    features: ['Cắt tỉa đúng kỹ thuật', 'Tạo dáng cây đẹp', 'Kích thích ra lá mới', 'Loại bỏ cành bệnh'],
  },
  {
    title: 'Bứng Cây',
    description: 'Dịch vụ bứng cây chuyển vị trí an toàn, đảm bảo cây sống khỏe sau khi di chuyển.',
    badge: 'Chuyên nghiệp',
    badgeColor: 'bg-orange-500',
    gradient: 'from-orange-500 to-orange-700',
    iconPath: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
    features: ['Bứng cây không làm hại rễ', 'Vận chuyển cẩn thận', 'Bảo quản cây tốt', 'Tỷ lệ sống cao'],
  },
  {
    title: 'Trồng Cây',
    description: 'Dịch vụ trồng cây mới đúng kỹ thuật, chăm sóc ban đầu để cây phát triển tốt nhất.',
    badge: 'Cơ bản',
    badgeColor: 'bg-emerald-500',
    gradient: 'from-emerald-500 to-emerald-700',
    iconPath: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    features: ['Trồng đúng kỹ thuật', 'Chọn vị trí phù hợp', 'Bón phân ban đầu', 'Hướng dẫn chăm sóc'],
  },
];

const whyChooseUs = [
  {
    title: '10+ Năm kinh nghiệm',
    description: 'Đội ngũ kỹ thuật viên giàu kinh nghiệm, được đào tạo bài bản về chăm sóc cây xanh.',
    iconPath: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
  },
  {
    title: 'Giá cả cạnh tranh',
    description: 'Cam kết mức giá hợp lý nhất thị trường với chất lượng dịch vụ tốt nhất.',
    iconPath: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  {
    title: 'An toàn & Bảo hành',
    description: 'Cam kết an toàn tuyệt đối trong thi công và bảo hành dài hạn sau dịch vụ.',
    iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
  },
];

const processSteps = [
  { title: 'Liên hệ', description: 'Gọi điện hoặc gửi yêu cầu qua form liên hệ' },
  { title: 'Khảo sát', description: 'Đội ngũ đến khảo sát và tư vấn tại chỗ' },
  { title: 'Báo giá', description: 'Báo giá chi tiết, minh bạch và hợp lý' },
  { title: 'Thi công', description: 'Tiến hành thi công chuyên nghiệp, sạch sẽ' },
];
