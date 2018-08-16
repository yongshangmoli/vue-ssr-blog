<template>
    <div class="home-wrapper">
        <div class="home">home</div>
        <button @click="clickHandle">click me</button>
        <ul>
            <li v-for="item in list" :key="item.id">{{ item.name }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'home',
        asyncData({ store, route }) {
            return store.dispatch('getList')
        },
        title: 'home',
        methods: {
            clickHandle() {
                const num = Math.random()
                console.log(`click ${num}`)
            }
        },
        computed: {
            list() {
                return this.$store.state.list
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .home-wrapper
        transition all 0.3s
        .home
            cursor pointer
</style>
