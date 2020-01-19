/*
 * @Author: shallwe
 * @Date: 2020-01-19 11:00:31
 * @LastEditTime : 2020-01-19 11:16:39
 * @LastEditors  : shallwe
 */
export default {
    img: {
        inserted: function (el, binding) {
            let color = Math.floor(Math.random() * 1000000)
            el.style.backgroundColor = `#${color}`
            let {
                alt,
                url
            } = binding.value
            let image = new Image()
            image.src = url
            image.alt = alt
            image.onload = function () {
                el.style.backgroundImage = `url(${url})`
            }
        }
    }
}
