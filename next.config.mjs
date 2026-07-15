/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: process.env.API_URL ? `${process.env.API_URL}/ehealthwares/:path*` : 'http://api.ehealthwares.com/ehealthwares/:path*',
      },
    ];
  },
};

export default nextConfig;
