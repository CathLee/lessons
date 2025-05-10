/*
 * @Date: 2025-05-09 22:48:46
 * @Description: 
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Create a custom plugin to add preload links
class CustomPreloadPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('CustomPreloadPlugin', compilation => {
      // This hook runs after HTML is processed
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'CustomPreloadPlugin',
        (data, cb) => {
          // Image paths to preload - update these with your actual paths from console.log
          const imagePaths = [
            '/static/media/aa.61df1d7189f9aa63ad7.jpg',
            '/static/media/download.7e7ee98b2ea8febed407.jpg',
            '/static/media/asuka.90f97d8af0d242106d74.jpg'
          ];
          
          // Add preload links before the closing head tag
          const preloadLinks = imagePaths.map(path => 
            `<link rel="preload" as="image" href="${path}">`
          ).join('\n');
          
          // Insert before closing head tag
          data.html = data.html.replace('</head>', `${preloadLinks}\n</head>`);
          console.log('Preload links added:', preloadLinks);
          console.log('HTML after adding preload links:', data.html);
          cb(null, data);
        }
      );
    });
  }
}

module.exports = CustomPreloadPlugin;