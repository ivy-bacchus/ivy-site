import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/ivy-site',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/ivy-site',
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
