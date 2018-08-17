const path = require('path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        app: './src/entry-client.js'
    },
    output: {
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].js'
    },
    plugins: [
        new WebpackBar(),
        new webpack.HotModuleReplacementPlugin()
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
}
