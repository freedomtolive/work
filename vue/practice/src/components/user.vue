<template>
    <div>
        <h1>user</h1>
        <div class="user-list">
            <!-- 通过字符串加变量的形式绑定动态路径参数（可绑多个），在router下的index中设置名字 -->
            <!-- <router-link style="padding:0 20px;" :to="'/user/'+ item.tip + '/'+item.id" v-for= "(item,index) in userList" :key="index">{{item.userName}}</router-link> -->
            <!-- 默认加上查询字符串，让我的关注显示出来 -->
            <router-link style="padding:0 20px;" :to="{path:'/user/'+ item.tip + '/'+item.id,query:{info:'follow'}}" v-for= "(item,index) in userList" :key="index">{{item.userName}}</router-link>
        </div>
        <!-- 如果userInfo.userName有值，则说明有信息 -->
        <div class="user-info" v-if="userInfo.userName" style="font-size:20px;">
            <p>姓名：{{userInfo.userName}}</p>
            <p>性别：{{userInfo.sex}}</p>
            <p>爱好：{{userInfo.hobby}}</p>
        </div>
        <hr>
        <div v-if="userInfo.userName" class="info-list" style="font-size:20px;">
            <!-- ?info=follow 为查询字符串 -->
            <!-- <router-link exact to="?info=follow">我的关注</router-link>
            <router-link exact to="?info=share">我的分享</router-link> -->
            <!-- query后的为查询字符串 -->
            <!-- <router-link exact :to="{path:'',query:{info:'follow',a:1}}">我的关注</router-link>  可加多个值 -->
            <router-link exact :to="{path:'',query:{info:'follow'}}">我的关注</router-link>
            <router-link exact :to="{path:'',query:{info:'share'}}">我的分享</router-link>
            <!-- 拿查询字符串的方式，在vue实例上，所以可以展示，在vue.$route上 -->

            <transition>
                <div>
                    {{$route.query}}
                </div> 
            </transition>
        </div>
    </div>
</template>

<script>
    let dataList = [
        {
            id:1,
            tip:"vip",
            userName:"leo1",
            sex:'男',
            hobby:'写代码'
        },
        {
            id:2,
            tip:"vip",
            userName:"leo2",
            sex:'男',
            hobby:'唱歌'
        },
        {
            id:3,
            tip:"common",
            userName:"leo3",
            sex:'女',
            hobby:'设计'
        }
    ];
export default {
    data(){
        return {
            userList: dataList,
            userInfo:{}
        }
    },
    // watch可以监控对象，从而拿到需要的值
    watch:{
        // 监控$route(路由信息)
        // 路劲发生变化，$route会重新赋值，监控这个属性，会执行这个函数
        $route(){
            // console.log(this.$route.params.userId);
            let id=this.$route.params.userId;

            this.getData();
        }
    },
    // 生命周期钩子函数
    created() {
        //this.$route 拿到这个实例的路由对象（里面可以拿到路由信息）
        // console.log(this.$route.params.userId)
        // console.log(this.$route.params.tip)  //获取路由后面的对应名称为userId的值，此处的userId通过router下的index设置为动态路径参数

        // 服用这个组件，这个函数不会再次被调用
        // 地址一旦发生变化，$route会重新生成一个路由信息对象
        this.getData();
        
    },
    methods:{
        getData(){
            let id=this.$route.params.userId;

            if(id){
                // 过滤数组找到id相同的值
                this.userInfo = this.userList.find((item)=>{
                    return id == item.id;
                })
            }else{
                this.userInfo = {};
            }
        }
    }
}
</script>


<style>

</style>

