/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    // BASE_URL: 'http://127.0.0.1:5000',
    BASE_URL: 'https://idealmoney.io:5000',
    NEXT_SHARP_PATH: "/tmp/node_modules/sharp"
  },
  // images: {
  //   domains: ['138.201.79.4:8000', 'http://138.201.79.4:8000'], // , 'https://api.storycreator.app', 'api.storycreator.app'
  //   remotePatterns: [
  //     {
  //       protocol: 'http',
  //       hostname: '138.201.79.4',
  //       port: '8000'
  //     },
  //     // {
  //     //   protocol: 'https',
  //     //   hostname: 'api.storycreator.app'
  //     // }
  //   ],
  // }
}

module.exports = nextConfig
