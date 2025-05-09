const HtmlWebpackPlugin = require('html-webpack-plugin');

class CustomPreloadPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('CustomPreloadPlugin', compilation => {
      // Check if HtmlWebpackPlugin is used
      if (compilation.hooks.htmlWebpackPluginAfterHtmlProcessing) {
        // For HtmlWebpackPlugin v3
        compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
          'CustomPreloadPlugin',
          this.processHTML.bind(this)
        );
      } else {
        // For HtmlWebpackPlugin v4 or later
        const hooks = HtmlWebpackPlugin.getHooks(compilation);
        hooks.beforeEmit.tapAsync(
          'CustomPreloadPlugin',
          this.processHTML.bind(this)
        );
      }
    });
  }

  processHTML(data, callback) {
    const outputAssets = data.assets || [];
    const publicPath = data.publicPath || '';
    
    // Find all JPG/JPEG assets
    const jpgAssets = [];
    
    // For different webpack versions
    if (Array.isArray(outputAssets)) {
      // HtmlWebpackPlugin v3
      outputAssets.forEach(asset => {
        if (/\.(jpg|jpeg)$/i.test(asset)) {
          jpgAssets.push(asset);
        }
      });
    } else {
      // For modern webpack with different asset structure
      console.log('Searching for JPG assets in compilation');
      
      // Print out all assets for debugging
      const assetKeys = Object.keys(outputAssets);
      console.log('All assets:', assetKeys);
      
      // Filter JPG assets
      assetKeys.forEach(key => {
        if (/\.(jpg|jpeg)$/i.test(key)) {
          jpgAssets.push(publicPath + key);
        }
      });
    }
    
    console.log('Found JPG assets for preloading:', jpgAssets);
    
    // Generate preload links
    const preloadLinks = jpgAssets.map(asset => 
      `<link rel="preload" as="image" href="${asset}">`
    ).join('\n');
    
    // Insert before closing head tag
    if (preloadLinks.length > 0) {
      console.log('Adding preload links to HTML');
      data.html = data.html.replace('</head>', `${preloadLinks}\n</head>`);
    }
    
    callback(null, data);
  }
}

module.exports = CustomPreloadPlugin;