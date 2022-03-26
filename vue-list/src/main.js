// 引入伪造数据的文件
// import './mock'

import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 全局注册插件
import VirtualScroll from "./plugins"
Vue.use(VirtualScroll)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
