/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    TEST_BASE_URL: 'https://explorer.muon.net/api/v1',
    
    NEXT_SHARP_PATH: "/tmp/node_modules/sharp"
  },
  compiler: {
    styledComponents: {
      ssr: true
    }
  }
}

module.exports = nextConfig
