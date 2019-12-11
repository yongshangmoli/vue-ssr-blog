/*
 * @Author: shallwe
 * @Date: 2019-12-10 11:19:45
 * @LastEditTime: 2019-12-10 18:03:45
 * @LastEditors: shallwe
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
import App from './app.vue'

export function createApp() {
    const router = createRouter()
    const store = createStore()

    Vue.use(ElementUI)

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
