const webpack = require('webpack')
const MFS = require('memory-fs')
const path = require('path')
const clientConfig = require('./webpack.client.conf')
const serverConfig = require('./webpack.server.conf')

const readFile = (fs, file) => {
    try {
        return fs.readFileSync(path.resolve(clientConfig.output.path, file), 'utf-8')
    } catch (e) {}
}

module.exports = function setupDevServer(app, cb) {
    let serverBundle
    let clientManifest

    let ready
    const readyPromise = new Promise(resolve => (ready = resolve))

    const update = () => {
        if (serverBundle && clientManifest) {
            ready()
            cb(serverBundle, clientManifest)
        }
    }

    // 注入hot reload代理客户端
    clientConfig.entry.app = ['webpack-hot-middleware/client?reload=true', clientConfig.entry.app]
    const clientCompiler = webpack(clientConfig)
    const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
        publicPath: clientConfig.output.publicPath,
        noInfo: true
    })
    app.use(devMiddleware)
    app.use(require('webpack-hot-middleware')(clientCompiler))

    clientCompiler.plugin('done', stats => {
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(warn => console.warn(warn))
        if (stats.errors.length) return

        clientManifest = JSON.parse(readFile(devMiddleware.fileSystem, 'vue-ssr-client-manifest.json'))
        update()
    })

    // 面向内存的文件系统
    const mfs = new MFS()
    const serverComplier = webpack(serverConfig)
    // 把webpack的文件系统设置为mfs，把输出内容打包到内存
    serverComplier.outputFileSystem = mfs
    serverComplier.watch({}, (err, stats) => {
        if (err) throw err
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(warn => console.warn(warn))

        serverBundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
        update()
    })

    return readyPromise
}
