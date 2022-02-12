import Vue from 'vue'
import Vuex from 'vuex'
import cart from "./modules/cart.js"
import search from "./modules/search.js"

Vue.use(Vuex)

const state = {}

const getters = {

}

const mutations = {
	
}

const actions = {
	
}

export default new Vuex.Store({
  state,
  getters,
	mutations,
  actions,
  modules: {
    cart,
		search,
  }
})
