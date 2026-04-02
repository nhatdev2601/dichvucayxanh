import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'cloud.appwrite.io', 'sgp.cloud.appwrite.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cloud.appwrite.io',
      },
      {
        protocol: 'https',
        hostname: 'sgp.cloud.appwrite.io',
      },
    ],
  },
};

export default nextConfig;
