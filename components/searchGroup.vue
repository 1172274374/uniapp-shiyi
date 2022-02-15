<template>
	<view>
		<view class="header">
			<!-- 定位城市 -->
			<view class="addr">
				<view class="icon iconfont">&#xecb5;</view>
				<view class="add_text">{{city[Math.floor(Math.random()*5)]}}</view>
			</view>
			
			<!-- 搜索框组 -->
			<view class="input-box">
				<input type="text" placeholder="默认关键字" disabled placeholder-style="color:#c0c0c0;" @click="onClickInput" />
				<view class="icon iconfont" @click="onClickCameraIcon">&#xe62f;</view>
			</view>
			
			<!-- 右侧扫码button -->
			<view class="icon-btn">
				<view class="icon iconfont" @click="onClickScanCodeIcon">&#xe727;</view>
			</view>
		</view>
		<!-- 占位盒子（header盒子时fixed的，它会覆盖部分正文内容） -->
		<view class="place"></view>
	</view>
</template>

<script>
	import { mapMutations } from "vuex"
	export default {
		name: "searchGroup",
		props: ["url"],
		data() {
			return {
				city: ["广州",'上海','武汉','天津','武汉']
			}
		},
		mounted(){
			console.log(this)
		},
		methods: {
			// 搜索按钮的点击事件
			onClickInput() {
				this.setUrl(this.url)
				uni.navigateTo({
					url: "/pages/search/searchHistory"
				})
			},
			// 搜索框的相机icon
			onClickCameraIcon() {
				uni.chooseImage({
				  	count: 1,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['camera','album'], //这要注意，camera掉拍照，album是打开手机相册
				    success: (res)=> {
							this.$emit("camera", res)
				    }
				});
			},
			// 搜索框的扫描二维码icon
			onClickScanCodeIcon() {
				uni.scanCode({
					onlyFromCamera: false,  // 是否只能从相机扫码，不允许从相册选择图片
					success: res => {
						this.$emit("scanCode", { data: res.result})
					},
					fail: res => {
						uni.showToast({ title: "未知原因导致扫码失败", icon: "none" })
					}
				})
			},
			...mapMutations({
				setUrl: 'search/setUrl'
			})
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		width: 100%;
		height: 100upx;
		display: flex;
		position: fixed;
		z-index: 10;
		align-items: center;
		background-color: #fff;
		box-shadow: 0px 0px 5px #d9d9d9;
		// border-radius: 10px;
	
		.addr {
			width: 120upx;
			height: 60upx;
			display: flex;
			flex-shrink: 0;
			align-items: center;
			font-size: 28upx;
			.icon {
				height: 60upx;
				margin-right: 5upx;
				display: flex;
				align-items:center;
				font-size: 5vw;
				color: #ff0000;
			}
			.add_text{
				color: #ff557f;
			}
		}
		.input-box {
			width: 100%;
			height: 60upx;
			background-color: #f5f5f5;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;
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
				font-size: 28upx;
			}
		}
		.icon-btn {
			width: 60upx;
			height: 60upx;
			display: flex;
			.icon {
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 6vw;
				color: #afafaf;
			}
		}
	}
	.place {
		background-color: #ffffff;
		width: 100%;
		height: 140upx;
	}
</style>
