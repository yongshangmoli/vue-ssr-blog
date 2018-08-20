const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const resolve = pathname => path.resolve(__dirname, '..', pathname)

module.exports = {
    context: resolve('.'),
    output: {
        path: resolve('dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                include: resolve('src'),
                enforce: 'pre'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                include: resolve('src')
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: resolve('node_modules')
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}
