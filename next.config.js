/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true
	},
	images: {
		domains: ['loop.credot.dev','localhost',"admin.csrkuwait.com"],
	  },
}

module.exports = nextConfig
