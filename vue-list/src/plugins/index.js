/**
 *  注册全局插件
 * */

import VirtualScroll from './VirtualScroll'
 const plugin = {
  install(Vue) {
    Vue.component("VirtualScroll", VirtualScroll)
  }
 }

 export default plugin
