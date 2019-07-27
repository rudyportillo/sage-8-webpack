// webpack.config.js

const webpack = require("webpack");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const { VueLoaderPlugin } = require("vue-loader");

const themeOpts = require("./webpack/theme.config.json");

module.exports = (env = {}) => {
  const isProduction = env.production === true;
  const isDevelopment = env.production !== true;

  let config = {
    entry: {
      main: "./assets/scripts/main.js",
      customizer: "./assets/scripts/customizer.js",
      blog: "./assets/scripts/blog.js",
      images: "./assets/images/images.js",
      style: "./assets/styles/main.scss"
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction
        ? "assets/scripts/[name]-[hash].js"
        : "assets/scripts/[name].js",
      publicPath: "/wp-content/themes/" + themeOpts.name + "/dist/"
    },
    externals: {
      jquery: "jQuery"
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.scss$/,
          include: path.resolve(__dirname, "assets"),
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: isDevelopment
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  sourceMap: isDevelopment,
                  config: {
                    path: "webpack/postcss.config.js"
                  }
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: isDevelopment
                }
              }
            ]
          })
        },
        {
          test: /\.styl(us)?$/,
          use: ["vue-style-loader", "css-loader", "stylus-loader"]
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff2|woff|eot|ttf)$/,
          use: {
            loader: "file-loader",
            options: {
              name: isProduction
                ? "[path][name]-[hash].[ext]"
                : "[path][name].[ext]"
            }
          }
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, "assets/scripts/"),
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "env",
                    {
                      targets: {
                        browsers: [
                          "Chrome >= 52",
                          "FireFox >= 44",
                          "Safari >= 7",
                          "Explorer 11",
                          "last 4 Edge versions"
                        ]
                      },
                      useBuiltIns: true
                    }
                  ]
                ]
              }
            }
          ]
        },
        {
          test: /\.vue$/,
          use: "vue-loader"
        }
      ]
    },
    plugins: [
      new BrowserSyncPlugin({
        host: "localhost",
        port: 3000,
        proxy: themeOpts.proxy,
        files: [
          {
            match: path.resolve(__dirname, "**/*.php")
          }
        ]
      }),
      new CleanWebpackPlugin(isProduction ? "dist" : ""),
      new ExtractTextPlugin({
        filename: isProduction
          ? "assets/styles/[name]-[contenthash].css"
          : "assets/styles/[name].css"
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: isProduction ? "static" : "disable",
        openAnalyzer: false
      }),
      new ImageminPlugin({
        test: "/.(jpe?g|png|gif|svg)$/i",
        disable: isDevelopment
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Popper: ["popper.js", "default"]
      }),
      new UglifyJsPlugin({
        test: /\.js($|\?)/i
      }),
      new WebpackAssetsManifest({
        output: "assets.json"
      }),
      new VueLoaderPlugin()
    ]
  };

  return config;
};
