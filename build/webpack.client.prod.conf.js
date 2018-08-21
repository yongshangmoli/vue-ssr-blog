const webpack = require('webpack')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: 'static/js/[name].[chunkhash:8].js',
        chunkFilename: 'static/js/[name].[chunkhash:8].js'
    },
    resolve: {
        // Tree Shaking依赖于es6的静态语法分析，优先从package.json的jsnext:main字段导入es6模块(如果有的话)
        mainFields: ['jsnext:main', 'browser', 'main']
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                vender: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vender',
                    priority: -10,
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            new UglifyjsWebpackPlugin({
                uglifyOptions: {
                    output: {
                        comments: false,
                        beautify: false
                    },
                    compress: {
                        warnings: false
                    }
                },
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ]
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin()
    ]
}
