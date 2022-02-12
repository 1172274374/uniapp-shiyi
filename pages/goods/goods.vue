<template>
	<view class="goods-page">
		<!-- 状态栏 -->
		<page-status></page-status>
		
		<!-- 返回、购物车按钮 -->
		<GoodsHeader></GoodsHeader>
		
		<!-- 轮播图 -->
		<view class="swiper-box" >
			<swiper circular autoplay @change="swiperChange">
				<swiper-item v-for="swiper in goodsData.swiperList" :key="swiper.id">
					<image :src="swiper.img"></image>
				</swiper-item>
			</swiper>
			<view class="indicator">{{currentSwiper+1}}/{{goodsData.swiperList.length}}</view>
		</view>

		<!-- 标题 价格 -->
		<view class="info-box goods-info">
			<view class="price">￥{{goodsInfo.price}}</view>
			<view class="title">
				{{goodsInfo.name}}
			</view>
		</view>
		
		<!-- 选择规格 -->
		<view class="Specification" @tap="onClickSpecificationSelect">
			<!-- 选择 -->
			<view class="text">选择</view>
			
			<!-- 选择规格 -->
			<view class="select-items">
				<view class="items-text">选择规格</view>
				<view class="items-group">
					<view class="item" v-for="(item, index) of userSelectedSpecItemList" :key="index">{{ item.type }}</view>
					<view class="item">共有{{ dialogData.spec[0].list.length }}种{{ dialogData.spec[0].text }}可选</view>
				</view>
			</view>
			
			<!-- 请选择 -->
			<view class="icon iconfont arrow-btn">&#xe743;</view>
			
		</view>
		<!-- 评论区 -->
		<view class="comment-area">
			<!-- 商品评论、查看全部 -->
			<view class="comment-header">
				<view class="text-left">
					商品评论 ({{ goodsData.comment.length }})
				</view>
				<view class="text-right" @tap="onClickComment()">查看全部 <view class="icon iconfont">&#xe743;</view></view>
			</view>
			<!-- 头像、评论 -->
			<view class="comment" @tap="onClickComment()">
				<!-- 头像 -->
				<view class="user-info">
					<view class="head-portrait">
						<image :src="goodsData.comment[0].face" />
					</view>
					<view class="username">{{ goodsData.comment[0].username }}</view>
				</view>
				<!-- 评论 -->
				<view class="comment-text">{{ goodsData.comment[0].content }}</view>
			</view>
		</view>
		
		<!-- 商品详情 -->
		<view class="goods-detail">
			<view class="title">——商品详情——</view>
			<rich-text :nodes="goodsData.descriptionStr"></rich-text>
		</view>
		
		<!-- 底部栏 -->
		<view class="footer">
			<view class="icons">
				<view class="box">
					<view class="icon iconfont">&#xe7e7;</view>
					<view class="text">分享</view>
				</view>
				<view class="box" @tap="onClickKeepBtn">
					<view class="icon iconfont" v-if="isKeep">&#xe68a;</view>
					<view class="icon iconfont" v-else>&#xe66f;</view>
					<view class="text">{{isKeep?'已':''}}收藏</view>
				</view>
			</view>
			<view class="btn">
				<view @tap="joinCart" class="joinCart">加入购物车</view>
				<view @tap="onClickBuyBtn" class="buy">立即购买</view>
			</view>
		</view>
		
		<!-- 选择规格的弹框 -->
		<SpecDialog :defaultSelected="userSelectedSpecItemList" :dialogData="dialogData" :goodsInfo="goodsInfo" @onChangeSelectedSpecList="onChangeSelectedSpecList" />
	</view>
</template>

