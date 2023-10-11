/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	env: {
		BASE_URL: 'https://explorer.muon.net',
		NEXT_SHARP_PATH: '/tmp/node_modules/sharp',
		THEME: process.env.THEME,
	},
	compiler: {
		styledComponents: {
			ssr: true,
		},
	},
}

module.exports = nextConfig
