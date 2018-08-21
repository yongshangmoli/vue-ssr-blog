import { createApp } from './app'

export default context => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()

        // 设置服务器端 router 的位置
        router.push(context.url)
        context.meta = app.$meta()

        // 等到 router 将可能的异步组件和钩子函数解析完
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()
            if (!matchedComponents.length) {
                return reject({ code: 404 }) // eslint-disable-line
            }

            Promise.all(matchedComponents.map(Component => {
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
