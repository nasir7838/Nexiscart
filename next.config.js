/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static exports
  distDir: 'out', // Output directory for the static export
  trailingSlash: true, // Add trailing slashes to all paths
  images: {
    unoptimized: true, // Disable Image Optimization API for static export
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
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
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

module.exports = nextConfig;
