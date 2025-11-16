/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {},
  async redirects() {
    // Add slug change redirects here.
    return [];
  }
};

module.exports = nextConfig;

