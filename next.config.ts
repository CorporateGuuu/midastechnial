import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent data collection for API routes
  output: 'standalone', // Optional for better serverless
};

export default nextConfig;
