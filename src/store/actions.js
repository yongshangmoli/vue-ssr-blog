export const getList = ({ commit }) => {
    const list = [
        { name: 'A', id: 1 },
        { name: 'B', id: 2 },
        { name: 'C', id: 3 },
    ]

    return new Promise(resolve => {
        setTimeout(() => {
            commit('setList', list)
            resolve()
        }, 1000)
    })
}
