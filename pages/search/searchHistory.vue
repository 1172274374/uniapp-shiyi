<template>
	<view class="search-history">
		<!-- 状态栏 -->
		<page-status :bgColor="'public-bg-red'" />
		<!-- 顶部搜索框 -->
		<searchHeader @go-back="onClickGoBtnBtn" @search="onClickSearchBtn" />
		<!-- 搜索历史 -->
		<view class="history-group">
			<view class="title">
				<view class="text">搜索历史</view>
				<view class="icon iconfont" v-show="this.historyArr.length > 0" @click="onClickDeleteHistoryBtn">&#xe699;</view>
			</view>
			<view class="group">
				<view class="item" v-for="(item, index) of showHistoryArr" :key="index" @click="onClickSearchHistoryItem(item)">{{ item }}</view>
				<view class="icon iconfont item arrow" v-show="this.historyArr.length > 7 && showHistoryArr.length <= 7" @click="onClickHistoryIcon()">&#xe7b2;</view>
				<view class="icon iconfont item arrow" v-show="this.historyArr.length > 7 && showHistoryArr.length > 7" @click="onClickHistoryIcon()">&#xe745;</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from "vuex"
	import searchHeader from "./components/searchHeader.vue"
	export default {
		name: "searchHistory",
		data() {
			return {
				historyArr: [],  // 历史的搜索记录
				showHistoryArr: [],  // 用于展示的历史记录
				isShrink: true,  // 收缩状态
			}
		},
		components: { searchHeader },
		mounted() {
			this.historyArr = uni.getStorageSync("searchHistoryArr") || []
			this.showHistoryArr = this.historyArr.length > 7 ? this.historyArr.slice(0, 7) : this.historyArr
		},
		computed: {
			...mapState({
				url: state => state.search.url
			})
		},
		methods: {
			// 返回上一页按钮的点击事件
			onClickGoBtnBtn() {
				uni.switchTab({
					url: this.url
				})
			},
			// 搜索按钮的点击事件
			onClickSearchBtn(data) {
				if (data.value !== "") {
					this.setSearchHistoryArrStorage(data.value)
				}
				uni.navigateTo({ url: "/pages/search/searchGoodsList?value=" + data.value })
			},
			// 搜索历史的删除事件
			onClickDeleteHistoryBtn() {
				uni.setStorageSync("searchHistoryArr", [])
				this.historyArr = []
				this.showHistoryArr = []
			},
			// 搜索历史中，某条历史的点击事件
			onClickSearchHistoryItem(item) {
				this.setSearchHistoryArrStorage(item)
				uni.navigateTo({ url: "/pages/search/searchGoodsList?value=" + item })
			},
			// 搜素历史中，icon图标的点击事件
			onClickHistoryIcon() {
				this.isShrink = !this.isShrink
				if (this.isShrink) { this.showHistoryArr = this.historyArr; return }
				this.showHistoryArr = this.historyArr.length > 7 ? this.historyArr.slice(0, 7) : this.historyArr
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
	.search-history {
		box-sizing: border-box;
		min-height: 100vh;
		background-color: $public-bg-gray;
		padding-top: 44px;
		
		// 搜索历史
		.history-group {
			margin-top: 40rpx;
			// 搜素历史
			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 30rpx 20rpx;
				.text {
					width: 100%;
					height: 60upx;
					font-size: 34upx;
					font-weight: 600;
					color: $public-title-black;
				}
				.icon {
					font-size: 52rpx;
				}
			}
			.group {
				display: flex;
				flex-wrap: wrap;
				.item {
					background-color: #FFFFFF;
					border: 1px solid $public-border-light-gray;
					border-radius: 30rpx;
					padding: 10rpx 20rpx;
					margin-left: 20rpx;
					margin-bottom: 20rpx;
				}
				.arrow {
					font-size: 40rpx;
				}
			}
		}
	}
</style>
