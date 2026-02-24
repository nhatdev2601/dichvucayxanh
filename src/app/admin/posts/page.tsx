'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPosts, deletePost } from '@/lib/posts';
import { Post } from '@/types';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    setIsLoading(true);
    const data = await getAllPosts();
    setPosts(data);
    setIsLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return;
    
    try {
      await deletePost(id);
      alert('Xóa thành công!');
      loadPosts();
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Lỗi khi xóa bài viết');
    }
  }

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý bài viết</h1>
        <a
          href="/admin/posts/new"
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
        >
          Thêm bài viết mới
        </a>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ảnh Cover</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiêu đề</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Danh mục</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tags</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày đăng</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.$id}>
                <td className="px-6 py-4">
                  {post.coverImage && (
                    <img
                      src={`https://sgp.cloud.appwrite.io/v1/storage/buckets/69843fba001b3a343ee8/files/${post.coverImage}/view?project=6984107f001d794d3c29&width=100&height=100`}
                      alt={post.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{post.title}</div>
                  <div className="text-xs text-gray-500">{post.slug}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">{post.category}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {post.tags?.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('vi-VN') : '-'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    post.isPublished 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {post.isPublished ? 'Đã xuất bản' : 'Nháp'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/posts/${post.$id}/edit`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(post.$id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
