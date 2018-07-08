<template>
  <div id="app">
    <div class="nav-box">
      <ul class="nav">
          <!-- 
            tag:要生成的标签，默认为a标签
            event:修改触发事件的事件类型 
          -->
        <router-link :to=index tag="li" event="mouseover">
          <i class="fa fa-home"></i>
          <span>index</span>
        </router-link>
        <li>
          <!-- 设置独立的选中时的class -->
          <router-link :to="{path:'/child'}" active-class="isActive">child</router-link>
        </li>
        <li>
          <router-link to="/about">about</router-link>
        </li>
      </ul>
    </div>
    <!-- 想在每个替换的组件中加相同的class，可以加在router-view上
        如果子标签也填加了class，router-vue的class也会加在子元素上，和子元素的标签组合 -->
    <router-view class="center"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      index:'/index'
    }
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
