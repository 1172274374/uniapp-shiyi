import request from "@/utils/https.js"
import url from "@/utils/interfaces.js"

async function getGoodsListData({ filterby, page, size }) {
	return await request({ url: url.goods.getGoodsListData + `/${filterby}/${page}/${size}` })
}

async function getGoodsInfo() {
	return await request({ url: url.goods.getGoodsInfo })
}

export default { getGoodsListData, getGoodsInfo }
