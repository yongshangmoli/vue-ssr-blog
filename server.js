const express = require('express')
const path = require('path')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const LRU = require('lru-cache')

const app = express()

const isProd = process.env.NODE_ENV === 'production'

function createRenderer(bundle, options) {
    return createBundleRenderer(bundle, {
        ...options,
        runInNewContext: false,
        cache: LRU({
            max: 1000,
            maxAge: 1000 * 60 * 15
        })
    })
}

app.use(express.static(path.resolve(__dirname, 'dist')))

let renderer
const templatePath = path.resolve(__dirname, './src/index.template.html')
if (isProd) {
    const serverBundle = require('./dist/vue-ssr-server-bundle')
    const clientManifest = require('./dist/vue-ssr-client-manifest')
    const template = fs.readFileSync(templatePath, 'utf-8')
    renderer = createRenderer(serverBundle, {
        template,
        clientManifest
    })
}

const render = (req, res) => {
    res.setHeader('Content-Type', 'text/html')

    const handleError = err => {
        if (err.url) {
            res.redirect(err.url)
        } else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found')
        } else {
            res.status(500).send('500 | Internal Server Error')
            console.error(`error during render : ${req.url}`)
            console.error(err.stack)
        }
    }

    const context = {
        title: 'vue ssr',
        url: req.url
    }

    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err)
        }

        res.send(html)
    })
}

app.get('*', isProd ? render : render)

app.use((req, res, next) => {
    const err = new Error(`${req.originalUrl} not found`)
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message)
})

app.listen(3000, () => console.log('server running on http://localhost:3000'))
