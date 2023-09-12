const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env, options) => {
  const isProduction = options.mode === "development";

  return {
    mode: isProduction ? "production" : "development", // Доданий режим
    entry: "./src/scripts/app.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "./dist"),
    },
    optimization: {
      minimizer: [new TerserPlugin()],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: {
          collapseWhitespace: true,
        },
      }),
      new HtmlWebpackPlugin({
        template: "./src/product.html",
        filename: "product.html",
      }),

      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: "src/images", to: "images" },
          { from: "src/fonts", to: "fonts" },
          // { from: "src/icons", to: "icons" },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
    devServer: {
      static: path.join(__dirname, "src"),
      compress: true,
      port: 8080,
      hot: true,
      liveReload: true, // Додано опцію liveReload
    },
  };
};
