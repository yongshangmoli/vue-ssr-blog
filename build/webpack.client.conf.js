/*
 * @Author: shallwe
 * @Date: 2019-12-10 11:48:33
 * @LastEditTime: 2019-12-10 13:07:05
 * @LastEditors: shallwe
 */
const merge = require('webpack-merge')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.base.conf')
const devConfig = require('./webpack.client.dev.conf')
const prodConfig = require('./webpack.client.prod.conf')

const isProd = process.env.NODE_ENV === 'production'

const config = {
    entry: {
        app: './src/entry-client.js'
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: isProd
                    ? { parser: require('postcss-safe-parser'), map: { inline: false } }
                    : { parser: require('postcss-safe-parser') }
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.styl(us)?$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'stylus-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            isServer: 'false',
            isClient: 'true'
        }),
        new VueSSRClientPlugin()
    ].concat(
        isProd
            ? [
                new MiniCssExtractPlugin({
                    filename: 'static/css/[name].[contenthash:8].css',
                    chunkFilename: 'static/css/[name].[contenthash:8].css'
                })
            ]
            : []
    )
}

module.exports = merge(baseConfig, isProd ? prodConfig : devConfig, config)
