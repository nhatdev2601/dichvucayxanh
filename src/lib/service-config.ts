// Service-specific metadata for the 4 core services
// Maps service slugs to their visual configuration (badges, icons, features)

export interface ServiceMeta {
  badge: string;
  badgeColor: string;
  icon: string; // SVG path
  features: string[];
  gradient: string;
}

// Icon SVG paths
const ICONS = {
  cuaCay: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z',
  catTia: 'M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z',
  bungCay: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4',
  trongCay: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
};

const serviceConfigMap: Record<string, ServiceMeta> = {
  'dich-vu-cua-cay': {
    badge: 'An toàn',
    badgeColor: 'bg-green-500',
    icon: ICONS.cuaCay,
    features: [
      'Cưa cây to an toàn',
      'Thiết bị chuyên nghiệp',
      'Đội ngũ có kinh nghiệm',
      'Dọn dẹp sạch sẽ',
    ],
    gradient: 'from-green-500 to-green-700',
  },
  'dich-vu-cat-tia-cay': {
    badge: 'Phổ biến',
    badgeColor: 'bg-blue-500',
    icon: ICONS.catTia,
    features: [
      'Cắt tỉa đúng kỹ thuật',
      'Tạo dáng cây đẹp',
      'Kích thích ra lá mới',
      'Loại bỏ cành bệnh',
    ],
    gradient: 'from-blue-500 to-blue-700',
  },
  'dich-vu-bung-cay': {
    badge: 'Chuyên nghiệp',
    badgeColor: 'bg-orange-500',
    icon: ICONS.bungCay,
    features: [
      'Bứng cây không làm hại rễ',
      'Vận chuyển cẩn thận',
      'Bảo quản cây tốt',
      'Tỷ lệ sống cao',
    ],
    gradient: 'from-orange-500 to-orange-700',
  },
  'dich-vu-trong-cay': {
    badge: 'Cơ bản',
    badgeColor: 'bg-emerald-500',
    icon: ICONS.trongCay,
    features: [
      'Trồng đúng kỹ thuật',
      'Chọn vị trí phù hợp',
      'Bón phân ban đầu',
      'Hướng dẫn chăm sóc',
    ],
    gradient: 'from-emerald-500 to-emerald-700',
  },
};

// Fallback for services not in the config
const defaultServiceMeta: ServiceMeta = {
  badge: 'Dịch vụ',
  badgeColor: 'bg-gray-500',
  icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  features: [],
  gradient: 'from-green-500 to-green-700',
};

export function getServiceMeta(slug: string): ServiceMeta {
  return serviceConfigMap[slug] || defaultServiceMeta;
}

export function getAllServiceMetas(): Record<string, ServiceMeta> {
  return serviceConfigMap;
}
