/*
 * @Author: shallwe
 * @Date: 2019-12-10 11:19:45
 * @LastEditTime : 2020-01-19 11:09:41
 * @LastEditors  : shallwe
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import {
    sync
} from 'vuex-router-sync'
import {
    createRouter
} from './router'
import {
    createStore
} from './store'
import directives from './directives/index'
import App from './App.vue'

export function createApp() {
    const router = createRouter()
    const store = createStore()

    Vue.use(ElementUI)
    let dires = Object.keys(directives)
    dires.map(v => {
        Vue.directive(v, directives[v])
    })

    // 同步路由状态(route state)到 store
    sync(store, router)

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })

    return {
        app,
        router,
        store
    }
}