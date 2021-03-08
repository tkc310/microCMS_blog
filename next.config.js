// preact
// @see https://queq1890.info/blog/next-with-preact
// @see https://github.com/preactjs/next-plugin-preact
const withPreact = require('next-plugin-preact');
const preact = require('preact');

// analize
// <distDir>/analyze/
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// image optimize
const withImages = require('next-images');

module.exports = withPreact(
  withBundleAnalyzer(
    withImages({
      images: {
        domains: ['images.microcms-assets.io', 'tkc310.com', 'localhost'],
      },

      // inlineimage
      inlineImageLimit: 16384,

      experimental: {
        modern: true,
      },

      webpack: (config, { dev, isServer }) => {
        // fsエラーを抑制
        if (!isServer) {
          config.node = {
            fs: 'empty',
          };
        }

        config.resolve.extensions.push('.ttf');
        config.module.rules.push({
          test: /\.ttf/,
          loader: 'url-loader',
        });

        const splitChunks =
          config.optimization && config.optimization.splitChunks;
        if (splitChunks) {
          const { cacheGroups } = splitChunks;
          const preactModules = /[\\/]node_modules[\\/](preact|preact-render-to-string|preact-context-provider)[\\/]/;
          if (cacheGroups.framework) {
            cacheGroups.preact = {
              ...cacheGroups.framework,
              test: preactModules,
            };
            cacheGroups.commons.name = 'framework';
          } else {
            cacheGroups.preact = {
              name: 'commons',
              chunks: 'all',
              test: preactModules,
            };
          }
        }

        // Install webpack aliases:
        const aliases = config.resolve.alias || (config.resolve.alias = {});
        aliases.react = aliases['react-dom'] = 'preact/compat';

        if (dev) {
          if (isServer) {
            // Remove circular `__self` and `__source` props only meant for
            // development. See https://github.com/developit/nextjs-preact-demo/issues/25
            const oldVNodeHook = preact.options.vnode;
            preact.options.vnode = (vnode) => {
              const { props } = vnode;
              if (props != null) {
                if ('__self' in props) props.__self = null;
                if ('__source' in props) props.__source = null;
              }

              if (oldVNodeHook) {
                oldVNodeHook(vnode);
              }
            };
          } else {
            // inject Preact DevTools
            const { entry } = config;
            config.entry = () =>
              entry().then((entries) => {
                entries['main.js'] = ['preact/debug'].concat(
                  entries['main.js'] || []
                );
                return entries;
              });
          }
        }

        return config;
      },
    })
  )
);
