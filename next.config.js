/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // Enables Next.js App Router
  },
  webpack: (config) => {
    config.externals.push({ formidable: "commonjs formidable", fs: "commonjs fs" });
    return config;
  },
};

export default nextConfig;