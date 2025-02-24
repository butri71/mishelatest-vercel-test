/** @type {import('next').NextConfig} */
const nextConfig = {
  // added on 8 Jan 25 as SEO optimization
  async headers() {
    return [
      {
        source: '/:lang/recipes/:slug/:id',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image(.*)', // Matches image optimization requests
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable, stale-while-revalidate=86400' }
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          }
        ],
      },
    ]
  },
  images: {
    // Choose based on your hosting
    // unoptimized: true,  // Keep if needed
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // Cache images for 1 year 
  },
  // Optional performance optimizations
  experimental: {
    optimizePackageImports: ['@/components'],    
  },
}

export default nextConfig;
  