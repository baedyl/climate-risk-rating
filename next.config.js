/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // TODO: fix ESLint errors and remove the following line.
    ignoreDuringBuilds: true,
  },
  env: {  REACT_APP_MAPBOX_TOKEN: process.env.REACT_APP_MAPBOX_TOKEN  }
}

module.exports = nextConfig
