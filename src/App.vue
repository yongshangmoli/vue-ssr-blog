<!--
 * @Author: shallwe
 * @Date: 2019-12-10 11:19:45
 * @LastEditTime: 2019-12-11 14:45:07
 * @LastEditors: shallwe
 -->
<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        metaInfo: {
            title: 'shallwe的blog'
        // titleTemplate: "%s - vue ssr"
        },
        data() {
            return {}
        }
    }
</script>

<style lang="less">
:root {
    --global-bg: #171d25;
    --global-bg-light: #2a3340;
    --global-color: #fff;
    --global-active: #14b7f4;
    --round-size: 260px;
    --round-size-sgap: 20px;
    --round-size-lgap: 120px;
    --module-size-active: 120px;
    --module-bg-size: 100px;
    --round-size-inner1: calc(var(--round-size) - var(--round-size-sgap));
    --round-size-out1: calc(var(--round-size) + var(--round-size-lgap));
    --module-size: calc(var(--module-bg-size) - var(--round-size-sgap));
}
html,
body {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow-x: hidden;
}
html,
body,
span,
div,
h1,
h2,
h3,
h4,
p,
ul,
li,
a,
textarea,
input,
figure {
    padding: 0;
    margin: 0;
    font-weight: normal;
}
body {
    background: var(--global-bg);
    color: var(--global-color);
}
.full {
    height: 100%;
    box-sizing: border-box;
}
</style>
