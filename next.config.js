/** @type {import('next').NextConfig} */

const nextConfig = {}

module.exports = nextConfig


module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev.api.uiscore.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
} /** prod */

// module.exports = {
//     images: {
//       remotePatterns: [
//         {
//           protocol: 'http',
//           hostname: 'ovz1.plumstudio.m6x5m.vps.myjino.ru',
//           port: '49171',
//           pathname: '/**',
//         },
//       ],
//     },
//   }