/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'tailwindui.com',
      'images.pexels.com',
      'source.unsplash.com',
      'i.ibb.co',
      'res.cloudinary.com',
      'lh3.googleusercontent.com'
    ],
  },
  // Webpack configuration
  webpack: (config) => {
    return config;
  },
  // Custom headers for better caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

// Disable TypeScript and ESLint during build
process.env.NEXT_DISABLE_ESLINT = 'true';
process.env.NEXT_DISABLE_TYPECHECKING = 'true';

module.exports = nextConfig;
