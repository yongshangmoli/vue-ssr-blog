const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const resolve = pathname => path.resolve(__dirname, '..', pathname)

module.exports = {
    // 设置webpack的上下文目录，使用相对路径时会以此目录为根目录
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
            // {
            //     // test: /\.(js|vue)$/,
            //     // loader: 'eslint-loader',
            //     // include: resolve('src'),
            //     // // 指定该loader执行顺序为最前
            //     // enforce: 'pre'
            // },
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
        // 自动应用loader到.vue文件对应，如/\.js$/对应script块，/\.css$/对应style块
        new VueLoaderPlugin()
    ]
}
