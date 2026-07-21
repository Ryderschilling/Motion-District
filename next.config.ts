import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Videos are served from /public for local dev + v1.
  // Before real launch: move loops to Mux/Cloudflare Stream and swap src URLs in lib/videos.ts.
};

export default nextConfig;