<script>
/*
	userSelectedSpecItemList: [{ name: "xs", type: "红", text: 颜色 }, {...}, {...}]
*/
	import GoodsRequestModule from "@/utils/module/goods.js"
	import GoodsHeader from "./components/goodsHeader.vue"
	import SpecDialog from "@/components/specDialog.vue"
	export default {
		components: { GoodsHeader, SpecDialog },
		data() {
			return {
				goodsInfo: {  // 上个页面传进来的商品信息对象
					name: "", // 商品名称
					price: "", // 商品价格
					number: 1, // 商品编号
					spec: ""// 商品的规格类型
				},
				goodsData: {  // 后台返回的商品详情
					swiperList:[],  // 商品详情中的轮播图
					spec:[],  // 该商品的各种规格组成的数组
					comment:[{face:'', username:'', content:''}],  // 评论区的所有评论
					descriptionStr:''
				},
				currentSwiper: 0, // 当前轮播图的索引
				dialogData: {  // 传递给规格弹框的数据
					isShow: false,
					spec: [
						{ name: "size", list: ["xs", "s"], text: "尺寸" },
						{ name: "color", list: ["红", "白"], text: "颜色" },
						{ name: "model", list: ["A", "B"], text: "型号" }
					]
				},
				userSelectedSpecItemList: [],  // 用户选择的规格组成的数据
				isKeep: false,  // 用户是否保存了商品
			}
		},
		onLoad(option) {
			this.goodsInfo = JSON.parse(option.goodsInfo);  // 上个页面传过来的商品信息对象
			const spec = this.goodsInfo.spec
			if (Array.isArray(spec) && spec.length > 0) {
				this.$set(this.$data, "userSelectedSpecItemList", spec)
			}
			this.getGoodsInfo()
		},
		methods: {
			// 通过商品对象的ID，获取商品详情对象
			async getGoodsInfo() {
				const res = await GoodsRequestModule.getGoodsInfo()
				this.goodsData = res.data
				this.goodsData.swiperList.unshift({id: 0, img: this.goodsInfo.img})
				this.dialogData.spec[0].list = res.data.spec
				this.dialogData.spec[1].list = ["红", "白", "蓝"]
				this.dialogData.spec[2].list = ["A", "B", "C"]
				// console.log("goodsData", this.goodsData)
			},
			swiperChange(e) {
				this.currentSwiper = e.detail.current;
			},
			// 点击规格时，弹出弹框
			onClickSpecificationSelect() {
				this.dialogData.isShow = true
			},
			
			// 获取规格弹框返回的，用户选择的规格信息
			onChangeSelectedSpecList(data) {
				this.$set(this.$data, "userSelectedSpecItemList", data.spec)
				this.goodsInfo.spec = data.spec
				this.goodsInfo.specText = data.specText
				console.log("this.goodsInfo", this.goodsInfo)
			},
			
			// 点击商品评论时，跳转到商品评论页面
			onClickComment() {
				uni.setStorageSync("comment", this.goodsData.comment)
				uni.navigateTo({
					url: "./ratings"
				})
			},
			
			// 收藏按钮的点击事件
			onClickKeepBtn() {
				this.isKeep = !this.isKeep
			},
			
			// 加入购物车
			joinCart() {
				if (!this.goodsInfo.specText) {
					uni.showToast({title: "请先选择商品规格", icon: "none"})
					return
				}
				uni.getStorage({
					key: "goodsList",
					success: (res) => {
						let goodsList = res.data
						let isExist = false  // 这种商品与规格是否在goodsList中已经存在
						goodsList.forEach(item => {
							if (item.goods_id === this.goodsInfo.goods_id && item.specText === this.goodsInfo.specText) {
								item.number += this.goodsInfo.number
								isExist = true
							}
						})
						
						if (!isExist) { goodsList.push(this.goodsInfo) }  // 如果不存在这种商品和规格，就在购物车中新增这个选项
						this.setGoodsList(goodsList)
					},
					fail: () => {
						this.setGoodsList([this.goodsInfo])
					}
				})
			},
			// 立即购买按钮的点击事件
			onClickBuyBtn() {
				if (!this.goodsInfo.specText) {
					uni.showToast({title: "请先选择商品规格", icon: "none"})
					return
				}
				uni.setStorage({
					key: "settlementGoodsList",
					data: [this.goodsInfo],
					success() {
						uni.navigateTo({
							url: "../tabBar/cart/settlement"
						})
					}
				})
			},
			setGoodsList(goodsList) {
				uni.setStorage({
					key: "goodsList",
					data: goodsList,
					success: () => {
						uni.showToast({
							icon: "success",
							title: "成功添加至购物车"
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 轮播图 */
	.swiper-box {
		position: relative;
		width: 100%;
		height: 100vw;
		swiper {
			width: 100%;
			height: 100vw;
			swiper-item {
				image {
					width: 100%;
					height: 100vw;
				}
			}
		}
		.indicator{
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 25upx;
			height: 40upx;
			border-radius: 40upx;
			font-size: 22upx;
			position: absolute;
			bottom: 20upx;
			right: 20upx;
			color: #fff;
			background-color: rgba(0, 0, 0, 0.2);
		}
	}
	
	/* 标题 价格 */
	.info-box {
		width: 92%;
		padding: 20upx 4%;
		background-color: #fff;
		margin-bottom: 20upx;
		.price {
			font-size: 46upx;
			font-weight: 600;
			color: #f47925;
		}
		.title {
			font-size: 30upx;
		}
	}
	
	// 规格
	.Specification {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20upx;
		font-size: 26upx;
		
		// 选择
		.text {
			color: #b1b1b1;
			width: 52upx;
			margin-right: 20upx;
		}
		
		// 选择规格
		.select-items {
			flex: 1;
			// 选择规格文本描述
			.items-text {
				color: #000;
				font-weight: bold;
			}
			
			// 包裹用户选择的规格的外层view
			.items-group {
				display: flex;
				height: 40upx;
				.item {
					display: flex;
					align-items: center;
					height: 40upx;
					color: #b1b1b1;
					background-color: #f0f1ec;
					padding: 0 8upx;
					margin-top: 8upx;
				}
				.item + .item {
					margin-left: 16upx;
				}
			}
		}
		
		// 右侧箭头
		.arrow-btn {
			width: 36upx;
			color: #b1b1b1;
			margin-left: 20upx;
		}
	}

	// 评论区
	.comment-area {
		padding: 0 20upx;
		margin-top: 60upx;
		// 商品评论、查看全部
		.comment-header {
			display: flex;
			justify-content: space-between;
			margin-bottom: 20upx;
			.text-left { color: #b1b1b1; }
			.text-right {
				display: flex;
				align-items: center;
				color: #52d4a2;
			}
		}
		// 头像、评论
		.comment {
			// 头像
			.user-info {
				display: flex;
				margin-bottom: 8upx;
				.head-portrait {
					width: 40upx;
					height: 40upx;
					border-radius: 50%;
					overflow: hidden;
					margin-right: 8upx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.username {
					color: #b1b1b1;
				}
			}
			// 评论
			.comment-text {
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}
	}
	
	// 商品详情
	.goods-detail {
		.title {
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #999;
		}
	}
	
	// 底部栏
	.footer {
		position: fixed;
		bottom: 0upx;
		width: 92%;
		padding: 0 4%;
		height: 99upx;
		border-top: solid 1upx #eee;
		background-color: #fff;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.icons {
			display: flex;
			height: 80upx;
			margin-left: -4%;
			.box {
				width: 80upx;
				height: 80upx;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				.icon {
					font-size: 40upx;
					color: #828282;
				}
				.text {
					display: flex;
					justify-content: center;
					width: 100%;
					font-size: 22upx;
					color: #666;
				}
			}
		}
		.btn {
			height: 80upx;
			border-radius: 40upx;
			overflow: hidden;
			display: flex;
			margin-right: -2%;
			.joinCart,
			.buy {
				height: 80upx;
				padding: 0 40upx;
				color: #fff;
				display: flex;
				align-items: center;
				font-size: 28upx;
			}
			.joinCart {
				background-color: #f0b46c;
			}
			.buy {
				background-color: #f06c7a;
			}
		}
	}
</style>
