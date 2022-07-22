const path = require('path');
const HtmlWebpackPlugin =require('html-webpack-plugin');

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

        ],
      },



    devServer: {
        static: {
          directory: path.join(__dirname, 'src'),
        },
        compress: true,
        port: 9000,
    },

    plugins: [new HtmlWebpackPlugin({template:__dirname + '/src/index.html'})],

};