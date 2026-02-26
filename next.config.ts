import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    /*O next reclama de acessar um servidor de imagem
    local então deve usar essa opção para ignorar*/
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'images.dev.uaiexplorer.local',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
