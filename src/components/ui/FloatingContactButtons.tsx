'use client';

export default function FloatingContactButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
      {/* Phone Button */}
      <a
        href="tel:0982675730"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse-ring"
        aria-label="Gọi điện thoại"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        {/* Tooltip */}
        <span className="absolute right-full mr-3 hidden group-hover:block whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-lg">
          0982675730
        </span>
      </a>

      {/* Zalo Button */}
      <a
        href="https://zalo.me/0982675730"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#0068FF] text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Chat Zalo"
      >
        <img src="/zalo-icon.svg" alt="Zalo" className="h-8 w-8" />
        {/* Tooltip */}
        <span className="absolute right-full mr-3 hidden group-hover:block whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-lg">
          Chat Zalo
        </span>
      </a>
    </div>
  );
}
