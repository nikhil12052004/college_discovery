import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack warning fix
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;