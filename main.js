import App from './App'
import Store from './store'
import * as filters from './utils/filters.js'
import status from "@/components/status.vue"
import uView from '@/uni_modules/uview-ui'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.component("page-status", status)
App.mpType = 'app'
const app = new Vue({
    ...App
})

Vue.use(uView)

uni.$u.setConfig({
	// 修改$u.config对象的属性
	config: {
		// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
		unit: 'rpx'
	},
	// 修改$u.props对象的属性
	props: {
		// 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
		radio: {
			size: 15
		}
		// 其他组件属性配置
		// ......
	}
})

app.$mount()
Object.keys(filters).forEach(key => { Vue.filter(key, filters[key]) })
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

Vue.prototype.$store = Store
