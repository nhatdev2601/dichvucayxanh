export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          href="/admin/services"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Dịch vụ</h2>
          <p className="text-gray-600">Quản lý các dịch vụ cây xanh</p>
        </a>
        <a
          href="/admin/posts"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Bài viết</h2>
          <p className="text-gray-600">Quản lý blog và tin tức</p>
        </a>
        <a
          href="/admin/projects"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Dự án</h2>
          <p className="text-gray-600">Quản lý các dự án đã thực hiện</p>
        </a>
      </div>
    </div>
  );
}
