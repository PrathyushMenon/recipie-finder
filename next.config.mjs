/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['spoonacular.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'spoonacular.com',
        pathname: '**',
      },
    ],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
