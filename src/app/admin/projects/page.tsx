'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllProjects, deleteProject } from '@/lib/projects';
import { Project } from '@/types';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setIsLoading(true);
    const data = await getAllProjects();
    setProjects(data);
    setIsLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Bạn có chắc muốn xóa dự án này?')) return;
    
    try {
      await deleteProject(id);
      alert('Xóa thành công!');
      loadProjects();
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Lỗi khi xóa dự án');
    }
  }

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý dự án</h1>
        <Link
          href="/admin/projects/new"
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Thêm dự án mới
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ảnh Cover</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiêu đề</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Địa điểm</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hoàn thành</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project.$id}>
                <td className="px-6 py-4">
                  {project.coverImage && (
                    <img
                      src={`https://sgp.cloud.appwrite.io/v1/storage/buckets/69843fba001b3a343ee8/files/${project.coverImage}/view?project=6984107f001d794d3c29&width=100&height=100`}
                      alt={project.title}
                      className="w-16 h-12 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{project.title}</div>
                  <div className="text-xs text-gray-500">{project.slug}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">{project.location}</td>
                <td className="px-6 py-4 text-gray-600 text-sm">
                  {project.completedDate ? new Date(project.completedDate).toLocaleDateString('vi-VN') : '-'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    project.isPublished 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {project.isPublished ? 'Đã xuất bản' : 'Nháp'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/projects/${project.$id}/edit`}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(project.$id)}
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
