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

<style>
	/*每个页面公共css */
	@import "./static/iconfont/iconfont.css";
	
	page{position: relative;background-color: #fff;}
	.uni-mask {
		background: rgba(0,0,0,.5) !important;
	}
</style>
