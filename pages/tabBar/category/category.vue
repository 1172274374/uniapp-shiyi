<template>
	<view class="category-page">
		<!-- 状态栏占位 -->
		<page-status></page-status>
		
		<!-- 顶部搜索框 -->
		<page-header url="/pages/tabBar/category/category"></page-header>
		
		<!-- 分类页 -->
		<view class="category-content">
			<!-- 左侧分类列表 -->
			<scroll-view class="category-list">
				<view
					v-for="(categoryItem, index) of categoryList"
					:key="categoryItem.id"
					@tap="onClickCategoryItem(index)"
					:class="{'on': index==currentSelectCategoryItem}"
					class="category-list-item"
				>
					<view class="block-left"></view>
					<view class="text">{{ categoryItem.title }}</view>
				</view>
			</scroll-view>
			
			<!-- 右侧分类内容 -->
			<scroll-view class="right">
				<view class="category" v-for="(category,index) in categoryList" :key="category.id" v-show="index==currentSelectCategoryItem" >
					<!-- 商品推荐栏 -->
					<view class="banner">
						<image :src="category.banner"></image>
					</view>
					
					<!-- 商品组 -->
					<view class="list">
						<view class="box" v-for="(box,i) in category.list" :key="i" @tap="onClickCategory(box)">
							<image :src="'/static/img/category/list/'+box.img"></image>
							<view class="text">{{box.name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import PageHeader from "@/components/searchGroup.vue"
	import categoryRequestModule from "@/utils/module/category.js"
	export default {
		data() {
			return {
				categoryList: null,
				currentSelectCategoryItem: 0 // 当前选中的分类列表项
			}
		},
		components: { "page-header": PageHeader },
		onLoad: function() {
			this.initPage()
		},
		methods: {
			// 初始化页面，获取商品分类数据
			async initPage() {
				const res = await categoryRequestModule.getCategoryListData()
				this.categoryList = res.data
			},
			
			// 左侧分类列表项的点击事件
			onClickCategoryItem(index) {
				this.currentSelectCategoryItem = index
			},
			
			// 右侧每个商品的点击事件
			onClickCategory(category) {
				uni.navigateTo({
					url: "../../goods/goodsList?name=" + category.name
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.category-content {
		display: flex;
		width: 100%;
		background-color: #FFFFFF;
		
		// 左侧分类列表
		.category-list {
			width: 24%;
			background-color: #f2f2f2;
			.category-list-item {
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 90upx;
				font-size: 28upx;
				color: #3c3c3c;
				.block-left{
					position: absolute;
					width: 0upx;
					left: 0;
					top: 50%;
					transform: translateY(-50%);
				}
				&.on{
					height: 100upx;
					background-color: #fff;
					font-size: 30upx;
					font-weight: 600;
					color: #2d2d2d;
					.block-left{
						width: 10upx;
						height: 40%;
						background-color: #f06c7a;
					}
				}
			}
		}
		
		// 右侧内容区域
		.right{
			position: absolute;
			width: 76%;
			left: 24%;
			.category{
				width: 94%;
				padding: 20upx 3%;
				.banner{
					width: 100%;
					height: 28vw;
					border-radius: 10upx;
					overflow: hidden;
					box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.3);
					image{
						width: 100%;
						height: 100%;
					}
				}
				.list{
					margin-top: 40upx;
					width: 100%;
					display: flex;
					flex-wrap: wrap;
					.box{
						width: calc(71.44vw / 3);
						margin-bottom: 30upx;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-wrap: wrap;
						image{
							width: 60%;
							height: calc(71.44vw / 3 * 0.6);
						}
						.text{
							margin-top: 5upx;
							width: 100%;
							display: flex;
							justify-content: center;
							font-size: 26upx;
						}
					}
				}
			}
		}
	}
</style>
