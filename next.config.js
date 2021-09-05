// analize
// <distDir>/analyze/
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // @see https://nextjs.org/docs/messages/next-image-unconfigured-host
  images: {
    domains: ['images.microcms-assets.io', 'tkc310.com', 'localhost'],
  },

  webpack: (config, { isServer }) => {
    // エラーを抑制
    if (!isServer) {
      // eslint-disable-next-line no-param-reassign
      config.resolve.fallback = {
        ...config.resolve.fallback,
        ...{
          fs: false,
          path: false,
          child_process: false,
          worker_threads: false,
          net: false,
          dns: false,
          tls: false,
          crypto: false,
          os: false,
          tty: false,
        },
      };
    }

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
