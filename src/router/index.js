/*
 * @Author: shallwe
 * @Date: 2019-12-10 11:19:45
 * @LastEditTime: 2019-12-10 19:46:25
 * @LastEditors: shallwe
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'

Vue.use(VueRouter)
Vue.use(Meta)

export function createRouter() {
    return new VueRouter({
        mode: 'history',
        routes: [{
            path: '/',
            component: () => import(/* webpackChunkName: 'blog-home' */ '../views/index')
        },
        {
            path: '/list',
            component: () => import(/* webpackChunkName: 'blog-list' */ '../views/list')
        },
        {
            path: '/detail',
            component: () => import(/* webpackChunkName: 'blog-detail' */ '../views/detail')
        }
        ]
    })
}
