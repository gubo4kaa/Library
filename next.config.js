/** @type {import('next').NextConfig} */

const nextConfig = {}

module.exports = nextConfig


module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '8000',
          pathname: '/**',
        },
      ],
    },
  }