<template>
	<view class="counter">
		<view class="sub" @tap.stop="sub()">-</view>
		<input type="text" :value="numberObj.number" class="input" />
		<view class="add" @tap="add()">+</view>
	</view>
</template>

<script>
	export default {
		name: "Counter",
		props: {
			numberObj: { type: Object, default() { return {} } }
		},
		data() {
			return {}
		},
		methods: {
			// 减号按钮的点击事件
			sub() {
				if (this.numberObj.number <= 1) return
				this.numberObj.number--
			},
			add() {
				this.numberObj.number++
			}
		}
	}
</script>

<style lang="scss" scoped>
	.counter {
		display: flex;
		width: 280upx;
		height: 40upx;
		.sub, .add {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 80upx;
			height: 60upx;
			background-color: #f5f5f5;
			font-size: 40upx;
			color: #c0c0c0;
		}
		.input {
			flex: 1;
			height: 60upx;
			text-align: center;
			background-color: #f5f5f5;
			margin: 0 8upx;
		}
	}
</style>
