import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [],
  // Set output file tracing root to silence workspace warning
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
