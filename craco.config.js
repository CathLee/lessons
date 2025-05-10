const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CustomPreloadPlugin = require("./src/plugin/preload.js");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
module.exports = {
  webpack: {
    // 配置别名（可选，如果你需要）
    alias: {
      // 示例：可以添加路径别名
      // '@': path.resolve(__dirname, 'src'),
    },
    // 覆盖 Webpack 配置
    configure: (webpackConfig, { env, paths }) => {
      // 修改入口（CRA 默认入口是 src/index.js 或 src/index.tsx）
      webpackConfig.entry = "./src/index.tsx";

      // 扩展 resolve.extensions（CRA 默认已包含 .tsx, .ts, .js, .jsx，可以省略）
      webpackConfig.resolve.extensions = [
        ".tsx",
        ".ts",
        ".js",
        ".jsx",
        ...webpackConfig.resolve.extensions,
      ];

      // 修改模块规则
      webpackConfig.module.rules = [
        // 保留 CRA 的默认规则（避免覆盖）
        ...webpackConfig.module.rules,
        // 图片文件规则（CRA 默认已支持 file-loader，但可以自定义）
        {
          test: /\.(jpg|jpeg|png|gif)$/i,
          type: "asset/resource", // 使用 Webpack 内置的 asset/resource
          generator: {
            filename: "static/media/[name].[contenthash].[ext]", // 输出文件名
            publicPath: "", // 公共路径
          },
        },
      ];

      // 修改插件
      webpackConfig.plugins = [
        // 保留 CRA 默认的插件
        ...webpackConfig.plugins.filter(
          // 移除 CRA 默认的 HtmlWebpackPlugin（如果需要自定义）
          (plugin) => !(plugin instanceof HtmlWebpackPlugin)
        ),
        // 添加自定义 HtmlWebpackPlugin
        new HtmlWebpackPlugin({
          template: "public/index.html",
          inject: true,
        }),
        // 添加自定义 Preload 插件
        // new CustomPreloadPlugin(),
        new PreloadWebpackPlugin({
          rel: "preload",
          as: "image",
          include: "allAssets",
          fileBlacklist: [/\.map$/, /hot-update\.js$/],
          fileWhitelist: [/\.(jpg|jpeg)$/i], // Include both jpg and jpeg
          // Add this handlerFunction to see what assets are being processed
          handlerFunction: (assets) => {
            console.log("Assets detected by PreloadWebpackPlugin:", assets);
            // Only return image assets
            return assets.filter((file) => /\.(jpg|jpeg)$/i.test(file));
          },
        }),
      ];

      // 修改输出配置
      webpackConfig.output = {
        ...webpackConfig.output,
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.[contenthash].js",
        publicPath: "/",
      };

      // 返回修改后的配置
      return webpackConfig;
    },
  },
};
