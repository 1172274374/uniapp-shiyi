<template>
	<view class="spec-dialog" v-show="dialogData.isShow">
		<!-- 遮罩层 -->
		<view class="mask" @tap="hideDialog()"></view>
		
		<!-- 白色框 -->
		<view class="layer">
			<!-- 内容区域 -->
			<view class="content">
				<!-- 规格选择 -->
				<view class="select-spec" v-for="(specItem, index) of dialogData.spec" :key="specItem.name">
					<view>选择{{ specItem.text }}:</view>
					<view class="items-group">
						<view
							v-for="(item, z) of specItem.list"
							:key="item"
							@tap="onClickItem(item, z, specItem, index)"
							:class="{ 'selected': selectSpecItemList[index] && item == selectSpecItemList[index].type }"
							class="item"
							>
							{{ item }}
						</view>
					</view>
				</view>
				
				<!-- 分割线 -->
				<view class="split-line"></view>
				
				<!-- 数量 -->
				<view class="pay-quantity">
					<view class="text">数量</view>
					<Counter :numberObj="goodsInfo"></Counter>
				</view>
			</view>
			<!-- 确认按钮 -->
			<view class="confirm-btn" @tap="onClickConfirmBtn">确认</view>
		</view>
	</view>
</template>

<script>
	/*
	dialogData: {  // 传递给规格弹框的数据
		isShow: false,
		spec: [
			{ name: "size", list: ["xs", "s"], text: "尺寸" },
			{ name: "color", list: ["红", "白"], text: "颜色" },
			{ name: "model", list: ["A", "B"], text: "型号" }
		]
	}
	
	selectSpecItemList: [{ name: "xs", type: "红", text: 颜色 }, {...}, {...}]
	*/
	import Counter from "./counter.vue"
	export default {
		props: {
			dialogData: {  // 弹出框初始化时需要传入的对象
				type: Object,
				default: function() { return {} }
			},
			goodsInfo: {  // 商品详情信息
				type: Object,
				default: function() { return {} }
			},
			defaultSelected: {  // 默认选中的规格
				type: Array,
				default: function() { return [] }
			}
		},
		data() {
			return {
				selectSpecItemList: [],
				vaildFormObj: {  // 定义合法的form表单对象，用户每次弹框弹前或关闭后，初始化数据。
					spec: []
				},
				number: 1,  // 选择的商品数量
			}
		},
		components: { Counter },
		watch: {
			defaultSelected: {
				handler: function(newVal, oldVal) {
					this.$set(this.$data, "selectSpecItemList", JSON.parse(JSON.stringify(newVal)))
					this.$set(this.vaildFormObj, "spec", JSON.parse(JSON.stringify(newVal)))
				},
				immediate: true
			}
		},
		methods: {
			// 每种规格中的button的点击事件
			onClickItem(item, z, specItem, index) {  // 红  0  { name: "size", list: ["xs", "s"], text: "尺寸" }  0
				if (this.selectSpecItemList[index] && this.selectSpecItemList[index].type === item) {  // 如果此2级规格项已被选中，则取消选中
					this.$set(this.selectSpecItemList, index, {})
				} else {
					this.$set(this.selectSpecItemList, index, { name: specItem.name, type: item, text: specItem.text })
				}
			},
			
			// 确认按钮的点击事件
			onClickConfirmBtn() {
				const flag = this.isTheFormVaild()
				if (flag) {
					const spec =JSON.parse(JSON.stringify(this.selectSpecItemList))
					const specText = spec.map(item => item.text + item.type).join("/")  // specText = xs/红/A
					this.$emit("onChangeSelectedSpecList", { spec, specText })
					this.$set(this.vaildFormObj, "spec", spec)
					this.hideDialog()
				}
			},
			
			// 判断弹出框中的表单，用户是否填写好了
			isTheFormVaild() {
				let arr = this.selectSpecItemList
				let str = ""
				this.dialogData.spec.forEach((item, index) => {
					// 如果有哪个规格没选，则弹出提示
					if (!arr[index] || !arr[index].text) {
						str += item.text + "、"
					}
				})
				if (str) {  // 如果str不为空
					uni.showToast({
						title: "请选择" + str.slice(0, str.length - 1),
						icon: "none"
					})
					return false
				} else {
					return true
				}
			},
			
			// 弹出框的隐藏事件
			hideDialog() {
				this.dialogData.isShow = false;
				this.$set(this.$data, "selectSpecItemList", JSON.parse(JSON.stringify(this.vaildFormObj.spec)))
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 按钮选中态的样式
	.selected {
		background-color: #fff9f9 !important;
		color: #e49a81 !important;
		outline: 2upx solid #cd6f54 !important;
	}
	.spec-dialog {
		position: fixed;
		z-index: 444;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		
		// 遮罩层
		.mask {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
			width: 100vw;
			height: 100vh;
			background: rgba($color: #000000, $alpha: 0.5);
		}
		
		// 白色框
		.layer {
			position: absolute;
			bottom: 0;
			z-index: 444;
			box-sizing: border-box;
			width: 100vw;
			height: 70%;
			font-size: 30upx;
			padding: 40upx 20upx 20upx;
			background-color: #fff;
			border-top-right-radius: 8upx;
			border-top-left-radius: 8upx;
			
			// 内容区域
			.content {
				font-size: 30upx;
				font-weight: bold;
				
				// 选择规格
				.select-spec {
					margin-bottom: 40upx;
					
					// 选择规格文本描述
					.items-text {
						color: #000;
						font-weight: bold;
					}
					
					// 规格按钮组
					.items-group {
						display: flex;
						height: 50upx;
						.item {
							display: flex;
							justify-content: center;
							align-items: center;
							box-sizing: border-box;
							height: 50upx;
							min-width: 60upx;
							border-radius: 4rpx;
							background-color: #f0f1ec;
							padding: 0 10upx;
							margin-top: 8upx;
							color: #b1b1b1;
						}
						.item + .item {
							margin-left: 16upx;
						}
					}
				}
			
				// 分割线
				.split-line {
					margin: 40upx 0 20upx;
					border-top: 1px solid #000;
				}
				
				// 数量
				.pay-quantity {
					display: flex;
					justify-content: space-between;
				}
			}
			
			// 确认按钮
			.confirm-btn {
				position: absolute;
				bottom: 30upx;
				width: calc(100vw - 40upx);
				height: 100upx;
				line-height: 100upx;
				text-align: center;
				border-radius: 50upx;
				background-color: #f06b4a;
			}
		}
	}
</style>
