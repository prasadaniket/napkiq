/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'api.stoneoven.in' },
      { protocol: 'https', hostname: 'so-blik.onrender.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
}

module.exports = nextConfig
