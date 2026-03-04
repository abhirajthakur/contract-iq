import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/api/analyze",
        destination: "http://localhost:8000/api/analyze",
        permanent: true
      },
    ]
  },
};

export default nextConfig;
