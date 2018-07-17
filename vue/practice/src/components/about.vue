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
        <hr>
        <div>{{text}}</div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                text: "改变前"
            }
        }, 
        // 组件使用的钩子函数，创建实例
        beforeCreate(){
            console.log("beforeCreate")
        },
        // 组件中路由的钩子函数
        beforeRouteEnter(to,from,next){
            // 进入组件时执行
            console.log("beforeRouteEnter");
            // 因为路由的钩子函数先执行，所以此时没有vue实例，即没有this，要想获取this，需要用箭头函数传参的方式，此时vm即为this
            next((vm)=>{
                vm.text = "改变了";
            });
        },
        beforeRouteUpdate(to,from,next){
            // 路由更新后执行的钩子函数
            console.log("beforeRouteUpdate");
            next();
        },
        beforeRouteLeave(to,from,next){
            console.log("beforeRouteLeave");
            // 离开组件是执行
            next();
        }

    }
</script>
<style>

</style>

