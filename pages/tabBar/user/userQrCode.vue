<template>
	<view class="qr-code-page">
		<view class="position-box">
			<view class="code">
				<component v-bind:is="componentName" ref="uQRCode" :text="text"></component>
			</view>
		<view><button class="save-btn" @click="toTempFilePath">保存图片</button></view>
		</view>
	</view>
</template>

<script>
	import uqrcode from "@/uni_modules/Sansnn-uQRCode/components/uqrcode/uqrcode.vue"
	export default {
		name: "userQrCodePae",
		components: { uqrcode },
		data() {
			return {
				componentName: "",
				text: ""
			}
		},
		onReady() {
			setTimeout(() => {
				this.createQRCode()
			}, 50)
		},
		methods: {
			toTempFilePath() {
				this.$refs.uQRCode.toTempFilePath({
					success: res => {
						this.$nextTick(function(){
							this.$refs.uQRCode.save({
								success: res => {
									uni.showToast({
										title: "图片保存成功",
										icon: "none"
									})
								}
							})
						})
					}
				})
			},
			createQRCode() {
				this.text = "我是帅哥"
				this.componentName = "uqrcode"
			}
		}
	}
</script>

<style lang="scss" scoped>
	.qr-code-page {
		position: relative;
		height: 100vh;
		background: linear-gradient(180deg, #fff 40%, #F06C7A 40.5%, #F06C7A 100%);
		.position-box {
			position: absolute;
			top: 10%;
			left: 50%;
			transform: translateX(-50%);
			// 二维码外层的view
			.code {
				padding: 60rpx;
				background-color: #FFFFFF;
			}
			// 保存图片按钮
			.save-btn {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 236rpx;
				height: 90rpx;
				background: linear-gradient(270deg, #FCAA51 50%, #f7dcb6 100%);
				margin-top: 40rpx;
				color: rgba($color: #000000, $alpha: 0.7);
			}
		}
	}
</style>
