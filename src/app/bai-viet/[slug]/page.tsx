import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getPublishedPosts } from '@/lib/posts';
import { getImageUrl, formatDate } from '@/lib/utils';
import JsonLdScript from '@/components/seo/JsonLdScript';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Không tìm thấy bài viết',
    };
  }

  const imageUrl = post.coverImage ? getImageUrl(post.coverImage) : '';

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: 'article',
      url: `https://dichvucayxanh.me/bai-viet/${post.slug}`,
      images: imageUrl ? [{ url: imageUrl, alt: post.title }] : [],
      publishedTime: post.$createdAt,
      modifiedTime: post.$updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: imageUrl ? [imageUrl] : [],
    },
    alternates: {
      canonical: `https://dichvucayxanh.me/bai-viet/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const imageUrl = post.coverImage ? getImageUrl(post.coverImage) : '';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.$createdAt,
    dateModified: post.$updatedAt,
    author: {
      '@type': 'Organization',
      name: 'Dịch Vụ Cây Xanh',
      url: 'https://dichvucayxanh.me',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dịch Vụ Cây Xanh',
      url: 'https://dichvucayxanh.me',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://dichvucayxanh.me/bai-viet/${post.slug}`,
    },
  };

  return (
    <>
      <JsonLdScript data={articleJsonLd} />
      <article className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Header */}
          <header className="mb-8">
            <div className="text-sm text-primary-600 font-semibold mb-2">
              {post.category}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center text-gray-500 text-sm">
              <time dateTime={post.$createdAt}>{formatDate(post.$createdAt)}</time>
            </div>
            <p className="text-xl text-gray-600 mt-4">{post.excerpt}</p>
          </header>

          {/* Featured Image */}
          {imageUrl && (
            <div className="mb-8 rounded-lg overflow-hidden">
              <img
                src={imageUrl}
                alt={post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA */}
          <div className="mt-12 p-8 bg-primary-50 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Cần tư vấn dịch vụ cây xanh?
            </h2>
            <p className="text-gray-600 mb-6">
              Liên hệ ngay với chúng tôi để được hỗ trợ tốt nhất
            </p>
            <a
              href="/lien-he"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
            >
              Liên hệ ngay
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
