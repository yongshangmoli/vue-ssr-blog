const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.resolve(__dirname, 'dist')))

app.get('*', (req, res, next) => {

})

app.use((req, res, next) => {
    const err = new Error(`${req.originalUrl} not found`)
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err.message)
})

app.listen(3000, () => console.log('server running on http://localhost:3000'))
