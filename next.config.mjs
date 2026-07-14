/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: process.env.API_URL ? `${process.env.API_URL}/:path*` : 'http://rxsoft-backend:8080/:path*',
      },
    ];
  },
};

export default nextConfig;
