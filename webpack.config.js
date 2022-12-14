const path = require('path');
const HtmlWebpackPlugin =require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
    entry: __dirname + '/src/index.js',
    mode :"development",

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.less$/i,
            use: [
              // compiles Less to CSS
              "style-loader",
              "css-loader",
              "less-loader",
            ],
          },
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },     
          {
            test: /\.png/,
            type: 'asset/resource'
          },
          {
            test: /\.(wav|mp3|mp4)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          },
        ],
      },



    devServer: {
        static: {
          directory: path.join(__dirname, 'src'),
        },
        compress: true,
        port: 9000,
    },

    plugins: [
      new HtmlWebpackPlugin({template:__dirname + '/src/index.html'}),
      new NodePolyfillPlugin()
    ],

};