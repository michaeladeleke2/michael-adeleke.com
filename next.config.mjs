/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    // Static export has no image optimization server; next/image still enforces
    // explicit dimensions and lazy loading, which is what we want it for.
    unoptimized: true,
  },
  reactStrictMode: true,
}

export default nextConfig
