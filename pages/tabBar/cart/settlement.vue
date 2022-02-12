<template>
	<view class="settlement-page">
		<view class="content">
			<!-- 商品列表 -->
			<view class="goods-list">
				<view class="goods" v-for="(item, index) of goodsList" :key="index">
					<!-- 图片 -->
					<image :src="item.img" class="img"></image>
					<!-- 右侧内容 -->
					<view class="content">
						<!-- 商品名称 -->
						<view class="name">{{ item.name }}</view>
						<!-- 规格列表 -->
						<view class="spec-list">
							<view class="spec" v-for="(specItem) of item.spec" :key="specItem.type">{{ specItem.type }}</view>
							<view class="spec">数量:{{ item.number }}</view>
						</view>
						<!-- 价格与数量 -->
						<view class="price-group">
							<view class="price">￥{{ item.price }}</view>
						</view>
					</view>
				</view>
			</view>
		
			<!-- 商品金额、运费 -->
			<view class="price-box">
				<!-- 商品金额 -->
				<view class="goods-total-price">
					<view class="text">商品金额</view>
					<view class="price">￥{{ goodsTotalPrice | initPrice }}</view>
				</view>
				<!-- 运费 -->
				<view class="shipment-cost">
					<view class="text">运费</view>
					<view class="price">￥{{shipmentCost | initPrice}}</view>
				</view>
			</view>
		
			<!-- 合计、提交订单 -->
			<view class="submit-box">
				<!-- 合计 -->
				<view class="settlement">合计:<text class="text">￥{{ goodsTotalPrice + shipmentCost | initPrice }}</text></view>
				<!-- 提交订单 -->
				<view><button type="default" class="submit-btn" @tap="onClickSubmitBtn">提交订单</button></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "settlementPage",
		data() {
			return {
				goodsList: [],
				shipmentCost: 12,  // 运费
			}
		},
		onShow() {
			uni.getStorage({
				key: "settlementGoodsList",
				success: (res) => {
					this.goodsList = res.data
				}
			})
		},
		computed: {
			goodsTotalPrice() {  // 计算所有商品的价格总和
				if (this.goodsList.length === 0) { return 0 }
				let totalPrice = 0
				this.goodsList.forEach(item => {
					totalPrice += item.price * item.number
				})
				return totalPrice
			}
		},
		methods: {
			onClickSubmitBtn() {
				uni.removeStorageSync("settlementGoodsList")
				uni.getStorage({
					key: "goodsList",
					success: (res) => {
						const arr = []
						this.goodsList.forEach(item => arr.push(item.goods_id + item.specText))
						const newResData = res.data.filter((item, index) => {
							const str = item.goods_id + item.specText
							if (arr.includes(str)) {
								return false
							}
							return true
						})
						uni.setStorageSync("goodsList", newResData)
						uni.showToast({ title: "下单成功！", icon: "success", success: ()=> {
							setTimeout(function() {
								uni.switchTab({
									url: "./cart"
								})
							}, 1500)
						}})
					}
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 包裹着某个商品的外层view
	.goods-list {
		box-sizing: border-box;
		border-radius: 10upx;
		box-shadow: 0 0 4px #CCCCCC;
		margin: 40upx 32upx;
		
		// 某一个商品（卡片）
		.goods {
			display: flex;
			align-items: center;
			box-sizing: border-box;
			width: 100%;
			padding: 20upx;
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
					margin-top: 10upx;
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
					height: 40upx;
					margin-top: 20upx;
					font-size: 32upx;
					color: #F06C7A;
					.price {
						display: flex;
						align-items: center;
					}
				}
			}
		}
	}

	// 商品金额、运费
	.price-box {
		box-sizing: border-box;
		border-radius: 10upx;
		box-shadow: 0 0 4px #CCCCCC;
		margin: 20upx 32upx;
		.goods-total-price, .shipment-cost {
			display: flex;
			justify-content: space-between;
			box-sizing: border-box;
			width: 100%;
			padding: 20upx;
			.text {}
			.price {
				font-size: 32upx;
				color: #F06C7A;
			}
		}
	}

	// 合计、提交订单
	.submit-box {
		position: fixed;
		bottom: 0;
		z-index: 5;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		box-sizing: border-box;
		width: 100vw;
		height: 100upx;
		background-color: #FBFBFB;
		padding: 0 40upx;
		.settlement {
			.text {
				font-size: 32upx;
				font-weight: bold;
			}
		}
		.submit-btn {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 176upx;
			height: 56upx;
			background-color: #F06C7A;
			border-radius: 32upx;
			font-size: 26upx;
			color: #FFFFFF;
			margin-left: 20upx;
		}
	}
</style>
