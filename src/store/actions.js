/*
 * @Author: shallwe
 * @Date: 2019-12-10 11:19:45
 * @LastEditTime: 2019-12-11 10:56:47
 * @LastEditors: shallwe
 */
import {
    getBlogList,
    getBlogDetail
} from '../api/blog'

export const getBlogLists = ({
    commit
}) => {
    return new Promise((resolve, reject) => {
        getBlogList().then(res => {
            // console.log(11111, res)
            commit('setBlogList', res.data.blogList)
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

export const getBlogDetails = ({
    commit
}, params) => {
    return new Promise((resolve, reject) => {
        getBlogDetail(params).then(res => {
            // console.log(11111, res)
            commit('setBlogDetail', res.data)
            resolve()
        }).catch(err => {
            reject(err)
        })
    })
}
