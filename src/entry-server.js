import { createApp } from './app'
import { createSSRApi } from './api'

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()

        router.push(context.url)
        context.meta = app.$meta()

        // 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                return reject({ code: 404 }) // eslint-disable-line
            }

            // 记录matchedComponents中对应.vue文件
            context.files = []
            // 创建携带cookie的api
            store.$api = store.state.$api = createSSRApi(context.cookie)

            Promise.all(matchedComponents.map(Component => {
                context.files.push(Component.__file)
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            }))
                .then(() => {
                    context.state = store.state
                    resolve(app)
                })
                .catch(reject)
        }, reject)
    })
}
