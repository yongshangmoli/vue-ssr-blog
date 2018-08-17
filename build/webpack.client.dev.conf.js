const path = require('path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    output: {
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].js'
    },
    plugins: [
        new WebpackBar(),
        new webpack.HotModuleReplacementPlugin()
    ]
}
