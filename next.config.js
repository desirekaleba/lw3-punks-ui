/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["assets.unmarshal.io", "unmarshal.mypinata.cloud"],
  },
};

module.exports = nextConfig;
