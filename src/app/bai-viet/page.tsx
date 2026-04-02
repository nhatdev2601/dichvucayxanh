import { Metadata } from 'next';
import Image from 'next/image';
import { getPublishedPosts } from '@/lib/posts';
import { getImageUrl, formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Bài viết & Tin tức',
  description: 'Tin tức, kinh nghiệm và kiến thức về chăm sóc cây xanh, thiết kế cảnh quan và xu hướng không gian xanh',
  alternates: {
    canonical: '/bai-viet',
  },
};

export default async function BaiVietPage() {
  const posts = await getPublishedPosts();

  // Group posts by category
  const categories = [...new Set(posts.map(p => p.category))];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[300px] flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bài viết & Tin tức
          </h1>
          <p className="text-lg md:text-xl">
            Kiến thức và kinh nghiệm về cây xanh
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <a
                key={post.$id}
                href={`/bai-viet/${post.slug}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
              >
                {post.coverImage && (
                  <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={getImageUrl(post.coverImage)}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      quality={75}
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="text-xs text-primary-600 font-semibold mb-2">
                    {post.category}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <time dateTime={post.$createdAt}>
                      {formatDate(post.$createdAt)}
                    </time>
                    <span className="text-primary-600 font-semibold group-hover:underline">
                      Đọc thêm →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Chưa có bài viết nào được xuất bản</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
