import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Disable image optimization since this is a static site
    minimumCacheTTL: 60 * 60 * 24 * 365, // Cache images for 1 year
    formats: ['image/webp'], // Only use WebP format to reduce variants
  },
};

export default nextConfig;
