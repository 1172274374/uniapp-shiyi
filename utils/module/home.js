import request from "@/utils/https.js"
import url from "@/utils/interfaces.js"

async function getMallData(params) {
	return await request({ url: url.home.getMallData })
}

export default { getMallData }
