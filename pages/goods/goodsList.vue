<template>
	<view class="goods-list-page">
		<!-- 顶部选项卡 -->
		<view class="header">
			<view
				v-for="(item, index) in filterByList"
				:key="index"
				@tap="onClickTab(index)"
				:class="{ 'on': item.selected }"
				class="tab"
			>
				{{ item.text }}
			</view>
		</view>
		
		<!-- 占位 -->
		<view class="place"></view>
		
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="product-list" :style="{ height: imgListHeight + 'px' }">
				<view class="product" :style="{ left: imgLocationArr[index].left+'px', top: imgLocationArr[index].top+'px' }" @tap="onClickGoodsItem(goods)" v-for="(goods, index) in goodsList" :key="goods.goods_id">
					<image mode="widthFix" :src="goods.img" @load="onImageLoad($event, index)" @error="onImageLoad($event, index)"></image>
					<view class="name">{{goods.name}}</view>
					<view class="info">
						<view class="price"><text>￥</text>{{goods.price}}</view>
						<view class="slogan">{{goods.slogan}}<text>人付款</text></view>
					</view>
				</view>
			</view>
			<!-- 商品列表底部的加载中文本 -->
			<view class="loading-text">{{loadingText}}</view>
		</view>
	</view>
</template>

<script>
	import GoodsRequestModule from "../../utils/module/goods.js"
	import { calcPositions } from "./waterFall.js"
	export default {
		data() {
			return {
				goodsList:[],
				filterByList:[
					{text:"全部",selected:true,filterby:'all'},
					{text:"口碑",selected:false,filterby:'public'},
					{text:"热门",selected:false,filterby:'hot'}
				],
				filterby:'all',
				page:1,
				size:6,
				loadingText:"正在加载...",
				ajaxReturnImageNum: 0,  // 后台每次懒加载返回的图片数量
				hasLoadImageNum: 0, // 已经加载出来的图片的个数
				imgLocationArr: [],  // 存储每张图片的location
				imgListHeight: 0,  // 包裹图片的container的高度
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: option.name
			})
			this.loadData()
		},
		// 页面下拉刷新事件
		onPullDownRefresh() {
			setTimeout(() => {
				this.page = 1
				this.goodsList = []
				this.loadingText = "正在加载..."
				this.loadData()
				uni.stopPullDownRefresh()
			}, 1000)
		},
		// 页面上拉加载事件
		onReachBottom() {
			this.page++
			this.loadData()
		},
		methods: {
			// 加载商品分类的数据
			async loadData() {
				const res = await GoodsRequestModule.getGoodsListData({ filterby: this.filterby, page: this.page, size: this.size })
				this.hasLoadImageNum = 0
				if(res.data.length>0) {
					// 在图片加载完成前，显示遮罩，模糊页面。
					uni.showLoading({ title: "加载中...", mask: true })
					res.data.forEach(item=>{
						this.goodsList.push(item)
						this.imgLocationArr.push({left: 1000, top: 0})
					})
					this.ajaxReturnImageNum = res.data.length
				}
				else {
					this.loadingText = '到底了'
				}
			},
			onImageLoad(event, index) {
				this.hasLoadImageNum++;
				const num = this.hasLoadImageNum
				// 懒加载中的最后一张图片加载完成后，执行getDomInfo的回调函数ajaxReturnImageNum
				if (num === 0) return
				if (num !== this.ajaxReturnImageNum && num % this.size !==0) return
				this.$nextTick(() => {
					this.getDomInfo()
					// 在图片加载完成后，隐藏遮罩，显示页面。
					setTimeout(() => uni.hideLoading(), 300)
				})
			},
			// 顶部tab选项卡的点击事件
			onClickTab(index) {
				for (let i = 0, len = this.filterByList.length; i < len; i++) {
					this.filterByList[i].selected = false
				}
				this.filterByList[index].selected = true
				
				// 请求数据
				this.filterby = this.filterByList[index].filterby
				this.page = 1
				this.goodsList = []
				this.loadingText = "正在加载..."
				this.hasLoadImageNum = 0
				this.loadData()
			},
			// 每个商品的点击事件
			onClickGoodsItem(goods) {
				uni.navigateTo({
					url: "./goods?goodsInfo=" + JSON.stringify(goods)
				})
			},
			getDomInfo() {
				const query = uni.createSelectorQuery().in(this);     //这样写就只会选择本页面组件的类名box的
				query.selectAll('.product').boundingClientRect(data => {   //回调函数，data中存储的是这些元素节点（每个节点的信息存为一个对象）的位置信息
					const positionObj = calcPositions({ columns: 2, gap: 15, elements: data })
					this.$set(this.$data, "imgLocationArr", positionObj.positions)
					this.imgListHeight = positionObj.containerHeight
					// console.log("data", data)
				}).exec();
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 顶部tab选项卡
	.header{
			position: fixed;
			z-index: 10;
			display: flex;
			justify-content: space-around;
			align-items: flex-end;
			width: 92%;
			height: 79upx;
			padding: 0 4%;
			background-color: #fff;
			border-bottom: solid 1upx #eee;
		.tab{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 20%;
			height: 60upx;
			font-size: 28upx;
			color: #aaa;
			margin-bottom: -2upx;
			
			&.on{
				color: #555;
				border-bottom: 4upx solid #f06c7a;
				font-weight: 600;
				font-size: 30upx;
			}
		}
	}
	
	// 占位（tab选项卡为fixed，所以需要一个空白view来占位）
	.place{
	 background-color: #ffffff;
	 height: 100upx;
	}
	
	// 商品列表卡片
	.goods-list{
			.loading-text{
				width: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				height: 60upx;
				color: #979797;
				font-size: 24upx;
			}
			.product-list{
				position: relative;
				display: flex;
				flex-wrap: wrap;
				padding: 0 0 3vw 30upx;
				margin-left: 30upx;
				width: 92%;
				.product{
					position: absolute;
					width: 330upx;
					border-radius: 20upx;
					background-color: #fff;
					margin: 0 0 15upx 0;
					box-shadow: 0upx 5upx 25upx rgba(0,0,0,0.1);
					image{
						width: 100%;
						border-radius: 20upx 20upx 0 0;
					}
					// name里头6行css是多行文本省略号的样式
					.name{
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						text-align: justify;
						overflow: hidden;
						text-overflow: ellipsis;
						width: 92%;
						padding: 6upx 4%;
						font-size: 30upx;
					}
					.info{
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						width: 92%;
						padding: 10upx 4% 10upx 4%;
						.price{
							color: #e65339;
							font-size: 30upx;
							font-weight: 600;
						}
						.slogan{
							color: #807c87;
							font-size: 24upx;
						}
					}
				}
				
			}
		}
</style>
