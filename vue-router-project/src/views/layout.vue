<template>
  <div>
    <header-nav></header-nav>
    <div class="breadcrumb">
      <span>首页</span>
      /
      <span>{{flag}}</span>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Header from '@/components/header';

  let flags = {
    project : "我的文档",
    workbench : "工作台",
    doc : "文档"
  }

  export default{
    data (){
      return {
        flag:""
      }
    },
    watch:{
      $route(){
         this.flag = flags[this.$route.path.slice(1)];
      }
    },
    beforeRouteEnter (to, from, next) {
      next((vm)=>{
        // 此处this为route的实例r，所以要用vue的实例必须用vm
        // vm为vue的实例
        vm.flag = flags[to.path.slice(1)];
      })
    },
    components:{
      headerNav : Header
      // (resolve) => { //resolve表示成功 
      //   // 利用定时器模拟ajax请求
      //   console.log(resolve)
      //   setTimeout(()=>{
      //     resolve(require('@/components/header'));
      //     resolve(Header);
      //   },2000)
      // }
    }
  }
</script>
<style>

</style>
