/** @type {import('next').NextConfig} */
const crypto = require('crypto');
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = {
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
  async serverMiddleware() {
    // 创建代理
    const apiProxy = createProxyMiddleware('/bing', {
      target: 'https://www.bing.com/:slug*',
      changeOrigin: true,
    });

    // 将代理应用到服务器中间件
    return (req, res, next) => {
      if (req.url.startsWith('/bing')) {
        apiProxy(req, res, next);
      } else {
        next();
      }
    };
  },
};
// const nextConfig = {
//   reactStrictMode: true,
//   async rewrites() {
//     return [
//       {
//         source: "/proxy/:slug*",
//         destination: "https://api.openai.com/:slug*",
//       },
//       {
//         source: "/bing/:slug*",
//         destination: "https://www.bing.com/:slug*",
//       },
//     ];
//   },
// };


// module.exports = nextConfig;

// module.exports = {
//   async headers() {
//     return [
//       {
//         source: '/bing/:slug*',
//         headers: [
//           {
//             key: 'x-ms-client-request-id',
//             value:  crypto.randomUUID(),
//           },
//           {
//             key: 'Access-Control-Allow-Origin',
//             value:  '*',
//           },          
          
//         ],
//       },
//     ]
//   },
// }
