/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com', 'img.clerk.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '7mb',
    },
  },
};

export default nextConfig;
