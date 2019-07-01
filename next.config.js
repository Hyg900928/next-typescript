const withTypescript = require("@zeit/next-typescript");
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
  webpack(config, { dev }) {
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
    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        enforce: "pre",
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // Emit errors as warnings for dev to not break webpack build.
          // Eslint errors are shown in console for dev, yay :-)
          // emitWarning: dev,
        },
      });
    }
    return config;
  },
  exportPathMap() {
    return {
      "/": { page: "/" },
    };
  },
};

module.exports = widthPlugins([
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
    [withCss, {
        cssModules: true,
        cssLoaderOptions: {
            localIdentName: '[local]',
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
    [withTypescript],
], nextConfig)
