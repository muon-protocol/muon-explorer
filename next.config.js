/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    DEV_BASE_URL: 'https://explorer.muon.net',
    CSR_BASE_URL: '',
    SSR_BASE_URL: 'http://localhost:8004',
    NEXT_SHARP_PATH: "/tmp/node_modules/sharp"
  },
  compiler: {
    styledComponents: {
      ssr: true
    }
  }
}

module.exports = nextConfig
