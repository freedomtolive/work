import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import child from '@/components/child'
import about from '@/components/about'

// 将路由作为vue的插件
Vue.use(Router)

export default new Router({
  mode:"history",
  linkActiveClass:"on",/* 设置路由选中的class */
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path:'/child',
      name: 'child',
      component: child
    },
    {
      path:'/about',
      name: 'about',
      component: about
    }
  ]
})
