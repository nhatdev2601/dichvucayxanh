import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
             <img
                src="/logo.svg"
                alt="Cây Xanh TP.HCM Logo"
                className="h-10 w-10"
              />
              <span className="text-xl font-bold text-white">
                Cây Xanh <span className="text-primary">TP.HCM</span>
              </span>
            </div>
            <p className="text-sm mb-4">
              Dịch vụ cây xanh chuyên nghiệp tại TP.HCM. Chúng tôi cung cấp dịch vụ cưa cây, cắt tỉa cây, bứng cây và trồng cây với đội ngũ kỹ thuật giàu kinh nghiệm.
            </p>
            <div className="space-y-2">
              <p className="flex items-center text-sm">
                <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:0908396962" className="hover:text-primary transition-colors">0908 396 962</a>
              </p>
              <p className="flex items-center text-sm">
                <svg className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                TP. Hồ Chí Minh, Việt Nam
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Dịch vụ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dich-vu/dich-vu-cua-cay" className="text-sm hover:text-primary transition-colors">
                  Cưa Cây
                </Link>
              </li>
              <li>
                <Link href="/dich-vu/dich-vu-cat-tia-cay" className="text-sm hover:text-primary transition-colors">
                  Cắt Tỉa Cây
                </Link>
              </li>
              <li>
                <Link href="/dich-vu/dich-vu-bung-cay" className="text-sm hover:text-primary transition-colors">
                  Bứng Cây
                </Link>
              </li>
              <li>
                <Link href="/dich-vu/dich-vu-trong-cay" className="text-sm hover:text-primary transition-colors">
                  Trồng Cây
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Công ty</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/gioi-thieu" className="text-sm hover:text-primary transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/du-an" className="text-sm hover:text-primary transition-colors">
                  Dự án
                </Link>
              </li>
              <li>
                <Link href="/bao-gia" className="text-sm hover:text-primary transition-colors">
                  Báo giá
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="text-sm hover:text-primary transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>© {currentYear} Dịch Vụ Cây Xanh TP.HCM. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
