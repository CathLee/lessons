const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//cjs
module.exports = {
    entry: './src/index.tsx', // 入口文件
    output: { // 输出配置
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    // 监听文件更新的频率
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1000,
    }
}