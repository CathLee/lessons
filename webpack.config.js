const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//cjs
module.exports = {
    entry: './src/index.tsx', // 入口文件
    output: { // 输出配置
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
}