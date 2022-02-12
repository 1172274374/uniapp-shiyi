module.exports = (params) => {
	const url = params.url;
	let method = params.method || 'GET';
	let header = params.header || {};
	const data = params.data || {};
	
	// 将请求的方式转换为大写，若方式为POST，则添加header
	if (method) {
		method = method.toUpperCase();
		if (method === "POST") {
			header = { "content-type": "application/x-www-form-urlencoded" }
		}
	}
	
	// 发起请求时，显示加载中的动画
	if (!params.hideLoading) {
		uni.showLoading({ title: "加载中..." })
	}
	
	// 发起网络请求
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			method,
			header,
			data,
			success: (res) => {
				if (res.statusCode && res.statusCode !== 200) { // api报错
					uni.showModal({ content: res.msg })
					return;
				}
				resolve(res.data)
			},
			fail: (e) => {
				uni.showModal({ content: e.meg })
				reject(e.data)
			},
			complete: (obj) => {
				console.log("网络请求complete")
				uni.hideLoading()
				reject(obj.data)
				return;
			}
		})
	})
}