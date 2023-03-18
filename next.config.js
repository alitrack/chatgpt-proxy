/** @type {import('next').NextConfig} */
const crypto = require('crypto');

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/proxy/:slug*",
        destination: "https://api.openai.com/:slug*",
      },
      {
        source: "/bing/:slug*",
        destination: "https://www.bing.com/:slug*",
      },
    ];
  },
};

module.exports = nextConfig;

module.exports = {
  async headers() {
    return [
      {
        source: '/bing/:slug*',
        headers: [
          {
            key: 'x-ms-client-request-id',
            value:  crypto.randomUUID(),
          },
        ],
      },
    ]
  },
}
