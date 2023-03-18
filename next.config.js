/** @type {import('next').NextConfig} */
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
