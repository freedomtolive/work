import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import child from '@/components/child'
import about from '@/components/about'
import notFond from '@/components/404'
import work from '@/views/work'
import study from '@/views/study'
import hobby from '@/views/hobby'

// 将路由作为vue的插件
Vue.use(Router)

export default new Router({
  mode:"history",
  linkActiveClass:"on",/* 设置路由选中的class */
  routes: [
    {
      path:'/',
      component: index
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      // 使index222也能匹配到index
      alias: '/index222'
    },
    {
      path:'/child',
      name: 'child',
      component: child
    },
    {
      path:'/about',
      component: about,
      children:[
        {
          // 设为空值时为默认子路由，即选择about时渲染study
          // 如果有子路由就不要在父路由内设置name值，将name值赋给子理由就可以
          path:'',
          name: 'about',
          component:study
        },
        {
          path:'work',
          component:work
        },
        {
          path:'hobby',
          component:hobby
        }
      ]
    },
    {
      // 当访问的路由不是上面几个时载入notFont
      // path:'*',
      // component:notFond
      // 当访问的路由不是上面几个时跳回index（重定向）
      path:'*',
      // redirect:'/index'
      // redirect:{path:'/index'}
      // redirect:{name:'index'}
      redirect:(to)=>{
        // to 是目标路由对象，就是访问路径的路由信息
        if(to.path == '/123'){
          return '/index'
        }else if(to.path == '/456'){
          return '/child'
        }else{
          return {name:'about'}
        }
      }
    }
  ]
})
