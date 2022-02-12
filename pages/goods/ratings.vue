<template>
	<view class="ratings-page">
		<video class="video-comment" id="videoComment" :src="videoPath" controls @fullscreenchange="viderFullscreen"></video>
		<!-- 评论的类别：好评、良好、差评... -->
		<view class="header">
			<view :class="{ 'selected': index === seletedItemNum }" @click="onClickCommentTypeBtn(index)" class="comments-type" v-for="(item, index) of commentsTypeList" :key="index">
				{{ item.title }} ({{ item.num }})
			</view>
		</view>
		<!-- 评论区中的每一条评论 -->
		<view class="comment-list">
			<view class="comment" v-for="(item,index) in comments" :key="index">
				<!-- 头像 -->
				<image class="head-portrait" :src="item.face" />
				<!-- 评论的内容区域 -->
				<view class="comment-body">
					<!-- 用户名、日期 -->
					<view class="username">
						<view class="name">{{item.username}}</view>
						<view class="date">{{item.date}}</view>
					</view>
					<!-- 规格 -->
					<view class="spec">{{item.spec}}</view>
					<!-- 评论的内容 -->
					<view class="comment-content">{{item.content}}</view>
					<!-- 视频、图片区域 -->
					<view class="medias">
						<!-- 视频区域 -->
						<view @tap="onClickVideo(video.path)" class="video" v-for="(video) in item.video" :key="video.path">
							<image class="img" :src="video.img" />
							<view class="icon iconfont play-btn">&#xe75d;</view>
						</view>
						<!-- 图片区域 -->
						<image class="pic" @click="onClickImage(imgItem, item.img)" v-for="(imgItem) in item.img" :key="imgItem" :src="imgItem" />
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Ratings",
		data() {
			return {
				comments: [],
				commentsTypeList: [
					{ title: "全部", num: 25 },
					{ title: "好评", num: 10 },
					{ title: "良好", num: 5 },
					{ title: "差评", num: 0 },
					{ title: "有图", num: 10 },
					{ title: "追评", num: 5 },
				],
				seletedItemNum: 1,  // 顶部评论类型按钮列表中，选中的那个的索引
				videoPath: "",  // 视频的播放地址
				videoContext: "",  // 视频的上下文对象
			}
		},
		onLoad() {
			this.comments = uni.getStorageSync("comment")
			this.videoContext = uni.createVideoContext("videoComment")
		},
		methods: {
			onClickCommentTypeBtn(index) {
				this.seletedItemNum = index
			},
			// 评论中，图片的点击事件。作用：全屏浏览图片
			onClickImage(imgItem, imgList) {
				uni.previewImage({
					current: imgItem,
					urls: imgList
				})
			},
			// 视频播放事件
			onClickVideo(videoPath) {
				this.videoPath = videoPath
				this.$nextTick(() => {
					this.videoContext.requestFullScreen({direction:0})
				})
			},
			viderFullscreen(e) {
				if(e.detail.fullScreen){ // 判断当前状态是否为全屏
					this.videoContext.play();
				}else{ // 退出全屏
					this.videoContext.pause();	
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ratings-page {
		.video-comment{
			position: fixed;
			top: 50%;
			right: 100%;
			// #ifdef  MP
			top: 0;
			right: 0;
			z-index: 99;
			width: 100%;
			height: 100%;
			// #endif
		}
		// 评论的类别：好评、良好、差评...
		.header {
			display: flex;
			flex-wrap: wrap;
			.comments-type {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 150upx;
				height: 50upx;
				background-color: #f9f9f9;
				border: 1px solid #ddd;
				border-radius: 40upx;
				margin-top: 16upx;
				margin-left: 20upx;
				font-size: 26upx;
				
				&.selected {
					border: 1px solid #f06c7a;
					color: #f06c7a;
				}
			}
		}
		// 评论区中的每一条评论
		.comment-list {
			margin-top: 68upx;
			padding-bottom: 48upx;
			.comment {
				display: flex;
				padding: 0 20upx;
				// 头像
				.head-portrait {
					flex-shrink: 0;
					width: 10vw;
					height: 10vw;
					border-radius: 100%;
					margin-right: 10upx;
				}
				// 评论的内容区域
				.comment-body {
					flex: 1;
					// 用户名、日期
					.username {
						display: flex;
						font-size: 32upx;
						justify-content: space-between;
						.name {
							color: #555;
							font-weight: bold;
						}
						.date {
							color: #d1d1d1;
							font-size:28upx;
						}
					}
					// 规格
					.spec {
						width: 100%;
						color: #aaa;
						font-size: 26upx;
					}
					// 评论的内容
					.comment-content {
						font-size: 30upx;
					}
					// 视频、图片区域
					.medias {
						display: flex;
						flex-wrap: wrap;
						.video {
							position: relative;
							display: flex;
							width: 120upx;
							height: 120upx;
							margin: 20upx 10upx 0 10upx;
							.img{
								width: 100%;
								height: 100%;
								border-radius: 20upx;
							}
							.play-btn {
								position: absolute;
								top: 50%;
								left: 50%;
								transform: translateX(-50%) translateY(-50%);
								font-size: 80upx;
								color: rgba(255,255,255,.9)
							}
						}
						.pic {
							display: flex;
							width: 120upx;
							height: 120upx;
							border-radius: 20upx;
							margin: 20upx 10upx 0 10upx;
						}
					}
				}
			}
			.comment + .comment {
				margin-top: 32upx;
			}
		}
	}
</style>
