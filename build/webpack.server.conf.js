const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const baseConfig = require('./webpack.base.conf')

module.exports = merge(baseConfig, {
    mode: process.env.NODE_ENV || 'development',
    target: 'node',
    devtool: 'source-map',
    entry: {
        app: './src/entry-server.js'
    },
    output: {
        filename: 'server.bundle.js',
        libraryTarget: 'commonjs2'
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(css|styl|stylus)$/,
                loader: 'ignore-loader'
            }
        ]
    },
    plugins: [
        new VueSSRServerPlugin(),
        new webpack.DefinePlugin({
            isServer: 'true',
            isClient: 'false'
        })
    ]
})
