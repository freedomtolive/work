// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import "./assets/css/app.css"

// 通过在Vue的原型上绑定自定义属性可以设置全局方法（将自定义属性绑定函数即可访问）
// Vue.prototype.$comment = "这是一个自定义属性"

// 将obj作为vue的插件全局使用；
// var obj = {
  // install : function(Vue,options){
    // Vue是vue的构造函数，options是传入的参数
    // console.log(Vue);
    // console.log(options)

    // 通过在Vue的原型上绑定自定义属性可以设置全局方法（将自定义属性绑定函数即可访问）
    // Vue.prototype.$abc = "自定义属性";
  // }
// }

// Vue.use(obj,{a:1}); //可以通过第二个参数添加参数

import Utils from './lib/utils'
// 把util作为vue的插件使用
Vue.use(Utils)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
