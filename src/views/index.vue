<!--
 * @Author: shallwe
 * @Date: 2019-11-04 20:40:58
 * @LastEditTime: 2019-12-11 14:42:53
 * @LastEditors: shallwe
 -->
<template>
    <div class="full fix-pos">
        <a href="javescript:;">
            <img
                class="icon"
                src="https://cos-1252361573.cos.ap-chengdu.myqcloud.com/1538050406317_%E5%96%B5%20-%20%E5%89%AF%E6%9C%AC.gif"
                alt="头像"
            />
        </a>
        <el-row class="full row-width">
            <el-col
                :xs="24"
                :sm="12"
                :md="12"
                :lg="12"
                :xl="12"
                class="container full"
            >
                <div class="abs-pos left-wrapper">
                    <p class="proverbs">stay hungry</p>
                    <ul>
                        <span
                            :class="{
                                active: true,
                                active1: activeTabIdx === 1,
                                active2: activeTabIdx === 2
                            }"
                        ></span>
                        <li
                            v-for="(item, idx) in leftList"
                            :key="idx"
                            @mouseout="handleHover(item, idx)"
                            @click="handleHover(item, idx)"
                        >
                            <a :href="redirectPrex + item.url">
                                <h4 class="list-title">{{ item.title }}</h4>
                                <p class="list-desc">{{ item.desc }}</p>
                            </a>
                        </li>
                    </ul>
                    <p class="footer"><a href="javescript:;">关于网站</a></p>
                </div>
            </el-col>
            <el-col
                :xs="0"
                :sm="12"
                :md="12"
                :lg="12"
                :xl="12"
                class="container full"
            >
                <div class="ring">
                    <div class="img-r-out"></div>
                    <div class="img-r-out1"></div>
                    <div class="blue-r round">
                        <div class="white-r round container">
                            <!-- <div class="module-main">{{ roundParts[activeTabIdx].main.name }}</div>
              <div class="module-sub-left">{{ roundParts[activeTabIdx].left.name }}</div>
              <div class="module-sub-right">{{ roundParts[activeTabIdx].right.name }}</div> -->
                            <div class="module-main">PART 1</div>
                            <div class="module-sub-left">PART 2</div>
                            <div class="module-sub-right">PART 3</div>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    let timer
    function debounce(time, func) {
        return function() {
            let that = this
            let args = arguments

            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            timer = setTimeout(() => {
                func.apply(that, args)
                clearTimeout(timer)
                timer = null
            }, time)
        }
    }
    export default {
        data() {
            return {
                redirectPrex: '/list',
                activeTabIdx: 0,
                leftList: [
                    {
                        title: '首页',
                        desc: '查看最新博客',
                        url: '?type=1',
                        active: true
                    },
                    {
                        title: '专题',
                        desc: '分类查看',
                        url: '?type=2',
                        active: false
                    },
                    {
                        title: '归档',
                        desc: '按年份总结',
                        url: '?type=3',
                        active: false
                    }
                ],
                roundParts: [
                    {
                        main: {
                            name: 'PART 1'
                        },
                        left: {
                            name: 'PART 2'
                        },
                        right: {
                            name: 'PART 3'
                        }
                    },
                    {
                        main: {
                            name: 'PART 11'
                        },
                        left: {
                            name: 'PART 21'
                        },
                        right: {
                            name: 'PART 31'
                        }
                    }
                ]
            }
        },
        methods: {
            handleHover(item, idx) {
                let that = this
                debounce(300, () => {
                    that && (that.activeTabIdx = idx)
                })()
            }
        }
    }
</script>

