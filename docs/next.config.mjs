/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/androidhelper/llms-full.txt',
        destination: '/llms-full.txt',
      },
      {
        source: '/androidhelper/llms.txt',
        destination: '/llms.txt',
      },
      {
        source: '/androidhelper/llms-full.md',
        destination: '/llms-full.md',
      },
      {
        source: '/androidhelper/llms.md',
        destination: '/llms.md',
      },
    ];
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
