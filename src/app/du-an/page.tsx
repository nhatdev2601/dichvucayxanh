import { Metadata } from 'next';
import Image from 'next/image';
import { getPublishedProjects } from '@/lib/projects';
import { getImageUrl, formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Dự án đã thực hiện',
  description: 'Xem các dự án cây xanh, cảnh quan đã hoàn thành của chúng tôi tại TP.HCM. Hàng trăm khách hàng hài lòng với chất lượng dịch vụ.',
  openGraph: {
    title: 'Dự án đã thực hiện | Dịch Vụ Cây Xanh TP.HCM',
    description: 'Xem các dự án cây xanh, cảnh quan đã hoàn thành của chúng tôi',
  },
  alternates: {
    canonical: '/du-an',
  },
};

export default async function DuAnPage() {
  const projects = await getPublishedProjects();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-black uppercase mb-4">
            Dự án tiêu biểu
          </h1>
          <p className="text-xl md:text-2xl font-light">
            Những công trình chúng tôi đã thực hiện
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <a
                key={project.$id}
                href={`/du-an/${project.slug}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                {project.coverImage && (
                  <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={getImageUrl(project.coverImage)}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      quality={75}
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition">
                    {project.title}
                  </h2>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {project.location}
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center text-sm">
                    <time className="text-gray-500" dateTime={project.completedDate || ''}>
                      {project.completedDate ? formatDate(project.completedDate) : 'Đang thực hiện'}
                    </time>
                    <span className="text-primary-600 font-semibold group-hover:underline">
                      Xem chi tiết →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Chưa có dự án nào được xuất bản</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
