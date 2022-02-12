<template>
	<view class="top_search">
		<view class="tip">
			{{title}}
		</view>
		<view class="icon iconfont">&#xe63b;</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		setup(){
			let state = reactive({
				title:'123'
			})
			
			return {...toRefs(state)}
		}
	}
</script>

<style lang="scss">
	.top_search{
		width: 100%;
		height: 50upx;
		background: red;
		position: relative;
		
		.icon{
			position: absolute;
			top: 0;
			left: 0;
			font-size: 20px;
			color: yellow;
			
		}
	}
</style>
