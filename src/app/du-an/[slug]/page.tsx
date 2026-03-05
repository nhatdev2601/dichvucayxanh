import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getPublishedProjects } from '@/lib/projects';
import { getImageUrl, formatDate } from '@/lib/utils';
import JsonLdScript from '@/components/seo/JsonLdScript';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Không tìm thấy dự án',
    };
  }

  const imageUrl = project.coverImage ? getImageUrl(project.coverImage) : '';

  return {
    title: `${project.title} - ${project.location} | Dự án Dịch Vụ Cây Xanh`,
    description: project.description,
    openGraph: {
      title: `${project.title} - ${project.location}`,
      description: project.description,
      type: 'website',
      url: `https://www.dichvucayxanh.me/du-an/${project.slug}`,
      images: imageUrl ? [{ url: imageUrl, alt: project.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - ${project.location}`,
      description: project.description,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: `https://www.dichvucayxanh.me/du-an/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    creator: {
      '@type': 'LocalBusiness',
      name: 'Dịch Vụ Cây Xanh',
      url: 'https://www.dichvucayxanh.me',
    },
    locationCreated: {
      '@type': 'Place',
      name: project.location,
    },
    ...(project.gallery.length > 0 && {
      image: project.gallery.map((id: string) => getImageUrl(id)),
    }),
  };

  return (
    <>
      <JsonLdScript data={projectJsonLd} />
      <article className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{project.title}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {project.location}
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {project.completedDate ? formatDate(project.completedDate) : 'Đang thực hiện'}
              </div>
            </div>
            <p className="text-xl text-gray-700 mt-4">{project.description}</p>
          </header>

          {/* Image Gallery */}
          {project.gallery.length > 0 && (
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.gallery.map((imageId: string, index: number) => (
                <div key={imageId} className={`rounded-lg overflow-hidden ${index === 0 ? 'md:col-span-2' : ''}`}>
                  <img
                    src={getImageUrl(imageId)}
                    alt={`${project.title} - Hình ${index + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />

          {/* CTA */}
          <div className="mt-12 p-8 bg-primary-50 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Bạn có dự án tương tự?
            </h2>
            <p className="text-gray-600 mb-6">
              Chúng tôi sẵn sàng tư vấn và thực hiện dự án cây xanh cho bạn
            </p>
            <a
              href="/lien-he"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Liên hệ tư vấn
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
