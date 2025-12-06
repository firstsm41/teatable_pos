import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: 'export', // GitHub Pages를 위한 정적 내보내기
  images: {
    unoptimized: true, // GitHub Pages에서는 이미지 최적화 비활성화
  },
  // GitHub Pages의 basePath 설정 (저장소 이름이 teatable_pos인 경우)
  // basePath: '/teatable_pos',
  // assetPrefix: '/teatable_pos',
};

export default nextConfig;
