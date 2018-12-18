var path = require('path');

module.exports = {
  entry: './src/main/js/app.jsx',
  devtool: 'sourcemaps',
  cache: true,
  mode: 'development',
  output: {
    path: __dirname,
    filename: './src/main/resources/static/built/app.js'
  },
  module: {
    rules: [
      {
        test: path.resolve(__dirname, '.'),
        exclude: /(node_modules)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }]
      }
    ]
  },
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, ".")
    ],
    extensions: [".js", ".json", ".jsx", ".css"],
  },
};