<template>
	<view class="catepages">
		<view class="search">
			<input type="text" 
				disabled="true" 
				placeholder="搜索商品" 
				placeholder-style="color:#a7a7a7" 
				@tap="toSearch"
			/>
			<view class="icon iconfont">&#xe62f;</view>
		</view>
		<view class="fenlei">
			<view :class="{'active':tag_active == 1}" @click="tagChange(1)">
				综合
			</view>
			<view  :class="{'active':tag_active == 2}"  @click="tagChange(2,change_price)">
				价格
				<view class="up" :class="{'Up_active':uporlow == 1}">^</view>
				<view class="low" :class="{'Low_active':uporlow == 0}">^</view>
			</view>
			<view  :class="{'active':tag_active == 3}"  @click="tagChange(3)">
				上新
			</view>
			<view class="search_zhanwei">
				
			</view>
		</view>
		<view class="zhanwei"></view>
		<view class="productList">
			<view class="shop">
				<view class="shop_img">
					<image src="https://img01.yzcdn.cn/upload_files/2022/01/06/FvXSl6tVLBZCg1ohR_29lh-cYHDz.gif!middle.webp" mode=""></image>
				</view>
				<view class="shop_title">
					无钢圈软支撑 穿着舒适 | Miss LI里小姐 果凝胶植绒黑科技聚拢内衣套装 4色可选
				</view>
				<view class="limit_time">
					限时价
				</view>
				<view class="shop_price">
					<text>￥</text>
					<text>98</text>
					<text>123</text>
					<view class="icon iconfont">&#xe71f;</view>
				</view>
				<view class="rank">
					本店人气榜第2
				</view>
			</view>
			<view class="shop">
				<view class="shop_img">
					<image src="https://img01.yzcdn.cn/upload_files/2022/01/06/FvXSl6tVLBZCg1ohR_29lh-cYHDz.gif!middle.webp" mode=""></image>
				</view>
				<view class="shop_title">
					无钢圈软支撑 穿着舒适 | Miss LI里小姐 果凝胶植绒黑科技聚拢内衣套装 4色可选
				</view>
				<view class="limit_time">
					限时价
				</view>
				<view class="shop_price">
					<text>￥</text>
					<text>98</text>
					<text>123</text>
					<view class="icon iconfont">&#xe71f;</view>
				</view>
				<view class="rank">
					本店人气榜第2
				</view>
			</view>
			<view class="shop">
				<view class="shop_img">
					<image src="https://img01.yzcdn.cn/upload_files/2022/01/06/FvXSl6tVLBZCg1ohR_29lh-cYHDz.gif!middle.webp" mode=""></image>
				</view>
				<view class="shop_title">
					无钢圈软支撑 穿着舒适 | Miss LI里小姐 果凝胶植绒黑科技聚拢内衣套装 4色可选
				</view>
				<view class="limit_time">
					限时价
				</view>
				<view class="shop_price">
					<text>￥</text>
					<text>98</text>
					<text>123</text>
					<view class="icon iconfont">&#xe71f;</view>
				</view>
				<view class="rank">
					本店人气榜第2
				</view>
			</view>
			<view class="shop">
				<view class="shop_img">
					<image src="https://img01.yzcdn.cn/upload_files/2022/01/06/FvXSl6tVLBZCg1ohR_29lh-cYHDz.gif!middle.webp" mode=""></image>
				</view>
				<view class="shop_title">
					无钢圈软支撑 穿着舒适 | Miss LI里小姐 果凝胶植绒黑科技聚拢内衣套装 4色可选
				</view>
				<view class="limit_time">
					限时价
				</view>
				<view class="shop_price">
					<text>￥</text>
					<text>98</text>
					<text>123</text>
					<view class="icon iconfont">&#xe71f;</view>
				</view>
				<view class="rank">
					本店人气榜第2
				</view>
			</view>
			<view class="shop">
				<view class="shop_img">
					<image src="https://img01.yzcdn.cn/upload_files/2022/01/06/FvXSl6tVLBZCg1ohR_29lh-cYHDz.gif!middle.webp" mode=""></image>
				</view>
				<view class="shop_title">
					无钢圈软支撑 穿着舒适 | Miss LI里小姐 果凝胶植绒黑科技聚拢内衣套装 4色可选
				</view>
				<view class="limit_time">
					限时价
				</view>
				<view class="shop_price">
					<text>￥</text>
					<text>98</text>
					<text>123</text>
					<view class="icon iconfont">&#xe71f;</view>
				</view>
				<view class="rank">
					本店人气榜第2
				</view>
			</view>
			<view class="shop">
				<view class="shop_img">
					<image src="https://img01.yzcdn.cn/upload_files/2022/01/06/FvXSl6tVLBZCg1ohR_29lh-cYHDz.gif!middle.webp" mode=""></image>
				</view>
				<view class="shop_title">
					无钢圈软支撑 穿着舒适 | Miss LI里小姐 果凝胶植绒黑科技聚拢内衣套装 4色可选
				</view>
				<view class="limit_time">
					限时价
				</view>
				<view class="shop_price">
					<text>￥</text>
					<text>98</text>
					<text>123</text>
					<view class="icon iconfont">&#xe71f;</view>
				</view>
				<view class="rank">
					本店人气榜第2
				</view>
			</view>
			<view class="shop">
				<view class="shop_img">
					<image src="https://img01.yzcdn.cn/upload_files/2022/01/06/FvXSl6tVLBZCg1ohR_29lh-cYHDz.gif!middle.webp" mode=""></image>
				</view>
				<view class="shop_title">
					无钢圈软支撑 穿着舒适 | Miss LI里小姐 果凝胶植绒黑科技聚拢内衣套装 4色可选
				</view>
				<view class="limit_time">
					限时价
				</view>
				<view class="shop_price">
					<text>￥</text>
					<text>98</text>
					<text>123</text>
					<view class="icon iconfont">&#xe71f;</view>
				</view>
				<view class="rank">
					本店人气榜第2
				</view>
			</view>
			<view class="shop">
				<view class="shop_img">
					<image src="https://img01.yzcdn.cn/upload_files/2022/01/06/FvXSl6tVLBZCg1ohR_29lh-cYHDz.gif!middle.webp" mode=""></image>
				</view>
				<view class="shop_title">
					无钢圈软支撑 穿着舒适 | Miss LI里小姐 果凝胶植绒黑科技聚拢内衣套装 4色可选
				</view>
				<view class="limit_time">
					限时价
				</view>
				<view class="shop_price">
					<text>￥</text>
					<text>98</text>
					<text>123</text>
					<view class="icon iconfont">&#xe71f;</view>
				</view>
				<view class="rank">
					本店人气榜第2
				</view>
			</view>
			<view class="shop">
				<view class="shop_img">
					<image src="https://img01.yzcdn.cn/upload_files/2022/01/06/FvXSl6tVLBZCg1ohR_29lh-cYHDz.gif!middle.webp" mode=""></image>
				</view>
				<view class="shop_title">
					无钢圈软支撑 穿着舒适 | Miss LI里小姐 果凝胶植绒黑科技聚拢内衣套装 4色可选
				</view>
				<view class="limit_time">
					限时价
				</view>
				<view class="shop_price">
					<text>￥</text>
					<text>98</text>
					<text>123</text>
					<view class="icon iconfont">&#xe71f;</view>
				</view>
				<view class="rank">
					本店人气榜第2
				</view>
			</view>
			<view class="shop">
				<view class="shop_img">
					<image src="https://img01.yzcdn.cn/upload_files/2022/01/06/FvXSl6tVLBZCg1ohR_29lh-cYHDz.gif!middle.webp" mode=""></image>
				</view>
				<view class="shop_title">
					无钢圈软支撑 穿着舒适 | Miss LI里小姐 果凝胶植绒黑科技聚拢内衣套装 4色可选
				</view>
				<view class="limit_time">
					限时价
				</view>
				<view class="shop_price">
					<text>￥</text>
					<text>98</text>
					<text>123</text>
					<view class="icon iconfont">&#xe71f;</view>
				</view>
				<view class="rank">
					本店人气榜第2
				</view>
			</view>
		</view>
		<view class="tip">
			{{text_tip}}
		</view>
	</view>
