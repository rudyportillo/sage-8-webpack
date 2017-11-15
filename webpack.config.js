//webpack.config.js

const webpack               = require('webpack')

const BrowserSyncPlugin     = require('browser-sync-webpack-plugin')
const CleanWebpackPlugin    = require('clean-webpack-plugin')
const CopyWebpackPlugin     = require('copy-webpack-plugin')
const ExtractTextPlugin     = require('extract-text-webpack-plugin')
const ImageminPlugin        = require('imagemin-webpack-plugin').default
const path                  = require('path')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const FileWatcherPlugin     = require("file-watcher-webpack-plugin");

require('theme.config.js')

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
    devtool: "source-map",
    module: {
      rules: [{
        test: /\.scss$/,
        include: path.resolve(__dirname, 'assets'),
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
      }, {
        test: /\.(png|jpg|gif)$/,
        include: path.resolve(__dirname, 'assets'),
        use: [
          {
            loader: 'url-loader',
            options: {limit: 8192}
          }
        ]
      }, {
        test: /\.js$/,
        include: path.resolve(__dirname, 'assets'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { modules: false }]
            ]
          }
        }]
      }]
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
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
      }),
    ]
  }

  return config
}
