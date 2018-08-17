import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'

Vue.use(VueRouter)
Vue.use(Meta)

export function createRouter() {
    return new VueRouter({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: () => import('../views/home')
            },
            {
                path: '/about',
                component: () => import('../views/about')
            }
        ]
    })
}
