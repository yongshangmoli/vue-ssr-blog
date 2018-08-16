const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: 'static/js/[name].js',
        path: path.resolve(__dirname, '../dist'),
        chunkFilename: 'static/js/[name].js',
        publicPath: '/'
    },
    plugins: [
        new WebpackBar(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/index.template.html')
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, '../public'),
        host: '0.0.0.0',
        port: 3000,
        compress: true,
        overlay: {
            warnings: false,
            errors: true
        },
        hot: true,
        publicPath: '/',
        historyApiFallback: {
            rewrites: [
                { from: /\.*/, to: '/index.html' }
            ]
        },
        inline: true
    }
})
