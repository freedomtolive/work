<template>
  <div class="doc">
    <div class="doc-nav">
      <ul class="main-menu">
        <li>
          <router-link :to="{path:'#base'}">基础</router-link>
          <ul class="nav-dropdown">
            <li>
              <router-link :to="{path:'#start'}">开始</router-link>
            </li>
            <li>
              <router-link :to="{path:'#dongtai'}">动态路由</router-link>
            </li>
            <li>
              <router-link :to="{path:'#qiantaoluyou'}">嵌套路由</router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link :to="{path:'#jinjie'}">进阶</router-link>
          <ul class="nav-dropdown">
            <li>
              <router-link :to="{path:'#jinjie1'}">导航钩子</router-link>
            </li>
            <li>
              <router-link :to="{path:'#jinjie2'}">路由元信息</router-link>
            </li>
            <li>
              <router-link :to="{path:'#jinjie3'}">过渡动效</router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="doc-view">
      <doc-view></doc-view>
    </div>
  </div>
</template>

<script>
  import DocView from '@/views/backend/doc-view';
  // 添加tween.js
  import TWEEN from 'tween.js';

  export default{
    components : {
      DocView
    },
    // watch:{
    //   $route(){
    //     console.log(this.$route.hash.slice(1))
    //   }
    // }
    beforeRouteUpdate(to,from,next){
      // console.log(to.hash)
      this.animated(to);
      next();
    },
    methods:{
      animated(to){

        
        // function animateFrame(time){
        //   requestAnimationFrame(animateFrame);
        //   TWEEN.update(time);
        // }

        // if(to.hash){
        //   var el = document.getElementById(to.hash.slice(1));
        //   var doc = document.getElementsByClassName("doc")[0];

        //   if(el){
        //     new TWEEN.Tween({
        //       number:doc.scrollTop   //起始位置
        //     })
        //     .to({
        //       number:el.offsetTop   //结束位置
        //     })
        //     .onUpdate(function(){
        //       doc.scrollTop = this.number.toFixed(0)
        //     })
        //     .start();
        //   }
        // }else{

        // }
      }
    }
  }

</script>

<style>

</style>
