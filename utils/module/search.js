import request from "@/utils/https.js"
import url from "@/utils/interfaces.js"

async function getGoodsListBySearch({ filterby, page, size }) {
	// filterby: all/public/hot
	return await request({ url: url.search.getGoodsListData + `/${filterby}/${page}/${size}` })
}

export default { getGoodsListBySearch }
