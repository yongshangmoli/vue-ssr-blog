<template>
    <div>
        <div class="about">about</div>
        <div>{{ message }}</div>
    </div>
</template>

<script>
    export default {
        name: 'about',
        title: 'about',
        data() {
            return {
                message: 'test'
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .about
        opacity 0.7
</style>