</template>

<script>
	import PageHeader from "@/components/searchGroup.vue"
	import categoryRequestModule from "@/utils/module/category.js"
	export default {
		data(){
			return {
				text_tip:'下拉加载更多....',
				tag_active:1,
				uporlow:1,
				change_price:1
			}
		},
		methods:{
			
			toSearch(){
				uni.navigateTo({
					url:'/pages/search/searchGoodsList'
				})
			},
			tagChange(num,val){
				
				if(val != undefined){
					
					this.tag_active = num
					this.uporlow = val
					if(val == 1){
						this.change_price = 2
					}else{
						this.uporlow =  0
						this.change_price = 1
					}
				}else{
					this.tag_active = num
					this.uporlow = 3
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.catepages{
		background: #f9f9f9;
	}
	.search{
		position: fixed;
		z-index: 99;
		top: 0;
		width: 100%;
		height: 10vw;
		background: #f9f9f9;
		
		
		
		.icon{
			position: absolute;
			top: 3vw;
			left: 3.5vw;
			font-size: 3vw;
		}
		
		input{
			width: 95%;
			height: 95%;
			background: #ffffff;
			margin: auto;
			font-size: 4vw;
			padding-left: 3vw;
			box-sizing: border-box;
			padding-left: 6vw;
			
		}
	}
	
	.fenlei{
		width: 100%;
		height: 10vw;
		background: #fff;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		top: 13vw;
		z-index: 999;
		
		view{
			text-align: center;
			font-size: 4.5vw;
			line-height: 9vw;
			color: #7c7c7c;
			
			&:nth-child(1){
				width: 20%;
				height: 100%;
				
			}
			
			&:nth-child(2){
				width: 20%;
				height: 100%;
				position: relative;
				
				view{
					position: absolute;
					width: 30%;
					height: 30%;
					font-size: 2vw;
					font-weight: bold;
					
					
					&:nth-child(1){
						right: 0vw;
						top: 0vw;
						
						
					}
					
					&:nth-child(2){
						right: 0.2vw;
						top: 4vw;
						transform: rotate(180deg);
						transform-origin: 52% 100%;
					}
				}
			}
			
			&:nth-child(3){
				width: 20%;
				height: 100%;
			}
			
		}
		
		.active{
			color: red;
		}
		.Up_active{
			color: red;
		}
		.Low_active{
			color: red;
		}
		
		.search_zhanwei{
			position: absolute;
			width: 100%;
			height: 5vw;
			background: #f9f9f9;
			top: -4vw;
		}
	}
	
	.zhanwei{
		width: 100%;
		height: 25vw;
		
	}
	
	.productList{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		
		.shop{
			
			width: 40%;
			height: 76vw;
			margin-top: 4vw;
			background: #fff;
			
			.shop_img{
				width: 100%;
				height: 40vw;
				
				image{
					width: 100%;
					height: 100%;
					
				}
			}
			
			.shop_title{
				display: -webkit-box;
				-webkit-box-orient: vertical;
				text-align: justify;
				text-overflow: ellipsis;
				overflow: hidden;
				-webkit-line-clamp: 2;
				width: 92%;
				margin: 2vw 4%;
				font-size: 3vw;

			}
			
			.limit_time{
				width: 40%;
				height: 5vw;
				font-size: 3vw;
				color: #fff;
				background: red;
				border-radius: 1vw;
				text-align: center;
				margin-left: 2vw;
			}
			
			.shop_price{
				width: 100%;
				height: 8vw;
				margin-top: 4vw;
				overflow: hidden;
				position: relative;
				
				text{
					
					
					&:nth-child(1){
						position: absolute;
						width: 10%;
						height: 100%;
						left: 3vw;
						top: 2vw;
						color: red;
						text-align: right;
						font-size: 4.3vw;
						
					}
					&:nth-child(2){
						position: absolute;
						width: 27%;
						height: 100%;
						left: 8vw;
						color: red;
						text-align: left;
						font-size: 6vw;
						font-weight: bold;
						
					}
					&:nth-child(3){
						position: absolute;
						width: 25%;
						height: 100%;
						left: 17vw;
						top: 2vw;
						color: #bdbdbd;
						text-align: left;
						text-decoration: line-through #bdbdbd;
						
					}
				}
				
				.icon{
					position: absolute;
					right: 2vw;
					top: 1.6vw;
					font-size: 5vw;
					color: red;
				}
			}
			
			.rank{
				width: 100%;
				height: 6%;
				font-size: 2vw;
				text-indent: 3vw;
				line-height: 6vw;
				color: #f06d75;
			}
		}
	}
	
</style>
