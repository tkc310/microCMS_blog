const { ANALYZE, NEXT_PUBLIC_ALLOWED_ASSET_DOMAINS } = process.env;

// analyze
// <distDir>/analyze/
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: ANALYZE === 'true',
});

const nextConfig = {
  // @see https://nextjs.org/docs/messages/next-image-unconfigured-host
  images: {
    domains: NEXT_PUBLIC_ALLOWED_ASSET_DOMAINS.split(','),
  },

  swcMinify: true,
  experimental: {
    swcLoader: true,
    cpus: 4,
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
