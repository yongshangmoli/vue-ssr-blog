import 'babel-polyfill'
import Vue from 'vue'
import ProgressBar from './components/progressBar'
import { createApp } from './app'
import api from './api'

Vue.config.productionTip = false

const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
    store.$api = store.state.$api = api
}

Vue.mixin({
    beforeRouteUpdate(to, from, next) {
        const { asyncData } = this.$options
        if (asyncData) {
            asyncData({
                store: this.$store,
                route: to
            })
                .then(next)
                .catch(next)
        } else {
            next()
        }
    }
})

router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)

        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = prevMatched[i] !== c)
        })

        if (!activated.length) {
            return next()
        }

        bar.start()
        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({
                    store,
                    route: to
                })
            }
        }))
            .then(() => {
                bar.finish()
                next()
            })
            .catch(next)
    })

    app.$mount('#app')
})
