<!--
 * @Author: shallwe
 * @Date: 2019-11-06 15:17:42
 * @LastEditTime : 2020-01-19 11:12:19
 * @LastEditors  : shallwe
 -->
<template>
	<div v-if="show" style="background: #eee;">
		<div class="wrapper" style="display: flex; flex-wrap: wrap;">
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
						<div
							v-img="{
								url: item.cover || 'https://source.unsplash.com/random/600x200',
								alt: '博客封面图'
							}"
							class="img"
						></div>
					</div>
					<div :class="[idx % 6 === 0 ? 'content-large' : 'content']">
						<span class="content-tag">{{ item.classification.label }}</span>
						<h4 class="content-title">{{ item.title }}</h4>
						<div class="content-intro">
							{{ item.introduction }}
						</div>
						<p class="content-view">{{ item.pageviewsCount || 0 }}浏览</p>
					</div>
				</a>
			</article>
		</div>
		<div class="wrapper">
			<el-pagination
				class="pagination-large"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="pageInfo.page"
				:page-size="pageInfo.pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="pageInfo.count"
			>
			</el-pagination>
		</div>
	</div>
</template>

<script>
export default {
	metaInfo() {
		return {
			title: '博客列表'
		}
	},
	data() {
		return {
			show: false,
			listType: '',
			redirectPrex: '/detail/',
			pageInfo: {
				page: 1,
				pageSize: 10,
				count: 0
			}
		}
	},
	computed: {
		blogList() {
			return this.$store.state.blogList
		}
	},
	methods: {
		getBlogList(success, fail) {
			let { page, pageSize } = this.pageInfo
			let loading = this.$loading()
			this.$store
				.dispatch('getBlogLists', {
					page,
					pageSize
				})
				.then(res => {
					loading && loading.close()
					if (!res.code) {
						let data = res.data
						this.pageInfo.count = data.count
					}
					success && success(res)
				})
				.catch(err => {
					loading && loading.close()
					fail && fail(err)
				})
		},
		handleSizeChange(pageSize) {
			this.pageInfo.pageSize = pageSize
			this.getBlogList()
		},
		handleCurrentChange(page) {
			this.pageInfo.page = page
			this.getBlogList()
		}
	},
	created() {
		// let { type } = this.$route.query
		try {
			// 不同类型列表
			// if (type === 2) {

			// } else if () {

			// } else
			this.getBlogList(() => {
				this.show = true
			})
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
.pagination-large {
	display: none;
}
.pagination-small {
	display: block;
	text-align: right;
	margin: 0 20px 40px;
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
	.content-large .content-intro {
		max-height: 9rem;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 6;
		overflow: hidden;
	}
	.pagination-large {
		text-align: right;
		margin: 0 20px 40px;
		display: block;
	}
	.pagination-small {
		display: none;
	}
}
</style>
