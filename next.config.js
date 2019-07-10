// const withTypescript = require("@zeit/next-typescript");
const path = require("path");
const webpack = require('webpack')
const widthPlugins = require("next-compose-plugins");
const withSass = require("@zeit/next-sass");
const withLess = require("@zeit/next-less");
const withCss = require("@zeit/next-css");
const optimizedImages = require("next-optimized-images");
const withProgressBar = require("next-progressbar");

const rootPath = path.resolve(__dirname, "./");
const env = process.env.NODE_ENV;
const domain_use = process.env.DOMAIN_USE;

const PROD_ENV = "production";
const DEV_ENV = "development";

if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => { }
}

if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {}
}

const nextConfig = {
  distDir: `dist_${domain_use}`,
  generateBuildId: async () => {
    // For example get the latest git commit hash here
    return process.env.npm_package_name || "MyApplication";
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: "/static",
  },
  useFileSystemPublicRoutes: false,
  webpack(config, { dev, isServer }) {
    console.log('isServer', isServer)
    if (isServer) {
      const antStyles = /antd\/.*?\/style\/css.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }
    // Further custom configuration here
    config.resolve = {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      alias: {
        ...(config.resolve.alias || {}),
        "@": path.resolve(rootPath, "pages"),
        UTILS: path.resolve(rootPath, "utils"),
        STORE: path.resolve(rootPath, "store"),
        API: path.resolve(rootPath, "API"),
      },
    };
    config.plugins.push(
      new webpack.DefinePlugin({
        globalEnv: JSON.stringify(env),
        domainUse: JSON.stringify(domain_use),
        __APP_NAME__: JSON.stringify(process.env.npm_package_name),
        __DEV__: domain_use === DEV_ENV,
        __PROD__: domain_use === PROD_ENV,
      }),
    );
    return config;
  },
  exportPathMap() {
    return {
      "/": { page: "/" },
    };
  },
};

module.exports = widthPlugins([
    // [withTypescript],
    [withCss, {
        cssModules: true,
        cssLoaderOptions: {
            localIdentName: '[local]',
        }
        
    }],
    [withLess, {
        cssModules: true,
        cssLoaderOptions: {
            localIdentName: '[local]',
        },
        lessLoaderOptions: {
            javascriptEnabled: true,
            modifyVars: {
                // You can set custom theme for ant-design
                // 'primary-color': '#1DA57A'
            },
        },
    }],
    [withSass, {
        cssModules: true,
        cssLoaderOptions: {
            localIdentName: '[[path]___[local]___[hash:base64:5]]',
        },
        sassLoaderOptions: {

        },
        postcssLoaderOptions: {
            config: {
                path: './',
            },
        },
    }],
    [optimizedImages, {
        // these are the default values so you don't have to provide them if they are good enough for your use-case.
        // but you can overwrite them here with any valid value you want.
        inlineImageLimit: 8192,
        imagesFolder: 'images',
        imagesName: '[name]-[hash].[ext]',
        optimizeImagesInDev: false,
        mozjpeg: {
            quality: 80,
        },
        optipng: {
            optimizationLevel: 3,
        },
        pngquant: false,
        gifsicle: {
            interlaced: true,
            optimizationLevel: 3,
        },
        svgo: {
            // enable/disable svgo plugins here
        },
        webp: {
            preset: 'default',
            quality: 75,
        },
    }],
    [withProgressBar],

], nextConfig)
