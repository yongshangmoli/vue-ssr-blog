import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/home'
import About from '../views/about'

Vue.use(VueRouter)

export function createRouter() {
    return new VueRouter({
        mode: 'history',
        routes: [
            {
                path: '/',
                // component: () => import('../views/home')
                component: Home
            },
            {
                path: '/about',
                // component: () => import('../views/about')
                component: About
            }
        ]
    })
}
