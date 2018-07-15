<template>
  <div id="app" style="height:2000px;">
    <div class="nav-box">
      <ul class="nav">
          <!-- 
            tag:要生成的标签，默认为a标签
            event:修改触发事件的事件类型 
            exact:精确匹配（匹配时不包含子页面）
            不输入exact为包含匹配，即路由配跑到了就显示选中状态
          -->
          
        <router-link to="/" tag="li" exact event="mouseover">
          <i class="fa fa-home"></i>
          <span>index</span>
        </router-link>
        <li>
          <!-- 设置独立的选中时的class -->
          <router-link :to="{path:'/child#abc'}" active-class="isActive">child</router-link>
        </li>
        <li>
          <router-link :to="about" >about</router-link>
        </li>
        <li>
          <router-link to="/user" event="mouseover" >user</router-link>
        </li>
      </ul>
    </div>
    <router-view name="silderName"/> <!-- 命名视图：渲染多个组件时会使用name -->
    <!-- 想在每个替换的组件中加相同的class，可以加在router-view上
        如果子标签也填加了class，router-vue的class也会加在子元素上，和子元素的标签组合 -->

    <!--  过度模式(mode)：
              in-out：新元素先进行过渡，完成之后当前元素过度离开
              out-in: 当前元素先进行过度，完成之后新元素过度进入 
               mode="out-in" 
          name:设置过度的前缀    
              -->
    <transition :name="names">
      <router-view class="center"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      index:'/index',
      about:'/about',
      names:'left'
    }
  },
  // watch:{
  //   $route(to,from){
  //     // to:进入的路由信息 from：离开的路由信息
  //     console.log("当前的路由下标：" + to.meta.index) 
  //     console.log("之前的路由下标：" + from.meta.index)
      
  //     if(to.meta.index < from.meta.index){
  //       this.names = "right";
  //     }else{
  //       this.names = "left";
  //     }
  //   }
  // }
  watch: {
    $route(to, from){
      console.log(to.meta.index)  // 目标导航下标
      console.log(from.meta.index)  // 离开导航下标

      if(to.meta.index < from.meta.index) {
        this.names = 'right'
      }else{
        this.names = 'left'
      }
    }
  },
}
</script>

<style>
body{
  overflow-x: hidden;
}
  .v-enter{
    opacity: 0;
  }
  .v-enter-to{
      opacity: 1;
  }
  .v-enter-active{
      transition:1s;
  }

  .v-leave{
    opacity: 1;
  }
  .v-leave-to{
      opacity: 0;
  }
  .v-leave-active{
      transition:2s;
  }

  .left-enter{
    transform: translateX(-100%);
  }
  .left-enter-to{
    transform: translateX(0);
  }
  .left-enter-active{
      transition:2s;
  }
  .left-leave{
    transform: translateX(0);
  }
  .left-leave-to{
    transform: translateX(100%);
  }
  .left-leave-active{
      transition:2s;
  }

  .right-enter{
    transform: translateX(100%);
  }
  .right-enter-to{
    transform: translateX(0);
  }
  .right-enter-active{
      transition:2s;
  }
  .right-leave{
    transform: translateX(0);
  }
  .right-leave-to{
    transform: translateX(-100%);
  }
  .right-leave-active{
      transition:2s;
  }
</style>
