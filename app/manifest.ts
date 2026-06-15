import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'One More Page',
    short_name: 'One More Page',
    description: '나만의 독서 기록 & AI 독서 친구',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a2e1a',
    theme_color: '#2d4a2d',
    icons: [
      {
        src: '/icon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
