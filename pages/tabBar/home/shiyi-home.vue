<template>
	<view>
		<view class="top_search">
			<view class="tip">
				<text class="tip_content">
					通知：大家好，北京和天津因为冬奥会快递管制，暂时停发，结束后恢复正常发货，介意者谨慎下单！
				</text>
			</view>
			<view class="icon iconfont">&#xe637;</view>
		</view>
		<view class="search_bg">
			<input type="text" placeholder="查询" disabled="true" placeholder-style="color:#828282,font-size: 12px;" />
			<view class="icon iconfont">&#xe62f;</view>
		</view>
		<view class="shop_head">
			<view class="shop_zhanshi">
				<view class="" v-for="(item,i) in images_1" :key="i">
					<image :src="item.url" mode=""></image>
					<text>{{item.title}}</text>
				</view>
			</view>
			<view class="shop_zhanshi">
				<view class="" v-for="(item,i) in images_2" :key="i">
					<image :src="item.url" mode=""></image>
					<text>{{item.title}}</text>
				</view>
			</view>
		</view>
		<view class="banner">
			<view class="banner_one">
				<image src="https://img01.yzcdn.cn/upload_files/2022/01/25/FiCv3HJJojD3mDiYZWGZA2ryyJkh.jpg!large.webp" mode=""></image>
			</view>
			<view class="banner_two">
				<image src="https://img01.yzcdn.cn/upload_files/2021/08/24/FsHJol6jICUhlivECShnNBjBt9Bv.jpg!large.webp" mode=""></image>
			</view>
			<view class="banner_three">
				<view class="banner_three_one">
					<image src="https://img01.yzcdn.cn/upload_files/2021/08/24/FtuaRlh_hSf777_xYaY7MleBKUdl.jpg!large.webp" mode=""></image>
				</view>
				<view class="banner_three_two">
					<image src="https://img01.yzcdn.cn/upload_files/2021/08/24/Fk_lV8-1hfkAKbWShNGVc9s-OIM_.jpg!large.webp" mode=""></image>
				</view>
				<view class="banner_three_three">
					<image src="https://img01.yzcdn.cn/upload_files/2021/08/24/Fklq3FOFJV-8heNqfuFZuRjvygTW.jpg!large.webp" mode=""></image>
				</view>
			</view>
		</view>
	
		<view class="new_shop">
			<view class="new_shop_banner">
				<image src="https://img01.yzcdn.cn/upload_files/2020/10/26/FgTq6aTOZueg711hsH8Y3TwBP9Mi.png!large.webp" mode=""></image>
			</view>
			<view class="new_shop_discount">
				<view class="new_shop_discount_one">
					<view class="new_shop_discount_one_one">
						<image src="https://img01.yzcdn.cn/upload_files/2022/01/06/FvXSl6tVLBZCg1ohR_29lh-cYHDz.gif!middle.webp" mode=""></image>
						<view class="miaosha">
							<text>
								距结束&nbsp;3:12:23:40
							</text>
						</view>
					</view>
					<view class="new_shop_discount_one_two">
						<view class="discount_top">
							<view class="discount_top_num">
								<text>5.6折起</text>
							</view>
							<view class="discount_top_title">
								亲肤透气 贴服稳定 | Miss LI里小姐 三明治软...
							</view>
						</view>
						<view class="discount_center">
							<view class="bar">
								
							</view>
							<view class="bar_s">
								
							</view>
							<view class="bar_num">
								已经抢购<text>20</text>件
							</view>
						</view>
						<view class="discount_bottom">
							<view class="price">
								￥<text>89</text>
							</view>
							<view class="old_price">
								￥158
							</view>
							<view class="buy">
								立即抢购
							</view>
						</view>
					</view>
				</view>
				<view class="new_shop_discount_one">
					<view class="new_shop_discount_one_one">
						<image src="https://img01.yzcdn.cn/upload_files/2022/01/06/FvXSl6tVLBZCg1ohR_29lh-cYHDz.gif!middle.webp" mode=""></image>
						<view class="miaosha">
							<text>
								距结束&nbsp;3:12:23:40
							</text>
						</view>
					</view>
					<view class="new_shop_discount_one_two">
						<view class="discount_top">
							<view class="discount_top_num">
								<text>5.6折起</text>
							</view>
							<view class="discount_top_title">
								亲肤透气 贴服稳定 | Miss LI里小姐 三明治软...
							</view>
						</view>
						<view class="discount_center">
							<view class="bar">
								
							</view>
							<view class="bar_s">
								
							</view>
							<view class="bar_num">
								已经抢购<text>20</text>件
							</view>
						</view>
						<view class="discount_bottom">
							<view class="price">
								￥<text>89</text>
							</view>
							<view class="old_price">
								￥158
							</view>
							<view class="buy">
								立即抢购
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="shop_list">
				<view class="shopOfNew" v-for="(item,i) in shops" :key="i">
					<view class="shopOfNew_show">
						<image :src="item.url" mode=""></image>
					</view>
					<view class="shopOfNew_title">
						{{item.title}}
					</view>
					<view class="shopOfNew_price">
						<view class="price">
							￥<text>{{item.price}}</text>
						</view>
						<view class="shopCart">
							<view class="icon iconfont">&#xe617;</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="new_shop">
			<view class="new_shop_banner">
				<image src="https://img01.yzcdn.cn/upload_files/2020/11/17/FmL8moHTGNcUpZDAQnpQ8Tymt46-.png!large.webp" mode=""></image>
			</view>
			<view class="shop_list">
				<view class="shopOfNew" v-for="(item,i) in shops" :key="i">
					<view class="shopOfNew_show">
						<image :src="item.url" mode=""></image>
					</view>
					<view class="shopOfNew_title">
						{{item.title}}
					</view>
					<view class="shopOfNew_price">
						<view class="price">
							￥<text>{{item.price}}</text>
						</view>
						<view class="shopCart">
							<view class="icon iconfont">&#xe617;</view>
						</view>
					</view>
				</view>
			</view>
			<view class="more">
				查看更多
			</view>
			<view class="qun">
				<view>
					<image src="https://img01.yzcdn.cn/upload_files/2020/10/22/Fu1b4-D3NZmgQ8l4O_kpMa2QlfHF.png!small.webp" mode=""></image>
				</view>
				<view>
					<text>拾遗生活社群</text>
					<text>小店优惠，提前知道</text>
				</view>
				<view>
					<view class="btn">
						入群
					</view>
				</view>
			</view>
			<view class="info">
				<image src="" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				images_1:[
					{
						url:'https://img01.yzcdn.cn/upload_files/2021/04/28/FnescqkqXEIZ77C8vajwQGUC5yi-.jpg!large.webp',
						title:'美妆美护'
					},
					{
						url:'https://img01.yzcdn.cn/upload_files/2021/08/24/FinHUcSUnbLRQbrDe4XLCezkRiFv.jpg!large.webp',
						title:'服装搭配'
					},
					{
						url:'https://img01.yzcdn.cn/upload_files/2021/08/24/Fv-9GTZh-oAqg_PPBwavJ3h9M3Ap.jpg!large.webp',
						title:'运动健身'
					},
					{
						url:'https://img01.yzcdn.cn/upload_files/2021/08/24/FixnfZrXAa3l5ygaqbbrBVXLzrk_.jpg!large.webp',
						title:'内衣内裤'
					},
					{
						url:'https://img01.yzcdn.cn/upload_files/2021/04/28/Fn-vVuCRr8ypuzOcTRpxMZRWBXOV.jpg!large.webp',
						title:'出行必备'
					}
				],
				images_2:[
					{
						url:'https://img01.yzcdn.cn/upload_files/2021/04/28/Fg6QsxKileo099TDSwhaeQsjugGq.jpg!large.webp',
						title:'食材零嘴'
					},
					{
						url:'https://img01.yzcdn.cn/upload_files/2021/04/28/FphbWnwVQKaGUpIfGJV1rBl7ud3g.jpg!large.webp',
						title:'家居生活'
					},
					{
						url:'https://img01.yzcdn.cn/upload_files/2021/04/28/FgWQxOrOFTfjr6p7mmqdFab7Lnz_.jpg!large.webp',
						title:'养生好物'
					},
					{
						url:'https://img01.yzcdn.cn/upload_files/2021/04/28/FiehKL5G_6_l3QDWPYowX2jp4TZL.jpg!large.webp',
						title:'餐厨帮手'
					},
					{
						url:'https://img01.yzcdn.cn/upload_files/2021/08/24/FsjtEUtlkEj1qC3NWNezM_ZwtOSt.jpg!large.webp',
						title:'节礼推荐'
					}
				],
				shops:[
					{
						url:'https://img01.yzcdn.cn/upload_files/2022/02/08/FmBieVKlmaJVBi9RhyTyy9TEYDTr.png!middle.webp',
						title:'【2.9-2.16下单即赠同款30ml】及时舒缓 维稳补水 | Haa密集维稳精华水 150ml/瓶',
						price:'179'
					},
					{
						url:'https://img01.yzcdn.cn/upload_files/2022/02/08/Fm1fnwc6V1lgTlkiOD9WusEHwhzs.jpg!middle.webp',
						title:'科学成分 温和护肤 | Haa密集修护维稳精华液 30ml/瓶',
						price:'299'
					},
					{
						url:'https://img01.yzcdn.cn/upload_files/2022/01/19/FtRDllTIO7YnDnFwwtY_cN2RCx5u.jpg!middle.webp',
						title:'保热保冷 耐摔不易碎 | UKA cafe保温玻璃马克杯 300ml/个（四色可选）',
						price:'79'
					},
					{
						url:'https://img01.yzcdn.cn/upload_files/2022/01/19/FiwcSpk01YJi5rD_bbapPnRE89c4.jpg!middle.webp',
						title:'温和护手 洁净好心情 | Frosch福纳丝果蔬餐具洗洁精 多种规格可选',
						price:'89'
					},
					{
						url:'https://img01.yzcdn.cn/upload_files/2022/01/21/Fjjmeor7NnhSoP_fBgfraEiV2-gn.jpg!middle.webp',
						title:'自然香型 强力除味 | AIRFUNK空气净化剂 350ml/罐 （三种味道可选）',
						price:'69'
					},
					{
						url:'https://img01.yzcdn.cn/upload_files/2022/01/17/FhN4A7DpmFDpZd-RcugemhAN-FVf.jpg!middle.webp',
						title:'亲肤透气 舒适好穿 | 奥康鸿运男女袜 5双装',
						price:'69'
					},
					{
						url:'https://img01.yzcdn.cn/upload_files/2022/01/13/FqnamWryxFqon4wOzYwyi6Fiyhon.jpg!middle.webp',
						title:'皮薄仁大 口感酥脆 | 一炮黄尘瓜子 300g/袋 （两种味道可选）',
						price:'54.90'
					},
					{
						url:'https://img01.yzcdn.cn/upload_files/2022/01/11/FrUk_EcwB7ru4mZUox1TQ2Ji9xvz.jpg!middle.webp',
						title:'不同睡姿同样舒适 | Home kiss轻奢防螨酒店枕头 两色可选',
						price:'99'
					},
					{
						url:'https://img01.yzcdn.cn/upload_files/2022/01/13/Fud-VENcvQWrtZKlOWier0UBm93H.png!middle.webp',
						title:'酥心开运好礼 | 黄老五 春节限定1134g大礼包 （A、B两款随机发）',
						price:'138'
					},
				],
				
			};
		},
	}
