const fs = require('fs')
const { resolve } = require('path')
const clientManifest = require('../dist/vue-ssr-client-manifest')

const readFile = filename => fs.readFileSync(resolve(__dirname, '../dist', filename), 'utf-8')

// 匹配打包出的js中的__file="xxx.vue"
const pattern = /__file="([^"]+)"/g

// 获取.vue文件到chunkName的映射
const res = {}
clientManifest.async.forEach(jsPath => {
    const jsStr = readFile(jsPath)
    jsStr.replace(pattern, (str, matched) => {
        const chunkName = jsPath.match(/\/([\w-]+)\./)[1]
        res[matched] = chunkName
    })
})

// 过滤出异步chunk的css并从all中去除
const initialAssets = []
const asyncCssAssets = []
clientManifest.all.forEach(assetsPath => {
    for (let value of Object.values(res)) {
        if (assetsPath.endsWith('.css') && assetsPath.includes(value)) {
            asyncCssAssets.push(assetsPath)
            return
        }
    }
    initialAssets.push(assetsPath)
})

// 生成.vue文件到对应css资源的映射
const asyncInjectAssets = {}
for (let [filename, chunkName] of Object.entries(res)) {
    asyncInjectAssets[filename] = []
    asyncCssAssets.forEach(assets => {
        if (assets.includes(chunkName)) {
            asyncInjectAssets[filename].push(assets)
        }
    })
}

clientManifest.all = initialAssets
clientManifest.asyncInjectAssets = asyncInjectAssets

fs.writeFileSync(resolve(__dirname, '../dist/vue-ssr-client-manifest.json'), JSON.stringify(clientManifest, null, 4))
