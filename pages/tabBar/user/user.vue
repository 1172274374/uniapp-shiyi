<template>
	<view class="user-page">
		<!-- 状态栏 -->
		<page-status :bgColor="'public-bg-red'" />
		<!-- 顶部栏 -->
		<view class="top">
			<view class="title">我的</view>
			<view class="icon-group">
				<view class="icon iconfont">&#xe8be;</view>
				<view class="icon iconfont">&#xe69a;</view>
			</view>
		</view>
		<!-- 头像与用户名 -->
		<view class="header">
			<view class="user-info">
				<!-- 头像 -->
				<view class="avatar">
					<image class="image" :src="user.image"></image>
				</view>
				<!-- 用户名 -->
				<view class="username">{{ user.name }}</view>
			</view>
			<!-- 二维码 -->
			<view class="qr-code">
				<view class="icon iconfont" @click="onClickQrCodeIcon">&#xe6ef;</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "userPage",
		data() {
			return {
				user: {
					image: "../../../static/img/face.jpg",
					name: "Mr.Lin",
				}
			}
		},
		methods: {
			onClickQrCodeIcon() {
				uni.navigateTo({
					url: "/pages/tabBar/user/userQrCode"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-page {
		width: 100%;
		height: 100%;
		/* #ifdef APP-PLUS */
		padding-top: var(--status-bar-height);
		/* #endif */
		// 顶部标题栏
		.top {
			position: relative;
			box-sizing: border-box;
			width: 100%;
			height: 44px;
			background-color: #F06C7A;
			
			// 顶部标题
			.title {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translateX(-50%) translateY(-50%);
				font-size: 16px;
				font-weight: 700;
				color: #FFFFFF;
			}
			// 顶部右侧图标组
			.icon-group {
				position: absolute;
				top: 50%;
				right: 20rpx;
				transform: translateY(-50%);
				display: flex;
				font-weight: 700;
				color: #FFFFFF;
				& .icon {
					font-size: 26px;
				}
			}
		}
		.header {
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			width: 100%;
			height: 220rpx;
			background-color: #F06C7A;
			padding: 10rpx 40rpx 0;
			margin-top: -1px;
			// 头像与用户栏
			.user-info {
				display: flex;
				height: 150rpx;
				align-items: center;
				// 头像
				.avatar {
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
					overflow: hidden;
					.image {
						width: 100%;
						height: 100%;
					}
				}
				// 用户名
				.username {
					font-size: 40rpx;
					color: #FFFFFF;
					margin-left: 20rpx;
				}
			}
			// 右侧
			.qr-code {
				display: flex;
				align-items: center;
				height: 150rpx;
				.icon {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					font-size: 48rpx;
					color: rgba($color: #000000, $alpha: 0.7);
					background: linear-gradient(270deg, #FCAA51, #f7dcb6);
				}
			}
		}
	}
</style>