</script>

<style lang="scss">
	.top_search{
		width: 100%;
		height: 40px;
		background: #fef8ec;
		position: relative;
		
		
		.tip{
			width:90%;
			height: 100%;
			position: absolute;
			right: 0;
			overflow: hidden;
			top: 20%;
			
			text{
				display: block;
				width: 300%;
				position: absolute;
				animation: move 7s linear infinite;
				color: #aaa9a2;
			}
		}
		
		.icon{
			position: absolute;
			top: 20%;
			left: 5px;
			font-size: 20px;
			color: red;
			
		}
		@keyframes move {
		  0% {
		    left: 150%;
		  }
		  100% {
		    left: -250%;
		  }
		}
	}
	.search_bg{
		width: 100%;
		height: 120upx;
		background: #f5f8ff;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		
		.icon{
			position: absolute;
			left: 14%;
			font-size: 20px;
			
			
		}
		
		input{
			width: 70%;
			height: 60%;
			background: #ffffff;
			border-radius: 72upx;
			padding-left: 40px;
			
		}
	}
	.shop_head{
		width: 100%;
		height: 50vw;
		display: flex;
		flex-wrap: wrap;
		align-content: space-around;

		.shop_zhanshi{
			width: 100%;
			height: 48%;
			background: #fff;
			display: flex;
			justify-content: space-around;
			
			
			view{
				width: 20%;
				height: 100%;
				position: relative;
				display: flex;
				justify-content: center;
				
				image{
					width: 80%;
					height: 70%;
				}
				text{
					display: block;
					position: absolute;
					bottom: 0;
					width: 100%;
					height: 30%;
					overflow: hidden;
					text-align: center;
					font-size: 13px;
					line-height: 30px;
					background: #f9f7f8;
					color: #4b4b4b;
				}
			}
			
		}
	}
	.banner{
		width: 100%;
		height: 70vw;
		background: #f9f7f8;
		
		.banner_one{
			width: 80%;
			height: 31%;
			// background: red;
			margin: 10px auto;
			border-radius: 10px;
			overflow: hidden;
			
			image{
				width: 100%;
				height: 100%;
			}
		}
		.banner_two{
			width: 80%;
			height: 31%;
			// background: red;
			margin: 10px auto;
			border-radius: 10px;
			overflow: hidden;
			
			image{
				width: 100%;
				height: 100%;
			}
		}
		.banner_three{
			width: 80%;
			height: 31%;
			// background: red;
			margin: 10px auto;
			display: flex;
			justify-content: space-between;
			
			.banner_three_one{
				width: 30%;
				height: 100%;
				// background: blue;
				
				image{
					width: 100%;
					height: 100%;
				}
			}
			.banner_three_two{
				width: 30%;
				height: 100%;
				// background: blue;
				
				image{
					width: 100%;
					height: 100%;
				}
			}
			.banner_three_three{
				width: 30%;
				height: 100%;
				// background: blue;
				
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
	.new_shop{
		background: #f9f7f8;
		width: 100%;
		height: 320vw;
		
		.new_shop_banner{
			width: 80%;
			height: 8%;
			display: inline-block;
			margin: 5% 10%;
			border-radius: 10px;
			overflow: hidden;
			
			image{
				width: 100%;
				height: 100%;
			}
		}
		
		.new_shop_discount{
			width: 80%;
			height: 30%;
			margin: 0 10%;
			display: flex;
			align-content: space-around;
			flex-wrap: wrap;
			
			.new_shop_discount_one{
				width: 100%;
				height: 40%;
				border-radius: 10px;
				overflow: hidden;
				
				.new_shop_discount_one_one{
					width: 40%;
					height: 100%;
					float: left;
					position: relative;
					
					image{
						width: 100%;
						height: 100%;
					}
					
					.miaosha{
						display: flex;
						justify-content: center;
						align-items: center;
						width: 100%;
						height: 20%;
						background: #ff5555;
						position: absolute;
						bottom: 0;
						left: 0;
						
						text{
							font-weight: bold;
							font-size: 12px;
							color: white;
							text-align: left;
							line-height: 160%;
						}
					}
					
				}
				.new_shop_discount_one_two{
					width: 60%;
					height: 100%;
					background: #fff;
					float: left;
					display: flex;
					align-content: space-between;
					flex-wrap: wrap;
					
					.discount_top{
						width: 100%;
						height: 30%;
						position: relative;
						
						&_num{
							position: absolute;
							width:26%;
							height: 35%;
							background: #ffd5c3;
							left: 4%;
							top: 10%;
							border-radius: 20px;
							display: flex;
							justify-content: center;
							align-items: center;
							
							text{
								font-size: 12px;
								color: #ca525e;
							}
						}
						
						&_title{
							width: 100%;
							height: 100%;
							text-indent: 35%;
							font-size: 3vw;
							line-height: 5vw;
							overflow: hidden;
						}
						
					}
					.discount_center{
						width: 100%;
						height: 30%;
						// background: blue;
						position: relative;
						
						.bar{
							width: 80%;
							height: 20%;
							background: #ebecf0;
							position: absolute;
							top: 20%;
							left: 2%;
							border-radius: 5px;
						}
						.bar_s{
							width: 25%;
							height: 20%;
							background: #fd4c54;
							position: absolute;
							top: 20%;
							left: 2%;
							border-radius: 5px;
						}
						.bar_num{
							width: 100%;
							height: 40%;
							position: absolute;
							bottom: 0;
							right: 0;
							font-size: 2vw;
							color: #b6aa9e;
							text-align: right;
							padding-right: 20upx;
							
							text{
								color: red;
								padding: 0 4%;
								font-weight: bold;
								font-size: 3.5vw;
							}
						}
						
						
					}
					.discount_bottom{
						width: 100%;
						height: 30%;

						display: flex;
						justify-content: center;
						align-items: center;
						
						.price{
							width: 30%;
							height: 100%;
							// background: red;
							color: red;
							text-align: right;
							line-height: 8vw;
							text-align: center;
							font-size: 4vw;
							
							text{
								font-size: 5vw;
								color: red;
								font-weight: bold;
							}

						}
						.old_price{
							width: 20%;
							height: 100%;
							text-align: left;
							font-size: 3vw;
							line-height: 8vw;
							color: #888888;
							text-decoration: line-through #888888 1px;

						}
						.buy{
							width: 40%;
							height: 70%;
							border: 1px solid #dea9af;
							border-radius: 20px;
							font-size: 3vw;
							text-align: center;
							color: #fc6668;
							margin-left: 10px;
							line-height: 6vw;
						}
					}
				}
				
			}
		}
	
		.shop_list{
			width: 80%;
			height: 58%;
			margin: auto;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-content: space-around;
			overflow: hidden;
			border-radius: 2px;
			// background: blue;
			
			.shopOfNew{
				width: 30%;
				height: 25%;
				// border-radius: 10px;
				
				.shopOfNew_show{
					width: 100%;
					height: 65%;
					position: relative;
					// border-radius: 10px;
					
					image{
						width: 100%;
						height: 100%;
						border-radius: 10px 10px 0 0;
					}
					
				}
				
				.shopOfNew_title{
					width: 100%;
					height: 20%;
					font-size: 3.5vw;
					overflow: hidden;
					background: #fff;
				}
				.shopOfNew_price{
					width: 100%;
					height: 15%;
					background: #ffffff;
					font-size: 8vw;
					border-radius: 0 0 5px 5px;
					display: flex;
					justify-content: space-between;
					
					.price{
						display: flex;
						width: 30%;
						height: 100%;
						color: red;
						font-size: 2vw;
						line-height: none;
						justify-content: center;
						align-items: center;
						padding-left: 5px;
						
						text{
							font-size: 4vw;
						}
					}
					.shopCart{
						display: flex;
						width: 30%;
						height: 100%;
						color: red;
						
						line-height: none;
						justify-content: center;
						align-items: center;
						
						.icon{
							font-size: 5vw;
						}
						
					}
				}
			}
		}
		
		.more{
			width: 80%;
			height: 10vw;
			background: #ffffff;
			margin: auto;
			border-radius: 10px;
			text-align: center;
			line-height: 9vw;
			font-size: 5vw;
		}
		.qun{
			width: 100%;
			height: 20vw;
			background: #fff;
			margin-top: 20px;
			
			view{
				float: left;
				
				&:nth-child(1){
					width: 20%;
					height: 100%;
					background: blue;
					
					image{
						width: 100%;
						height: 100%;
					}
				}
				
				&:nth-child(2){
					width: 40%;
					height: 100%;
					// background: blue;
					display: flex;
					flex-wrap: wrap;
					align-content: space-around;
					
					text{
						display: block;
						width: 100%;
						height: 40%;
						text-indent: 20px;
						// background: #F0AD4E;
						
						&:nth-child(1){
							font-size: 4vw;
							font-weight: bold;
							line-height: 13vw;
						}
						&:nth-child(2){
							font-size: 3vw;
							color: #828282;
							
						}
					}
				}
				
				&:nth-child(3){
					width: 30%;
					height: 100%;
					float: right;
					display: flex;
					justify-content: center;
					align-items: center;
					
					.btn{
						width: 50%;
						height: 30%;
						background: #ff557f;
						text-align:center;
						font-size: 14px;
						font-weight: bold;
						color: #fff;
						line-height: 6vw;
						font-size: 3vw;
					}
				}
			}
		}
	}
</style>
