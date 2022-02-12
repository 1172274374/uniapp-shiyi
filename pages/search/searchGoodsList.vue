<template>
	<view class="search-goods-page">
		<!-- 状态栏 -->
		<page-status :bgColor="'public-bg-red'" />
		<!-- 顶部搜索框 -->
		<searchHeader ref="header" :searchValue="searchValue" @go-back="onClickGoBtnBtn" @search="onClickSearchBtn" />
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="goods" v-for="(item, index) of goodsList" :key="index" @click="onClickGoodsItem(item)">
				<!-- 图片 -->
				<image :src="item.img" class="img"></image>
				<!-- 右侧内容 -->
				<view class="content">
					<!-- 商品名称 -->
					<view class="name">{{ item.name }}</view>
					<!-- 规格列表 -->
					<!-- <view class="spec-list">
						<view class="spec" v-for="(specItem) of item.spec" :key="specItem.type">{{ specItem.type }}</view>
						<view class="spec">数量:{{ item.number }}</view>
					</view> -->
					<!-- 价格与数量 -->
					<view class="price-group">
						<view class="price">￥{{ item.price }}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品列表底部的加载中文本 -->
		<view class="loading-text">{{loadingText}}</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import searchHeader from "./components/searchHeader.vue"
	import SearchRequestModule from "../../utils/module/search.js"
	export default {
		name: "searchGoodsList",
		data() {
			return {
				searchValue: {},
				goodsList: [],  // 后台返回的商品列表
				filterby: "all",  // 搜索的类别
				page: 1,
				size: 8,
				loadingText:"正在加载...",
			}
		},
		components: { searchHeader },
		computed: {
			...mapState({
				url: state => state.search.url
			})
		},
		onLoad(option) {
			this.searchValue.value = option.value
			this.$nextTick(() => {
				this.$refs.header.setSearchText(option.value)
			})
		},
		// 页面下拉刷新事件
		onPullDownRefresh() {
			setTimeout(() => {
				this.page = 1
				this.goodsList = []
				this.loadingText = "正在加载..."
				this.loadData()
				uni.stopPullDownRefresh()
			}, 1000)
		},
		// 页面上拉加载事件
		onReachBottom() {
			this.page++
			this.loadData()
		},
		methods: {
			// 加载商品分类的数据
			async loadData() {
				uni.showLoading({ title: "加载中...", mask: true })
				const res = await SearchRequestModule.getGoodsListBySearch({ filterby: this.filterby, page: this.page, size: this.size })
				this.$nextTick(() => {
					setTimeout(() => uni.hideLoading(), 500)
				})
				if(res.data.length>0) {
					res.data.forEach(item=>{
						this.goodsList.push(item)
					})
				}
				else {
					this.loadingText = '到底了'
				}
			},
			// 返回上一页按钮的点击事件
			onClickGoBtnBtn() {
				uni.switchTab({ url: this.url })
			},
			// 搜索按钮的点击事件
			onClickSearchBtn(data) {
				if (data.value !== "") {
					this.setSearchHistoryArrStorage(data.value)
				}
				this.loadData()
			},
			// 每个商品的点击事件
			onClickGoodsItem(goods) {
				uni.navigateTo({
					url: "/pages/goods/goods?goodsInfo=" + JSON.stringify(goods)
				})
			},
			
			// 将搜索框中的文本，push到storage中
			setSearchHistoryArrStorage(value) {
				let historyArr = uni.getStorageSync("searchHistoryArr")
				if ([null, undefined, ""].includes(historyArr)) {  // 如果searchHistoryArr未定义
					uni.setStorageSync("searchHistoryArr", [])
					historyArr = uni.getStorageSync("searchHistoryArr")
				}
				if (historyArr.indexOf(value) > -1) {  // 如果该搜索条件，在历史搜索中已经存在。则提取到数组第一位
					const index = historyArr.indexOf(value)
					const item = historyArr.splice(index, 1)[0]
					historyArr.unshift(item)
				}
				if (historyArr.indexOf(value) <= -1) {  // 如果该搜索条件，在历史搜索中不存在，则推入
					historyArr.push(value)
				}
				if (historyArr.length >= 15) { historyArr = historyArr.slice(0, 15) }
				uni.setStorageSync("searchHistoryArr", historyArr)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-goods-page {
		padding-top: 44px;
		/* #ifdef APP-PLUS */
		margin-top: var(--status-bar-height);;
		/* #endif */
	}
	// 包裹着某个商品的外层view
	.goods-list {
		box-sizing: border-box;
		border-radius: 10upx;
		margin: 40upx 32upx;
		
		// 某一个商品（卡片）
		.goods {
			display: flex;
			align-items: center;
			box-sizing: border-box;
			width: 100%;
			border-radius: 16rpx;
			padding: 20upx;
			margin-top: 32rpx;
			box-shadow: 0 0 4px #CCCCCC;
			.img {
				width: 180upx;
				height: 180upx;
				border-radius: 10upx;
				margin-right: 12upx;
			}
			// 右侧内容
			.content {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				height: 180upx;
				// 商品名称
				.name {
					overflow: hidden;
					text-overflow: -o-ellipsis-lastline;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					line-clamp: 2;
					-webkit-box-orient: vertical;
					font-size: 32upx;
				}
				// 规格列表
				.spec-list {
					display: flex;
					margin-top: 10upx;
					.spec {
						display: flex;
						justify-content: center;
						align-items: center;
						box-sizing: border-box;
						height: 30upx;
						min-width: 30upx;
						font-size: 24upx;
						color: #b1b1b1;
						background-color: #f0f1ec;
						padding: 0 10upx;
						margin-top: 8upx;
					}
					.spec + .spec {
						margin-left: 16upx;
					}
				}
				.price-group {
					display: flex;
					justify-content: space-between;
					height: 40upx;
					margin-top: 20upx;
					font-size: 32upx;
					color: #F06C7A;
					.price {
						display: flex;
						align-items: center;
					}
				}
			}
		}
	}

	.loading-text{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60upx;
		color: #979797;
		font-size: 24upx;
	}
</style>
