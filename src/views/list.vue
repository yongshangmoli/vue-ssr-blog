<!--
 * @Author: shallwe
 * @Date: 2019-11-06 15:17:42
 * @LastEditTime: 2019-12-11 11:48:04
 * @LastEditors: shallwe
 -->
<template>
    <div class="wrapper">
        <article
            v-for="(item, idx) in blogList"
            :key="idx"
            :class="{ item: true, 'item-large': idx % 6 === 0 }"
        >
            <a
                :href="redirectPrex + '?id=' + item._id"
                :class="{ flex: idx % 6 === 0 }"
            >
                <div class="img-wrapper">
                    <img
                        :src="
                            item.cover ||
                                'https://source.unsplash.com/random/600x200'
                        "
                        alt="博客封面图"
                        class="img"
                    />
                </div>
                <div :class="[idx % 6 === 0 ? 'content-large' : 'content']">
                    <span class="content-tag">{{
                        item.classification.label
                    }}</span>
                    <h4 class="content-title">{{ item.title }}</h4>
                    <div class="content-intro">{{ item.introduction }}</div>
                    <p class="content-view">
                        {{ item.pageviewsCount || 0 }}浏览
                    </p>
                </div>
            </a>
        </article>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                listType: '',
                redirectPrex: '/detail/'
            }
        },
        computed: {
            blogList() {
                return this.$store.state.blogList
            }
        },
        methods: {
            getBlogData() {
                try {
                    // let { data } = await axios.get(`http://rap2api.taobao.org/app/mock/234367/example/1571736773079?id=${params.id}`)
                    // data = data.data
                    // console.log(11, context.data)
                    const count = 10
                    const template = {
                        pageviewsCount: 5,
                        url: 'javascript:;',
                        title: '博客',
                        classification: {
                            label: '分类1',
                            value: 'sdsds'
                        },
                        label: ['标签1'],
                        introduction:
                            '比如你可以听歌的同时，打开编辑器敲代码，编辑器和听歌软件的进程之间丝毫不会相互干扰。多线程：程序中包含多个执行流，即在一个程序中可以同时运行多个不同的线程来执行不同的任',
                        cover:
                            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                        createTime: '2019-10-20',
                        updateTime: '',
                        text:
                            '<h1>一、线程与进程</h1><p>多进程：在同一个时间里，同一个计算机系统中如果允许两个或两个以上的进程处于运行状态。多进程带来的好处是明显的，比如你可以听歌的同时，打开编辑器敲代码，编辑器和听歌软件的进程之间丝毫不会相互干扰。多线程：程序中包含多个执行流，即在一个程序中可以同时运行多个不同的线程来执行不同的任务，也就是说允许单个程序创建多个并行执行的线程来完成各自的任务。</p>'
                    }
                    let blogList = []
                    for (let i = 1; i < count; i++) {
                        blogList.push(template)
                    }
                    // return {
                    //     blogList
                    // };
                    this.blogList = blogList
                } catch (error) {
                    console.log(222, error)
                }
            }
        },
        created() {
            this.getBlogData()
            let { type } = this.$route.query
            try {
                // if (type === 2) {

                // } else if () {

                // } else
                // this.$store.dispatch('')
                this.$store.dispatch('getBlogLists')
            } catch (error) {}
        },
        validate({ params }) {
            // 必须是number类型
            return params.type && /^\w+$/.test(params.type)
        }
    }
</script>

<style lang="less" scoped>
.wrapper {
    max-width: 1040px;
    margin: 0 auto;
    padding: 20px 10px;
    position: relative;
    display: flex;
    flex-wrap: wrap;
}
.img-wrapper {
    height: 200px;
    text-align: center;
    overflow: hidden;
    display: flex;
    .img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
}
.content,
.content-large {
    padding: 25px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex: 1;
    .content-tag {
        margin-bottom: 4px;
        color: #738a94;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.1rem;
        text-transform: uppercase;
    }
    .content-title {
        color: #15171a;
        font-size: 18px;
        line-height: 24px;
        margin: 0.4rem 0 0.6rem;
    }
    .content-intro {
        line-height: 1.5;
        flex: 1;
    }
    .content-view {
        text-align: right;
        margin-top: 18px;
        color: #738a94;
    }
}
.content .content-intro {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.item,
.item-large {
    flex: 1 1 300px;
    overflow: hidden;
    margin: 0 20px 40px;
    min-height: 300px;
    border-radius: 5px;
    // box-shadow: 8px 14px 38px rgba(39,44,49,0.06), 1px 3px 8px rgba(39,44,49,0.03);
    box-shadow: 8px 14px 38px rgba(0, 0, 0, 0.1), 1px 3px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    // background-color: rgba(23,29,37,0.1)
    background-color: #fff;
    a {
        text-decoration: none;
        color: #000;
    }
}
@media (min-width: 1024px) {
    .flex {
        display: flex;
    }
    .item-large {
        flex-direction: row;
        flex: 1 1 100%;
        max-height: 200px;
        .img-wrapper {
            flex: 1;
            min-width: 600px;
            height: auto;
        }
        .content-large {
            padding: 30px 40px;
            width: 357px;
            flex: unset;
        }
    }
}
</style>
