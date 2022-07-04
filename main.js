import App from './App'
import Vue from 'vue'
import uView from "uview-ui";
import BaseUrl from './net/api.js';
// 解决百度地图跨域问题
import {VueJsonp} from 'vue-jsonp'
Vue.use(VueJsonp)

Vue.prototype.$BaseUrl = BaseUrl
Vue.use(uView);
//封装请求
import  api from './net/request2.js'
Vue.prototype.$myHttp =api
import store from './store'   //引入vuex
Vue.prototype.$store = store    //把vuex定义成全局组件
// #ifndef VUE3
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
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