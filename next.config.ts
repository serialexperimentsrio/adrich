import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // allow Next/Image to use quality=100 and fallback 75
    qualities: [100, 75],
    // YouTube video thumbnails used on the project posters
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
};

export default nextConfig;
