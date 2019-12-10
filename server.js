const express = require('express')
const path = require('path')
const fs = require('fs')
const { createBundleRenderer } = require('vue-server-renderer')
const LRU = require('lru-cache')

const app = express()

const isProd = process.env.NODE_ENV === 'production'
// const isProd = false

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

let renderer
let readyPromise
const templatePath = path.resolve(__dirname, './src/index.template.html')
const template = fs.readFileSync(templatePath, 'utf-8')

if (isProd) {
    const serverBundle = require('./dist/vue-ssr-server-bundle')
    const clientManifest = require('./dist/vue-ssr-client-manifest')
    renderer = createRenderer(serverBundle, {
        template,
        clientManifest
    })
} else {
    readyPromise = require('./build/setup-dev-server')(app, (serverBundle, clientManifest) => {
        renderer = createRenderer(serverBundle, {
            template,
            clientManifest
        })
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

app.use(express.static(path.resolve(__dirname, 'dist')))
app.use(express.static(path.resolve(__dirname, 'public')))

app.get('*', isProd ? render : (req, res) => {
    readyPromise.then(() => render(req, res))
})

app.use((req, res, next) => {
    const err = new Error(`${req.originalUrl} not found`)
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message)
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server running on http://localhost:${port}`))
