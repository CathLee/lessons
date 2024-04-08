const webpack = require('webpack')
const config = require('../../webpack.config.js')
const compiler = webpack(config);
compiler.run((err, stats) => {
    console.log(stats.toJson({
        // 指定要显示的统计信息
        assets: true,
        chunks: false,
        modules: false,
        reasons: true,
        children: false,
        source: false,
        errors: true,
        errorDetails: true,
        warnings: true,
        publicPath: true
    }));
});
