//webpack.config.js

const webpack               = require('webpack')
const BrowserSyncPlugin     = require('browser-sync-webpack-plugin')
const CleanWebpackPlugin    = require('clean-webpack-plugin')
const CopyWebpackPlugin     = require('copy-webpack-plugin')
const ExtractTextPlugin     = require('extract-text-webpack-plugin')
const FileLoader            = require('file-loader')
const ImageminPlugin        = require('imagemin-webpack-plugin').default
const path                  = require('path')
const UrlLoader             = require('url-loader')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const FileWatcherPlugin     = require("file-watcher-webpack-plugin");

const themeOpts = {
  "name": "yourthemename",
  "proxy": "http://localhost:1234"
}

module.exports = (env = {}) => {

  const isProduction = env.production === true;
  const isDevelopment = env.production !== true;

  let config = {
    entry: {
      main: "./assets/app.js",
      customizer: "./assets/scripts/customizer.js"
    },
    output: {
      path: __dirname + "/dist/",
      filename: isProduction ? 'scripts/[name]-[hash].js' : 'scripts/[name].js',
      publicPath: '/wp-content/themes/' + themeOpts.name + '/dist/'
    },
    externals: {
      jquery: 'jQuery',
    },
    module: {
      rules: [{
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: "css-loader", options: {
              sourceMap: isDevelopment
            }
          }, { 
            loader: "postcss-loader", options: {
              sourceMap: isDevelopment
            }
          }, {
            loader: "sass-loader", options: {
              sourceMap: isDevelopment
            }
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {limit: 8192}
          }
        ]
      }]
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: 'popper.js',
      }),
      new CleanWebpackPlugin('dist'),
      new BrowserSyncPlugin({
          host: 'localhost',
          port: 3000,
          proxy: themeOpts.proxy
      }),
      new WebpackAssetsManifest({
        output: 'assets.json'
        }),
      // copy images from assets/images to dist/images
      new CopyWebpackPlugin([{
        from: 'assets/images/',
        to: 'images'
      }]),
      // and optimize those images for production
      new ImageminPlugin({
         test: '/\.(jpe?g|png|gif|svg)$/i',
         disable: isDevelopment
      }),
      new ExtractTextPlugin({
        filename: isProduction ? "styles/[name]-[contenthash].css" : "styles/[name].css",
        disable: isProduction
      }),
      new FileWatcherPlugin({
        root: __dirname,
        files: ['*.php']
      })
    ]
  }

  return config
}