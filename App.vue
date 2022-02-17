<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss" scoped>
	/*每个页面公共css */
	
	@import '@/uni_modules/uview-ui/theme.scss';
	@import "@/uni_modules/uview-ui/index.scss";
	
	page{position: relative;background-color: #fff;}
	.uni-mask {
		background: rgba(0,0,0,.5) !important;
	}
	.scroll-box ::-webkit-scrollbar{
	    width: 0 !important;
	    display: none;
	    height: 0 !important;
	    -webkit-appearance : none;
	    background : transparent;
	}
	html{
		scroll-behavior: smooth;
	}
</style>

<style>
	@import "./static/iconfont/iconfont.css";
</style>
