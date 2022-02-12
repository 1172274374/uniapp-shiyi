import request from "@/utils/https.js"
import url from "@/utils/interfaces.js"

async function getCategoryListData(params) {
	return await request({ url: url.category.getCategoryListData })
}

export default { getCategoryListData }