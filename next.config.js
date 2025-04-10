// next.config.js
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontendNav: true,
  register: true,
  aggressiveFrontEndNavCaching: true,
  cacheStartUrl: true
});

  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    swcMinify: true
  };
  
  module.exports = withPWA(nextConfig);

  