const domain = "https://www.thenewstep.cn/v1/uniapp/"

const interfaces = {
	// 首页
	home: {
		getMallData: domain + "api/profiles/mall_list"  // 获取首页轮播图、分类图标列表、热门商品的列表数据
	},
	// 商品分类
	category: {
		getCategoryListData: domain + 'api/profiles/category'  // 获取商品分类列表的数据
	},
	// 商品列表页
	goods: {
		getGoodsListData: domain + 'api/profiles/goodslist',  // 获取商品列表
		getGoodsInfo: domain + 'api/profiles/goods'  // 获取商品详情
	},
	// 商品搜索
	search: {
		getGoodsListData: domain + 'api/profiles/goodslist',  // 通过商品搜索获取商品列表
	}
}

module.exports = interfaces
