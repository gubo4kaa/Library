/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dev.api.uiscore.io",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