<style lang="less" scoped>
.fix-pos {
    height: 100%;
    width: 100%;
    position: fixed;
}
.row-width {
    width: 60%;
    margin: auto;
}
.container {
    position: relative;
}
.round {
    border-radius: 50%;
}
.icon {
    position: absolute;
    border-radius: 10px;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
    top: 24px;
    left: 24px;
    height: 42px;
    width: 42px;
    background-size: cover;
}
.left-wrapper {
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    min-width: 250px;
}
.left-wrapper li {
    list-style: none;
}
.left-wrapper li a {
    display: block;
    padding: 0 12px 0 32px;
    height: 100px;
    text-decoration: none;
    position: relative;
}
.left-wrapper .active {
    content: " ";
    background: #00aeef;
    border-radius: 2px;
    display: block;
    position: absolute;
    left: 0;
    top: 122px;
    height: 80px;
    width: 6px;
    transition: all 300ms cubic-bezier(0.145, 1.075, 0.345, 1.12);
}
.left-wrapper .active1 {
    transform: translateY(100px) translateZ(0);
}
.left-wrapper .active2 {
    transform: translateY(200px) translateZ(0);
}
.list-title {
    letter-spacing: 0.1rem;
    color: #fff;
    display: inline-block;
    font: 24px/32px "D", "Lucida Grande", verdana, sans-serif;
    margin: 28px 0 10px;
    vertical-align: middle;
}
.list-desc {
    letter-spacing: 0.1rem;
    color: rgba(152, 175, 197, 0.7);
    display: block;
    font: 16px/18px "D", "Lucida Grande", verdana, sans-serif;
}
.ring,
.center-round,
.abs-pos {
    position: absolute;
}
.ring {
    width: var(--round-size-out1);
    height: var(--round-size-out1);
    top: 50%;
    left: 50%;
    margin-left: calc(0% - var(--round-size-out1) / 2);
    margin-top: calc(0% - var(--round-size-out1) / 2);
}
.blue-r {
    box-sizing: border-box;
    width: var(--round-size);
    height: var(--round-size);
    border: 2px solid var(--global-active);
    margin: calc(var(--round-size-lgap) / 2);
}
.white-r {
    box-sizing: border-box;
    width: var(--round-size-inner1);
    height: var(--round-size-inner1);
    border: 4px solid var(--global-color);
    margin: calc((var(--round-size-sgap) - 4px) / 2);
}
.module-main,
.module-sub-left,
.module-sub-right {
    position: absolute;
    width: var(--module-bg-size);
    height: var(--module-bg-size);
    background: var(--global-bg-light);
    border: calc(var(--round-size-sgap) / 2) solid var(--global-bg);
    border-radius: 50%;
    transition: all 0.3s linear;
    text-align: center;
    line-height: var(--module-bg-size);
}
.module-main {
    margin-left: calc(50% - var(--module-bg-size) / 2);
    margin-top: calc(0% - var(--module-bg-size) / 1.5);
    transform-origin: 50%
        calc(var(--round-size-inner1) - var(--round-size-lgap) / 2);
}
.module-main:hover {
    background: var(--global-active);
    transform: scale(1.2);
}
.module-sub-left,
.module-sub-right {
    top: 54%;
    cursor: pointer;
}
.module-sub-left:hover,
.module-sub-right:hover {
    color: var(--global-active);
}
.module-sub-left {
    left: calc(0% - var(--module-bg-size) / 2 - var(--round-size-sgap) / 2);
    transform-origin: calc(
            var(--round-size-inner1) - var(--round-size-lgap) / 2
        )
        0;
}
.module-sub-right {
    right: calc(0% - var(--module-bg-size) / 2 - var(--round-size-sgap) / 2);
    transform-origin: calc(
            0% - var(--round-size-inner1) / 2 + var(--round-size-lgap) / 2
        )
        0;
}
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.img-r-out {
    background: no-repeat center
        url("https://media.gyrosco.pe/images/zero/rings_desktop/1.png");
    -webkit-animation: spin 60s linear 0s infinite;
}
.img-r-out1 {
    background: no-repeat center
        url("https://media.gyrosco.pe/images/zero/rings_desktop/2.png");
    -webkit-animation: spin 60s linear 0s infinite reverse;
}
.img-r-out,
.img-r-out1 {
    position: absolute;
    background-size: cover;
    width: 100%;
    height: 100%;
}
.proverbs {
    color: #556374;
    display: inline-block;
    padding: 0 12px 80px 32px;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.6em;
    max-width: 16em;
    white-space: normal;
    -webkit-font-smoothing: antialiased;
    transition: all 600ms ease-out;
}
.footer {
    padding: 80px 12px 0 32px;
    font: 400 15px/18px "D", "Lucida Grande", verdana, sans-serif;
    -webkit-font-smoothing: antialiased;
}
.footer a {
    color: rgba(152, 175, 197, 0.45);
    text-decoration: none;
}
.footer a:hover {
    color: rgba(152, 175, 197);
    text-decoration: none;
}
</style>
