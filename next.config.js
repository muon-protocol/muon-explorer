/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: 'http://localhost:8000',
    NEXT_SHARP_PATH: "/tmp/node_modules/sharp"
  },
  compiler: {
    styledComponents: {
      ssr: true
    }
  }
}

module.exports = nextConfig
