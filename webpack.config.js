const path = require('path');
const HtmlWebpackPlugin =require('html-webpack-plugin');

module.exports = {
    entry: __dirname + '/src/index.js',
    mode :"production",

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
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