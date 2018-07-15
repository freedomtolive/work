import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import child from '@/components/child'
import about from '@/components/about'
import user from '@/components/user'
import notFond from '@/components/404'
import work from '@/views/work'
import study from '@/views/study'
import hobby from '@/views/hobby'
import silder from '@/views/silder'

// 将路由作为vue的插件
Vue.use(Router)

export default new Router({
  mode:"history",
  linkActiveClass:"on",/* 设置路由选中的class */
  scrollBehavior(to,from,savePosition){ // 滚动条的行为 点击浏览器的前进后退或切换导航触发
      // console.log(to); //记录当前要进入的目标路由对象的信息
      // console.log(from); //记录离开的路由对象的信息
      // console.log(savePosition) //记录滚动条的目标(点击前进后退时记录值)

      // 前进后退时记录滚动条坐标
     /* if(savePosition){
        return savePosition
      }else{
        return {x:0,y:0}
      } */

      // 锚点 判断hash是否存在，如果存在，页面跳到hash的位置
      // if(to.hash){ 
      //   return {
      //     selector: to.hash
      //   }
      // }
  },
  routes: [

    // 在路由配置中，meta可以配置一些数据
    {
      path:'/',
      component: index,
      meta:{
        index:0
      }
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
      components : { // 渲染多个组件
        default : child, //渲染的第一个组件
        silderName:silder // 渲染的第二个组件(name为silderName的router-view)
      },
      meta:{
        index:1
      }
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
          component:study,
          meta:{
            index:2
          }
        },
        {
          path:'work',  // about/work 相对于主路由
          name: 'work',
          component:work
        },
        {
          path:'/hobby',  // /hobby 相对于根路径 组件会渲染，但是头部导航不会匹配到
          name: 'hobby',
          component:hobby
        }
      ]
    },
    {
      path:'/user/:tip?/:userId?', //匹配的路径为 /user/vip/1 ?和正则中的？相同，匹配1个或0个 
      component: user,
      meta: {
        index: 3
      }
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

