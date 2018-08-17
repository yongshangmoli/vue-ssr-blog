<template>
    <div>
        <div class="about">about</div>
        <div>{{ message }}</div>
    </div>
</template>

<script>
    export default {
        name: 'about',
        metaInfo: {
            title: 'about',
            meta: [
                {
                    'property': 'og:title',
                    'content': 'Test title',
                    'template': chunk => `${chunk} - My page`, //or as string template: '%s - My page',
                    'vmid': 'og:title'
                }
            ]
        },
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
