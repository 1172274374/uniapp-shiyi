<template>
	<view class="search-header">
		<!-- 左侧箭头 -->
		<view class="icon iconfont go-back-btn" @click="onClickGoBack">&#xe7ed;</view>
		<!-- 搜索框 -->
		<view class="input-box">
			<input type="text" v-model="searchText" placeholder="默认关键字" focus />
			<view class="icon iconfont" v-show="searchText" @click="searchText = ''">&#xe6dc;</view>
		</view>
		<!-- 搜索 -->
		<view class="text" @click="onClickSearchBtn">搜索</view>
	</view>
</template>

<script>
	export default {
		name: "searchHeader",
		data() {
			return {
				searchText: ""
			}
		},
		mounted() {},
		methods: {
			// 返回按钮的点击事件，跳转到上一页
			onClickGoBack() {
				uni.navigateBack({
					delta:1
				})
			},
			// 搜索图标的点击事件，搜索商品
			onClickSearchBtn() {
				this.$emit("search", { value: this.searchText })
			},
			setSearchText(value) {
				this.searchText = value
				this.$emit("search", { value: this.searchText })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-header {
		position: fixed;
		z-index: 10;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height); //覆盖样式
		/*  #endif  */
		display: flex;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		height: 44px;
		padding: 0 2%;
		background-color: $public-red;
		// 返回按钮
		.go-back-btn {
			color: #FFFFFF;
			font-size: 60rpx;
		}
		
		// 搜索框
		.input-box {
			position: relative;
			flex: 1;
			display: flex;
			align-items: center;
			width: 100%;
			height: 60upx;
			background-color: #FFFFFF;
			border-radius: 30upx;
			.icon {
				display: flex;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 60upx;
				height: 60upx;
				font-size: 34upx;
				color: #c0c0c0;
			}
			input {
				padding-left: 28upx;
				height: 24upx;
				font-size: 28upx;
			}
		}
	
		// 搜索
		.text {
			color: #FFFFFF;
			margin-left: 30rpx;
			margin-right: 10rpx;
		}
	}
</style>
