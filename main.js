import App from './App'
import Store from './store'
import * as filters from './utils/filters.js'
import status from "@/components/status.vue"

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
Vue.component("page-status", status)
App.mpType = 'app'
const app = new Vue({
    ...App
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
