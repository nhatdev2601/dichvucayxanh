import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Giới thiệu',
  description: 'Dịch vụ cây xanh uy tín tại TP.HCM với hơn 10 năm kinh nghiệm. Đội ngũ chuyên nghiệp, tận tâm, cam kết chất lượng dịch vụ tốt nhất.',
  openGraph: {
    title: 'Giới thiệu | Dịch Vụ Cây Xanh TP.HCM',
    description: 'Dịch vụ cây xanh uy tín tại TP.HCM với hơn 10 năm kinh nghiệm',
  },
};

export default function GioiThieuPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-black uppercase mb-4">
            Về chúng tôi
          </h1>
          <p className="text-xl md:text-2xl font-light">
            Đối tác tin cậy cho không gian xanh của bạn
          </p>
        </div>
      </section>

      {/* Company Info Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Dịch vụ cây xanh chuyên nghiệp tại TP.HCM
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Với hơn <strong className="text-primary">10 năm kinh nghiệm</strong> trong lĩnh vực chăm sóc và 
                duy trì cây xanh, chúng tôi tự hào là đơn vị cung cấp dịch vụ cây xanh hàng đầu tại 
                TP. Hồ Chí Minh.
              </p>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                Đội ngũ kỹ thuật viên của chúng tôi được đào tạo bài bản, am hiểu sâu sắc về đặc tính 
                sinh trưởng của từng loại cây, từ đó đưa ra giải pháp chăm sóc tối ưu nhất.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Chúng tôi cam kết mang đến cho khách hàng dịch vụ chất lượng cao nhất với mức giá hợp lý, 
                cùng với chế độ bảo hành và chăm sóc sau dịch vụ chu đáo.
              </p>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=2340&auto=format&fit=crop"
                alt="Đội ngũ dịch vụ cây xanh"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl md:text-6xl font-black mb-2">{stat.number}</div>
                <div className="text-lg md:text-xl text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Giá trị cốt lõi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những giá trị mà chúng tôi luôn hướng đến trong mọi dự án
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="h-16 w-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <div className="text-primary">{value.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Đội ngũ chuyên nghiệp
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những con người tâm huyết và giàu kinh nghiệm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Bắt đầu dự án của bạn ngay hôm nay
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Hãy để chúng tôi biến không gian của bạn trở nên xanh mát và tươi đẹp hơn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0982675730"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-primary bg-white rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0982675730
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

const stats = [
  { number: '10+', label: 'Năm kinh nghiệm' },
  { number: '500+', label: 'Dự án hoàn thành' },
  { number: '300+', label: 'Khách hàng hài lòng' },
  { number: '24/7', label: 'Hỗ trợ khách hàng' },
];

const values = [
  {
    title: 'Chất lượng',
    description: 'Cam kết mang đến chất lượng dịch vụ tốt nhất, sử dụng thiết bị hiện đại và quy trình chuyên nghiệp.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Tận tâm',
    description: 'Luôn lắng nghe và thấu hiểu nhu cầu của khách hàng, tư vấn giải pháp phù hợp nhất cho từng trường hợp.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    title: 'Uy tín',
    description: 'Xây dựng niềm tin với khách hàng thông qua sự minh bạch, trung thực và trách nhiệm trong công việc.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Chuyên nghiệp',
    description: 'Đội ngũ được đào tạo bài bản, làm việc theo quy trình chuẩn, đảm bảo tiến độ và chất lượng công việc.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Giá cả hợp lý',
    description: 'Mức giá cạnh tranh nhất thị trường, phù hợp với túi tiền của mọi khách hàng mà vẫn đảm bảo chất lượng.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'Bảo hành dài hạn',
    description: 'Cam kết bảo hành và chăm sóc sau dịch vụ, sẵn sàng hỗ trợ khách hàng 24/7 khi cần thiết.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const team = [
  {
    name: 'Nguyễn Văn A',
    position: 'Giám đốc điều hành',
    description: '15 năm kinh nghiệm trong lĩnh vực cây xanh và cảnh quan',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2340&auto=format&fit=crop',
  },
  {
    name: 'Trần Thị B',
    position: 'Trưởng phòng kỹ thuật',
    description: 'Chuyên gia về chăm sóc và điều trị bệnh cây xanh',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2340&auto=format&fit=crop',
  },
  {
    name: 'Lê Văn C',
    position: 'Giám sát thi công',
    description: '10 năm kinh nghiệm thiết kế và thi công sân vườn',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2340&auto=format&fit=crop',
  },
];
