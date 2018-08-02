import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home'
// import Layout from '@/views/layout'
// import Project from '@/views/backend/project'
// import Workbench from '@/views/backend/workbench'
// import Doc from '@/views/backend/doc'

// 利用webpack实现懒加载
// 打包为三个代码块
let Layout = (resolve) =>{
  return require.ensure([],()=>{
    resolve(require('@/views/layout'))
  })
}
let Project = (resolve) =>{
  return require.ensure([],()=>{
    resolve(require('@/views/backend/project'))
  })
}
let Workbench = (resolve) =>{
  return require.ensure([],()=>{
    resolve(require('@/views/backend/workbench'))
  })
}
// let Doc = (resolve) =>{
//   return require.ensure([],()=>{
//     resolve(require('@/views/backend/doc'))
//   })
// }
// 简便写法(import不支持第二个参数，无法合并js)
let Doc = (resolve) =>{
  return import('@/views/backend/doc');
}

//打包为两个代码块(后两个打包为1个代码块) 
// let Layout = (resolve) =>{
//   return require.ensure([],()=>{
//     resolve(require('@/views/layout'))
//   })
// }
// let Project = (resolve) =>{
//   return require.ensure([],()=>{
//     resolve(require('@/views/backend/project'))
//   })
// }
// let Workbench = (resolve) =>{
//   return require.ensure([],()=>{
//     resolve(require('@/views/backend/workbench'))
//   },"abc")
// }
// let Doc = (resolve) =>{
//   return require.ensure([],()=>{
//     resolve(require('@/views/backend/doc'))
//   },"abc")
// }

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
          component:Project,
          meta:{
            login:true
          }
        },
        {
          path:'/workbench',
          name:'Workbench',
          component:Workbench,
          meta:{
            login:true
          }
        },
        {
          path:'/doc',
          name:'Doc',
          component:Doc,
          meta:{
            login:false
          }
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

router.beforeEach((to,from,next)=>{
  // matched为一个数组，数组的第一项为父级路由信息，数组的第二项为子路由信息···
  // console.log(to.matched)
  // 数组的some方法：遍历数组，数组中有一项符合条件，即返回true，否则返回false
  if(to.matched.some((item)=>item.meta.login)){
    // 拿到跟实例,才可以运用跟实例中的方法
    // console.log(router.app)
    let info = router.app.$local.fetch("miaov");
    if(info.login){
      next();
    }else{
      // 当页面跳转到登录时，记录前一个页面的路径，使登陆后页面可以跳转回前一个页面
      next({
        path:'/login',
        query:{
          redirect:to.path.slice(1)
        }
      });

    }
  }else{
    next();
  }

  
})

export default router;
