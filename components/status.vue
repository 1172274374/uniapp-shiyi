<template>
	<!-- 状态栏 -->
	<view class="status" :class="classObj"></view>
</template>

<script>
	export default {
		name: "status",
		props: {
			bgColor: {
				type: String,
				default: "public-bg-default"
			}
		},
		data() {
			return {}
		},
		computed: {
			classObj() {
				const obj = {}
				switch (this.bgColor){
					case "public-bg-default":
						obj["public-bg-default"] = true
						break;
					case "public-bg-red":
						obj["public-bg-red"] = true
						break;
					default:
						break;
				}
				return obj
			}
		}
	}
</script>

<style lang="scss" scoped>
	.status {
		width: 100%;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		height: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height); //覆盖样式
		/*  #endif  */
	}
	.public-bg-default {
		background-color: $public-bg-default;
	}
	.public-bg-red {
		background-color: $public-bg-red;
	}
</style>
