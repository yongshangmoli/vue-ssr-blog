const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: 'static/js/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: 'static/js/[name].[chunkhash:8].js',
        publicPath: '/'
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
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.template.html')
        })
    ]
})
