<template>
	<div class="goods-list-component">
		<!-- 购物车空空如也 -->
		<view class="no-data" v-show="goodsList.length === 0">购物车空空如也~~</view>
		<view class="goods-list">
			<view
				v-for="(item, index) of goodsList"
				:key="index" class="goods-box"
				:class="{ 'open': index === indexOpen, 'close': index === indexClose }"
				@touchstart="onTouchstart(index, $event)"
				@touchmove="onTouchmove(index, $event)"
				@touchend="onTouchend(index, $event)"
			>
				<view class="goods-container">
					<view class="goods">
						<!-- radio按钮 -->
						<view class="radio" @tap="onClickRadio(item)">
							<view class="ball" :class="{ 'show': item.selected }"></view>
						</view>
						<!-- 图片 -->
						<image :src="item.img" @tap="onClickImg(item)" class="img"></image>
						<!-- 右侧内容 -->
						<view class="content">
							<!-- 商品名称 -->
							<view class="name">{{ item.name }}</view>
							<!-- 规格列表 -->
							<view class="spec-list">
								<view class="spec" v-for="(specItem) of item.spec" :key="specItem.type">{{ specItem.type }}</view>
							</view>
							<!-- 价格与数量 -->
							<view class="price-group">
								<view class="price">￥{{ item.price }}</view>
								<Counter :numberObj="item" class="quantity" />
							</view>
						</view>
					</view>
				</view>
				<!-- 删除 -->
				<view class="delete-group" @tap="onClickDeleteBtn(item)">
					<view class="icon iconfont delete-btn">&#xe699;</view>
				</view>
			</view>
		</view>
	</div>
</template>

<script>
	import Counter from "@/components/counter.vue"
	export default {
		name: "goodsListComponent",
		props: {
			goodsList: {
				type: Array,
				default() { return [] }
			},
			selectArr: {
				type: Array,
				default() { return [] }
			}
		},
		components: { Counter },
		data() {
			return {
				indexOpen: '',  // 当前显示垃圾桶的商品的索引
				indexClose: '',
				locationXY: [],  // 用户用户手指按下时的XY坐标
			}
		},
		methods: {
			// 单选按钮的点击事件
			onClickRadio(item) {
				item.selected = !item.selected
				
				const goodsIndexOfSelectArr = this.selectArr.indexOf(item)
				if (goodsIndexOfSelectArr > -1) {
					this.selectArr.splice(goodsIndexOfSelectArr, 1)
				} else {
					this.selectArr.push(item)
				}
			},
			
			// 点击图片时，跳转到商品详情页
			onClickImg(item) {
				uni.navigateTo({
					url: "../../goods/goods?goodsInfo=" + JSON.stringify(item)
				})
			},
			
			// 用户手指按下时的操作
			onTouchstart(index, event) {
				// 用户多指滑动时，不触发
				if(event.touches.length > 1) return
				this.locationXY[0] = event.touches[0].pageX
				this.locationXY[1] = event.touches[0].pageY
			},
			onTouchmove(index, event) {
				// 用户多指滑动时，不触发
				if(event.touches.length > 1) return
				
				const moveX = event.touches[0].pageX - this.locationXY[0]
				const moveY = event.touches[0].pageY - this.locationXY[1]
				
				// 当用户向上下滑时，不要触发
				if (Math.abs(moveY) > Math.abs(moveX)) return
				// 滑动距离小于10px时，不触发
				if (Math.abs(moveX) < 10) return
				
				if (moveX < 0) {  // 展示垃圾桶
					this.indexOpen = index
					this.indexClose = ''
				} else {  // 隐藏垃圾桶
					if (this.indexOpen !== index) return
					this.indexClose = index
					this.indexOpen = ''
				}
			},
			onTouchend(index, event) {
				// 用户多指滑动时，不触发
				if(event.touches.length > 1) return
			},

			// 商品右侧的垃圾桶的点击事件
			onClickDeleteBtn(item) {
				this.indexOpen = ''
				this.indexClose = ''
				this.$emit('deleteBtn', { goods: JSON.parse(JSON.stringify(item)) })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-list-component {
		width: 100%;
	}
	// 购物车空空如也
	.no-data {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 60upx;
		font-size: 32upx;
		color: #a7a7a7;
	}
	
	
	@keyframes openGoods {
		from { transform: translateX(0); }
		to { transform: translateX(-30%); }
	}
	@keyframes closeGoods {
		from { transform: translateX(-30%); }
		to { transform: translateX(0); }
	}
	// 购物车的商品列表
	.goods-list {
		width: 100%;
		overflow: hidden;
		.open {
			animation: openGoods linear .2s forwards;
		}
		.close {
			animation: closeGoods linear .2s forwards;
		}
		// 包裹着goods-container与垃圾桶的view
		.goods-box {
			display: flex;
			box-sizing: border-box;
			width: 100%;
			
			// 垃圾桶
			.delete-group {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 30%;
				flex-shrink: 0;
				background-color: #F06C7A;
				margin: 6px 0;
				border-radius: 5px 0 0 5px;
				.delete-btn {
					font-size: 96upx;
				}
			}
			// 包裹着某个商品的外层view
			.goods-container {
				flex-shrink: 0;
				box-sizing: border-box;
				width: 100%;
				padding: 12upx 32upx;
				
				// 某一个商品（卡片）
				.goods {
					display: flex;
					align-items: center;
					border-radius: 10upx;
					border: 1px solid #ddd;
					padding: 20upx;
					box-shadow: 0 0 4px #ccc;
					.radio {
						box-sizing: border-box;
						width: 50upx;
						height: 50upx;
						padding: 6upx;
						border-radius: 50%;
						border: 1px solid #F06C7A;
						margin-right: 20upx;
						.ball {
							display: none;
							width: 100%;
							height: 100%;
							background-color: #F06C7A;
							border-radius: 50%;
							&.show {
								display: block !important;
							}
						}
					}
					.img {
						width: 180upx;
						height: 180upx;
						border-radius: 10upx;
						margin-right: 12upx;
					}
					// 右侧内容
					.content {
						flex: 1;
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
							height: 60upx;
							margin-top: 10upx;
							.price {
								display: flex;
								align-items: center;
							}
							.quantity {
								margin-top: -6upx;
							}
							& /deep/ .counter {
								width: 208upx !important;
							}
							& /deep/ .counter .sub, & /deep/ .counter .add {
								width: 52upx !important;
							}
						}
					}
				}
			}
		}
	}
	
</style>
