import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import child from '@/components/child'

// 将路由作为vue的插件
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path:'/childPage',
      name: 'childPage',
      component: child
    }
  ]
})
