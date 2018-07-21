<template>
  <div>
    <header-nav></header-nav>
    <div class="breadcrumb">
      <span>首页</span>
      /
      <span>默认</span>
    </div>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import Header from '@/components/header';
  export default{
    data (){
      return {
        
      }
    },
    components:{
      headerNav : Header
    }
  }
</script>
<style>

</style>
