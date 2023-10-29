/** @type {import('next').NextConfig} */

const path = process.env.NETWORK === 'Muon' ? '' : process.env.NETWORK.toLowerCase()

const nextConfig = {
	reactStrictMode: true,
	basePath: path,
	env: {
		BASE_URL: `https://explorer.muon.net/${path}`,
		NEXT_SHARP_PATH: '/tmp/node_modules/sharp',
		NETWORK: process.env.NETWORK,
	},
	compiler: {
		styledComponents: {
			ssr: true,
		},
	},
}

module.exports = nextConfig
