<template>
    <div>
        <input type="text" v-model="message" class="input">
        <div>{{ message }}</div>
        <div>
            <router-link to="/">home</router-link>
            <router-link to="/about">about</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        metaInfo: {
            title: 'default title',
            titleTemplate: '%s - vue ssr'
        },
        data() {
            return {
                message: 'vue'
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .input
        font-size 16px
        border none
        border-bottom 1px solid #cccccc
</style>
