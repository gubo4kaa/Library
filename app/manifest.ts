import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Library',
    short_name: 'Library',
    description: 'Your best service for selecting resources for productive work, or just for finding inspiration',
    start_url: 'https://library.uiscore.io',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '96x96',
        type: 'image/x-icon',
      },
    ],
  }
}