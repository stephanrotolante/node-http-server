const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    mode: "development",
    entry: ["./src/public/src/index.js","./src/public/client.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        libraryTarget: "umd"
    },
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          },
          {
            test: /\.css$/,
            use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader']
          }
        ]
      },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ]
}