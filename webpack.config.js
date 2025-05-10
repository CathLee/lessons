/*
 * @Date: 2025-01-07 23:23:18
 * @Description:
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
const CustomPreloadPlugin = require("./src/plugin/preload.js");
module.exports = {
  entry: "./src/index.tsx", // 入口文件
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  // Make sure your webpack config has proper loader for images
  module: {
    rules: [
      // Regular CSS files
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          "css-loader",
        ]
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", {"runtime": "automatic"}],
                "@babel/preset-typescript"
              ],
              // Add any plugins you might need
              plugins: []
            }
          }
        ]
      },
      // Image rules
      {
        test: /\.(jpg|jpeg|png|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[contenthash].[ext]",
              outputPath: "static/media/",
              publicPath: "/static/media/", // Make sure public path is correct
              // This important option tells webpack to emit the file
              emitFile: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      inject: true, // Ensure scripts are injected
    }),
    new CustomPreloadPlugin()
    // new PreloadWebpackPlugin({
    //   rel: "preload",
    //   as: "image",
    //   include: "allAssets",
    //   fileBlacklist: [/\.map$/, /hot-update\.js$/],
    //   fileWhitelist: [/\.(jpg|jpeg)$/i], // Include both jpg and jpeg
    //   // Add this handlerFunction to see what assets are being processed
    //   handlerFunction: (assets) => {
    //     console.log("Assets detected by PreloadWebpackPlugin:", assets);
    //     // Only return image assets
    //     return assets.filter((file) => /\.(jpg|jpeg)$/i.test(file));
    //   },
    // }),
  ],
  output: {
    // 输出配置
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.[contenthash].js", // Adding hash for cache busting
    publicPath: "/", // Important for correct asset URLs
  },
  // 监听文件更新的频率
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 1000,
  },
};
