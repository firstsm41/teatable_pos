import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Vercel 배포를 위해 output: 'export' 제거 (서버 기능 필요)
};

export default nextConfig;
