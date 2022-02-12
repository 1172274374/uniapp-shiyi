<template>
	<view class="cart-page">
		<!-- 购物车列表 -->
		<GoodsList ref="goodsList" :goodsList="goodsList" :selectArr="selectArr" @deleteBtn="onClickDeleteBtn" />
	
		<!-- 底部结算栏 -->
		<view class="settlement" :style="{'bottom': bottomHeight}">
			<view class="left-group">
				<!-- radio按钮 -->
				<view class="radio" @tap="onClickSelectAllBtn">
					<view class="ball" :class="{ 'show': isSelectAll }"></view>
				</view>
				<!-- 删除 -->
				<view class="delete-btn" v-show="selectArr.length > 0" @tap="onClickDeleteArrBtn">删除</view>
			</view>
			<!-- 合计、结算 -->
			<view class="right-group">
				<!-- 合计 -->
				<view class="text">合计: <view class="money">￥{{totalMoney | initPrice}}</view></view>
				<!-- 结算 -->
				<view class="submit-btn" @tap="onClickSettlementBtn">结算 {{selectArr.length}}</view>
			</view>
		</view>
	</view>
</template>

<script>

import GoodsList from "./components/goodsList.vue"
	export default {
		name: "Cart",
		components: { GoodsList },
		data() {
			return {
				goodsList: [],  // 购物车的商品列表
				selectArr: [],  // 用户选择的商品列表
				bottomHeight: 0,  // 兼容H5端(移动页面端)的fixed的bottom为0时，与tabbar重合的问题
			}
		},
		computed: {
			// 购物车是否全选
			isSelectAll() {
				return this.goodsList.length === this.selectArr.length
			},
			// 总价格
			totalMoney() {
				if (this.selectArr.length > 0) {
					let total = 0
					this.selectArr.forEach(item => {
						total += item.price * item.number
					})
					return total
				} else {
					return 0
				}
			}
		},
		onShow() {
			// 收缩所有的商品展开项(将垃圾桶都收起来，商品全部改为未选中的状态)
			this.$nextTick(function(){
				const goodsListRef = this.$refs.goodsList
				goodsListRef.indexClose = ""
				goodsListRef.indexOpen = ""
				// 重新从缓存中获取商品列表数组，对商品列表进行初始化赋值
				uni.getStorage({
					key: "goodsList",
					success: (res) => {
						res.data.forEach(item => { item.selected = false })
						this.goodsList = res.data
						this.selectArr = []
					}
				})
			})
		},
		onLoad() {
			// #ifdef H5
			this.bottomHeight = document.getElementsByTagName("uni-tabbar")[0].offsetHeight + "px";
			// #endif
		},
		onHide() {
			const arr = this.goodsList.map(item => {item.selected = false; return item})
			uni.setStorageSync("goodsList", arr)
		},
		methods: {
			// 全选按钮的点击事件，全选与取消全选功能
			onClickSelectAllBtn() {
				if (!this.isSelectAll) {
					this.goodsList.forEach(item => item.selected = true)
					this.selectArr = [...this.goodsList]
				} else{
					this.selectArr = []
					this.goodsList.forEach(item => item.selected = false)
				}
			},

			// 商品右侧的垃圾桶的点击事件
			onClickDeleteBtn(data) {
				const goods = data.goods
				uni.getStorage({
					key: "goodsList",
					success: (res) => {
						this.deleteGoodsOfArr(goods, res.data)
						this.deleteGoodsOfArr(goods, this.goodsList)
						if (goods.selected) {
							this.deleteGoodsOfArr(goods, this.selectArr)
						}
						uni.setStorage({
							key: 'goodsList',
							data: res.data
						});
					}
				})
			},

			// 结算栏的删除按钮的点击事件
			onClickDeleteArrBtn() {
				uni.showModal({
					title: '提示',
					content: '确定删除吗？',
					success: (res) => {
						if (res.confirm) {
							// 遍历用户选中的商品的列表，从goodsList购物车列表中删除
							uni.getStorage({
								key: "goodsList",
								success: (res) => {
									this.selectArr.forEach(item => {
										this.deleteGoodsOfArr(item, this.goodsList)
										this.deleteGoodsOfArr(item, res.data)
									})
									this.selectArr = []
									uni.setStorage({
										key: 'goodsList',
										data: res.data,
										success:() => { uni.showToast({ title: '删除成功', icon: "none" }) }
									});
								}
							})
						} else if (res.cancel) {
							uni.showToast({ title: '取消成功', icon: "none" })
						}
					}
				});
				
			},

			// 在购物车列表中，删除某条数据
			deleteGoodsOfArr(goods, goodsList) {
				let i = 0
				goodsList.forEach((item, index) => {
					if (item.goods_id === goods.goods_id && item.specText === goods.specText) {
						i = index
					}
				})
				goodsList.splice(i, 1)
			},
			
			// 结算按钮的点击事件
			onClickSettlementBtn() {
				if (this.selectArr.length == 0) {
					uni.showToast({ title: "至少选择1样商品", icon: "none" })
					return;
				}
				uni.setStorage({
					key: 'settlementGoodsList',
					data: JSON.parse(JSON.stringify(this.selectArr)),
					success:() => { 
						uni.navigateTo({
							url: "./settlement"
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.cart-page {
	width: 100%;
	padding: 20upx 0 120upx 0;
	
	// 底部结算栏
	.settlement {
		position: fixed;
		bottom: 0;
		z-index: 5;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		width: 100vw;
		height: 100upx;
		background-color: #FBFBFB;
		padding: 0 40upx;
		.left-group {
			display: flex;
			align-items: center;
		}
		// radio按钮
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
		
		// 删除
		.delete-btn {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 80upx;
			height: 40upx;
			border: 1px solid #F06C7A;
			border-radius: 24upx;
			font-size: 24upx;
			color: #F06C7A;
			margin-left: 20upx;
		}
		// 合计、结算
		.right-group {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			// 合计
			.text {
				display: flex;
				font-size: 28upx;
				margin-right: 20upx;
				.money {
					font-weight: bold;
				}
			}
			
			// 结算
			.submit-btn {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 120upx;
				height: 48upx;
				background-color: #F06C7A;
				border-radius: 24upx;
				font-size: 26upx;
				color: #FFFFFF;
			}
		}
	}
}
</style>
