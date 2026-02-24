'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    async function checkAuth() {
      // Skip auth check for login page
      if (pathname === '/admin/login') {
        setIsLoading(false);
        return;
      }

      try {
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Auth timeout')), 5000)
        );
        const user = await Promise.race([getCurrentUser(), timeoutPromise]);

        if (cancelled) return;

        if (!user) {
          router.replace('/admin/login');
        } else {
          setIsAuthenticated(true);
        }
      } catch {
        if (!cancelled) {
          router.replace('/admin/login');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }
    checkAuth();

    return () => { cancelled = true; };
  }, [router, pathname]);

  // Login page doesn't need auth wrapper
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex gap-4">
            <a href="/admin" className="text-gray-600 hover:text-primary-600">Dashboard</a>
            <a href="/admin/services" className="text-gray-600 hover:text-primary-600">Dịch vụ</a>
            <a href="/admin/posts" className="text-gray-600 hover:text-primary-600">Bài viết</a>
            <a href="/admin/projects" className="text-gray-600 hover:text-primary-600">Dự án</a>
            <button 
              onClick={async () => {
                const { logout } = await import('@/lib/auth');
                await logout();
                router.push('/admin/login');
              }}
              className="text-red-600 hover:text-red-700"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}
