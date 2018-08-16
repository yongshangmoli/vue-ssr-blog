const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
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
        path: path.resolve(__dirname, '../dist'),
        libraryTarget: 'commonjs2'
    },
    externals: [nodeExternals()],
    plugins: [
        new VueSSRServerPlugin(),
        new webpack.DefinePlugin({
            isServer: 'true',
            isClient: 'false'
        })
    ]
})
