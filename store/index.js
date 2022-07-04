import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		token:uni.getStorageSync('token'),
		isLogin:uni.getStorageSync('isLogin')
	},
    mutations: {
			setToken(state,data){
					state.token=data
				},
			setLogin(state,data){
				state.isLogin=data;
			}
	},
    actions: {
		
	},
	getters: {
	    isLogin: state => {
	      let loginIn = state.isLogin
	      if (!loginIn) {
	        loginIn =localStorage.getItem('isLogin')
	      }
	      return loginIn
	    },
		token: state => {
		  let token = state.token
		  if (!token) {
		    token=localStorage.getItem('token')
		  }
		  return token
		},
	}

})
export default store
