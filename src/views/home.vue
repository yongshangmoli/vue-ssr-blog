<template>
    <div>
        <div class="home">home</div>
        <button @click="clickHandle">click me</button>
    </div>
</template>

<script>
    export default {
        name: 'home',
        methods: {
            clickHandle() {
                const num = Math.random()
                console.log(`click ${num}`)
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .home
        cursor pointer
</style>
