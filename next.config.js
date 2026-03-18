/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  compress: true,
  swcMinify: true,
};

module.exports = nextConfig;
