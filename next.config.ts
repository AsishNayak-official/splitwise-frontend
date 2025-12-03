import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard', // Unconditional redirect to dashboard
        permanent: true, // Use false if it's not permanent
      },
    ]
  },
  devIndicators: false,
};

export default nextConfig;
