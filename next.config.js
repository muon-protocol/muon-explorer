/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.NODE_ENV === 'production' ? 'http://idealmoney.io:5000' : 'http://127.0.0.1:5000',
    NEXT_SHARP_PATH: "/tmp/node_modules/sharp"
  }
}

module.exports = nextConfig
