const webpack = require('webpack')
const path = require('path')
let entry = './src/index.js'

webpack({
    entry: entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    // 其他配置...
}, (err, stats) => {
    console.log('something wrong:', err, stats)
});