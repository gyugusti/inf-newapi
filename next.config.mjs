/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  reactStrictMode: true,
  trailingSlash: true, // Menjaga konsistensi URL dengan slash di akhir
  redirects: async () => [
    {
      source: '/',
      destination: '/dashboards/crm',
      permanent: true
    }
  ],
  experimental: {
    optimizeCss: false // Mengoptimalkan CSS agar tidak ada preload yang berlebihan
  }
}

export default nextConfig
