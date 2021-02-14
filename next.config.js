// <distDir>/analyze/
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withImages = require('next-images');

module.exports = withBundleAnalyzer(
  withImages({
    // inlineimage
    inlineImageLimit: 16384,

    // mdx作成時のエラーを抑制 (fsのエラー)
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.node = {
          fs: 'empty',
        };
      }

      return config;
    },
  })
);
