<template>
    <div>
        <h1>关于我</h1>
        <hr>
        <ul class="nav">
            <!-- 用路径来绑定 -->
            <!-- <router-link to="/about" tag="li" exact><a>study</a></router-link>
            <router-link to="/about/work" tag="li"><a>work</a></router-link>
            <router-link to="/about/hobby" tag="li"><a>hobby</a></router-link> -->
            <!-- 用name值来绑定 -->
             <router-link :to="{name:'about'}" tag="li" exact><a>study</a></router-link>
            <router-link :to="{name:'work'}" tag="li"><a>work</a></router-link>
            <router-link :to="{name:'hobby'}" tag="li"><a>hobby</a></router-link>
        </ul>
        <hr>
        <!-- 渲染的二级导航的组件 router-view 嵌套router-view 要在路由的js中配置好 -->
        <router-view class="center"></router-view>
    </div>
</template>
<script>
export default {
    
}
</script>
<style>

</style>

