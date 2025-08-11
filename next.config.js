/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Disable image optimization in development for better performance
    unoptimized: process.env.NODE_ENV === 'development',
    
    // Allow all image domains in development, restrict in production
    domains: process.env.NODE_ENV === 'production' ? [
      'images.unsplash.com',
      'plus.unsplash.com',
      'tailwindui.com',
      'images.pexels.com',
      'source.unsplash.com',
      'i.ibb.co',
      'res.cloudinary.com',
      'lh3.googleusercontent.com'
    ] : undefined,
    
    // Image optimization settings
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    formats: ['image/webp'],
    dangerouslyAllowSVG: true,
    
    // Remote patterns for external images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  
  // Webpack configuration
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    };
    return config;
  },
  
  // Custom headers for better caching
  async headers() {
    if (process.env.NODE_ENV === 'development') {
      return [];
    }
    
    return [
      {
        source: '/(.*)\.(jpg|jpeg|png|webp|gif|ico|svg)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
