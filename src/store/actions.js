/*
 * @Author: shallwe
 * @Date: 2019-12-10 11:19:45
 * @LastEditTime: 2019-12-10 16:54:15
 * @LastEditors: shallwe
 */
import { getBlogList } from '../api/blog'

export const getList = ({ commit }) => {
    return new Promise(resolve => {
        getBlogList().then(res => {
            // console.log(11111, res)
            // commit('setList', res.blogList)
            resolve([{
                name: res.msg,
                id: 33
            }])
        })
    })
}
