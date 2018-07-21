import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home'
import Layout from '@/views/layout'
import Project from '@/views/backend/project'
import Workbench from '@/views/backend/workbench'
import Doc from '@/views/backend/doc'
import Login from '@/components/login'


Vue.use(Router)

let router =  new Router({
  mode:"history",
  linkActiveClass:"is-active", //设置激活元素的class
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/manage',
      name: 'Manage',
      component: Layout,
      children: [
        {
          path:'/project',
          name:'Project',
          component:Project
        },
        {
          path:'/workbench',
          name:'Workbench',
          component:Workbench
        },
        {
          path:'/doc',
          name:'Doc',
          component:Doc
        }
      ]
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'*',
      redirect:'/'
    }
  ]
})

export default router;
