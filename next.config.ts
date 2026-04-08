import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // allow Next/Image to use quality=100 and fallback 75
    qualities: [100, 75],
  },
};

export default nextConfig;
