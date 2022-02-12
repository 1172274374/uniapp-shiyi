/**
 * 获取参数：this.$store.state.search.num
 * 
 * 调用方法：
 * import { mapState, mapMutations } from 'vuex'
 * 
 * data() {
 *    num: this.$store.state.search.num
 * },
 * computed: {
			...mapState({
				url: state => state.search.url
			})
		},
 * mounted() {
    console.log("message", this.num)  // 0
    this.setNum(20)
    console.log("message", this.$store.state.search.num)  // 20
  },
 * methods: {
    ...mapMutations({
      setNum: 'search/setNum'
    })
  }
 * 
*/
export default {
  namespaced: true,
  state: {
    url: "/pages/tabBar/home/home",
  },
  getters: {},
  mutations: {
		setUrl(state, url) {
			state.url = url
		}
  },
  actions: {

  }
}
