/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.NODE_ENV === 'production' ? '/api/v1' : 'https://explorer.muon.net/api/v1',
    // BASE_URL: 'http://localhost:8004',
    NEXT_SHARP_PATH: "/tmp/node_modules/sharp"
  },
  compiler: {
    styledComponents: {
      ssr: true
    }
  }
}

module.exports = nextConfig
