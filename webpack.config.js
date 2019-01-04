const path = require('path');

module.exports = {
  entry: "./src/index.jsx",
  output: {
    path: path.resolve(__dirname, "public/js"),
    publicPath: "public/",

    filename: "index.js",
  },

  resolve: {
    extensions: [".js", ".jsx"]
  },

  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 3000
  },

  module: {
    rules: [
      {
        test: /(.jsx|.js)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ['@babel/env', '@babel/react']
        }
      }
    ]
  },

  devtool: "source-map"
}