/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/androidhelper',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
