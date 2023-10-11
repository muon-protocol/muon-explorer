/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	env: {
		BASE_URL: 'https://explorer.muon.net',
		NEXT_SHARP_PATH: '/tmp/node_modules/sharp',
		NETWORK: process.env.NETWORK || 'Alice',
	},
	compiler: {
		styledComponents: {
			ssr: true,
		},
	},
}

module.exports = nextConfig
