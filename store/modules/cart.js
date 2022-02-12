/**
 * 获取参数：this.$store.state.cart.num
 * 
 * 调用方法：
 * import { mapState, mapMutations } from 'vuex'
 * 
 * data() {
 *    num: this.$store.state.cart.num
 * },
 * computed: {
			...mapState({
				url: state => state.cart.num
			})
		},
 * mounted() {
    console.log("message", this.num)  // 0
    this.setNum(20)
    console.log("message", this.$store.state.cart.num)  // 20
  },
 * methods: {
    ...mapMutations({
      setNum: 'cart/setNum'
    })
  }
 * 
*/
export default {
  namespaced: true,
  state: {
    num: 123
  },
  getters: {},
  mutations: {
  },
  actions: {

  }
}
