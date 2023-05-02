/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // TODO: fix ESLint errors and remove the following line.
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
