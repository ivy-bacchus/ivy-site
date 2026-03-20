import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/ivy-site',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
