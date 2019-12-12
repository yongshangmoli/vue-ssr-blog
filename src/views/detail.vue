<!--
 * @Author: shallwe
 * @Date: 2019-11-08 11:36:42
 * @LastEditTime: 2019-12-12 16:16:54
 * @LastEditors: shallwe
 -->
<template>
    <el-row
        v-if="blogDetail"
        :gutter="10"
        type="flex"
        justify="center"
        class="container"
    >
        <el-col :xs="24" :sm="16" :md="12" :lg="10" :xl="10">
            <div class="article">
                <h1>{{ blogDetail.title }}</h1>
                <p class="icon-wrapper">
                    <span
                        ><i class="el-icon-date" />{{
                            blogDetail.createTime || "--"
                        }}</span
                    >|
                    <span
                        ><i class="el-icon-message" /><span>{{
                            comment.length || 0
                        }}</span>
                        评论</span
                    >|
                    <span
                        ><i class="el-icon-view" /><span>{{
                            blogDetail.pageviewsCount || 0
                        }}</span>
                        浏览</span
                    >
                </p>
                <p v-if="blogDetail.introduction" class="intro">
                    简介：{{ blogDetail.introduction }}
                </p>
                <hr class="gap" />
                <section class="wrapper" v-html="blogDetail.text" />
                <div id="disqus_thread"></div>
            </div>
        </el-col>
        <el-col :xs="0" :sm="8" :md="6" :lg="4" :xl="4">
            <ul class="wrapper no-style">
                <li>
                    <p class="proverb">stay foolish, <br />stay hungry</p>
                </li>
                <li class="label-part">
                    <h4>文章标签</h4>
                    <template v-if="blogDetail.label.length">
                        <a
                            v-for="(item, idx) in blogDetail.label"
                            :key="idx"
                            href="javascript:;"
                            ><span class="tag">{{ item }}</span></a
                        >
                    </template>
                    <div v-else class="no-list">暂无</div>
                </li>
                <li class="article-part">
                    <h4>热门文章</h4>
                    <ul v-if="hotArticle.length">
                        <li v-for="(item, idx) in hotArticle" :key="idx">
                            <a :href="item.url">{{ item.name }}</a>
                        </li>
                    </ul>
                    <div v-else class="no-list">暂无</div>
                </li>
            </ul>
        </el-col>
    </el-row>
    <div v-else class="no-info">
        没有查到博客信息哦
    </div>
</template>

<script>
    export default {
        metaInfo() {
            return {
                title: this.blogDetail.title,
                meta: [
                    {
                        // set meta
                        name: 'description',
                        content: this.blogDetail.introduction
                    },
                    {
                        name: 'keywords',
                        content: this.blogDetail.label.join(' ')
                    }
                ]
            }
        },
        data() {
            return {
                comment: [],
                pageviewsCount: 5,
                hotArticle: []
            }
        },
        computed: {
            blogDetail() {
                return this.$store.state.blogDetail
            }
        },
        validate({ params }) {
            return params.id && /^\w+$/.test(params.id)
        },
        created() {
        // console.log(222222222, this.blogDetail);
        },
        asyncData({ store, route }) {
            let { id } = route.query
            return store.dispatch('getBlogDetails', {
                blogId: id
            })
        },
        mounted() {
            var disqus_config = function() {
                this.page.url = 'localhost' // Replace PAGE_URL with your page's canonical URL variable
                this.page.identifier = this.blogId // Replace PAGE_IDENTIFIER with your page's unique identifier variable
            };
            (function() {
                // DON'T EDIT BELOW THIS LINE
                var d = document
                var s = d.createElement('script')
                s.src = 'https://supervv.disqus.com/embed.js'
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s)
            })()
        }
    }
</script>

<style lang="less">
.article {
    img {
        max-width: 100% !important;
        height: auto !important;
    }
}
</style>
<style scoped lang="less">
a {
    text-decoration: none;
}
.container {
    padding: 1rem;
}
.wrapper {
    margin: 1rem 0.4rem;
    /* background: #fff; */
}
.no-list {
    padding: 0.3rem 1rem;
}
.no-style {
    color: #b8b8b8;
    li {
        list-style: none;
    }
    .proverb {
        background: #1d242e;
        padding: 1.6rem;
        line-height: 1.5;
        color: #eee;
    }
    .label-part,
    .article-part {
        margin: 2.4rem 0;
        border-bottom: 1px solid #1d343e;
        padding-bottom: 2rem;
        h4 {
            padding: 0.6rem;
            border-bottom: 2px solid #14bfff;
            color: #eee;
        }
    }
    .label-part {
        a {
            margin-top: 1rem;
            display: flex;
            color: #999;
        }
        .tag {
            padding: 0.2rem 0.4rem;
            font-size: 12px;
            border: 1px solid #728395;
            border-radius: 4px;
        }
    }
    .article-part {
        ul {
            padding-left: 1rem;
        }
        li {
            padding: 0.6rem 0;
            word-break: break-word;
            text-align: justify;
        }
        a {
            color: #ddd;
        }
    }
}
.icon-wrapper {
    color: #b8b8b8;
    i {
        margin-right: 0.5rem;
    }
    > span {
        margin: 0 1rem 0;
    }
    span:first-child {
        margin-left: 0;
    }
}
.intro {
    font-family: "STFangsong";
    line-height: 1.5;
    letter-spacing: 0.1rem;
    padding: 1.5rem 0;
}
.gap {
    margin-bottom: 3rem;
    height: 2px;
    background: #728395;
    border: #728395;
}
.no-info {
    text-align: center;
    padding-top: 10rem;
}
</style>
