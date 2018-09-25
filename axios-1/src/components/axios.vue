<template>
    <div>
        <ul>
            
            <li 
                :key="index"
                v-for="(item,index) in list"

            >{{item.name}}</li>
        </ul>
    </div>
</template>

<script>
import axios from "axios"
// 一个转化数据的插件，不需要安装，axios内部提供
import qieryString from "queryString"

// 创建取消请求令牌
var CancelToken = axios.CancelToken
var source = CancelToken.source()

// 创建一个axios实例，自定义请求实例

var http = axios.create({
    // 基本路径
    baseURL:'https://www.easy-mock.com/mock/5b97d7aba7e9571f105d3f89/example/axios',
    // 连接超时
    timeout:1000,
    // 请求头
    header:{
        "customer-header":"header"
        // "content-type":"application/x-www-form-urlencoded" //让ajax支持queryString形式的字符串
    },
    reponseType:'json',
    // 查询字符串
    params:{
        book:"123"
    }
    // 转换请求 只适用于post（类似于中间键，发送数据之前会进行数据转化，转化为想要的数据）
    // transformRequest:[ function(data){
        // 函数中可以对数据进行处理
    //     return queryString.stringify(data)
    // }]
    // 请求到数据后进行转换数据
    // transformResponse:[function(data){
    //     console.log(data + "111")
    //     data.ibc = "123"
    //     return data
    // }]
    // 判断请求报错的范围
    // validateStatus(status){
    //     console.log(status)
    //     return status < 400
    // }
    // 执行取消请求
    // cancelToken:source.token
})

export default {
    data(){
        return {
            list:[1, 2, 3]
        }
    },
    created (){
        // axios({
        //     url:"https://www.easy-mock.com/mock/5b97d7aba7e9571f105d3f89/example/axios/getList",
        //     methods:'get'
        // })
        // .then((data) => {
        //     console.log(data.data)
        //     this.list = data.data.list
        //     console.log(this.list)
        // })
        // .catch((error) => {
        //     console.log(error)
        // })

        // axios.get("https://www.easy-mock.com/mock/5b97d7aba7e9571f105d3f89/example/axios/getList")
        // .then((data) => {
        //     console.log(data.data)
        //     this.list = data.data.list
        //     console.log(this.list)
        // })
        // .catch((error) => {
        //     console.log(error)
        // })

        // 发送数据{第一个参数为url，第二个参数为发送的数据}
        // axios.post("https://www.easy-mock.com/mock/5b97d7aba7e9571f105d3f89/example/axios/getList", {
        //         abc : "miaov",
        //         name : "小明"
        // })
        // .then((data) => {
        //     console.log(data.data)
        //     this.list = data.data.list
        //     console.log(this.list)
        // })
        // .catch((error) => {
        //     console.log(error)
        // })

        // axios.get("https://www.easy-mock.com/mock/5b97d7aba7e9571f105d3f89/example/axios/getList", {
        //     params: {
        //         abc : "miaov",
        //         name : "小明"
        //     }
        // })
        // .then((data) => {
        //     console.log(data.data)
        //     this.list = data.data.list
        //     console.log(this.list)
        // })
        // .catch((error) => {
        //     console.log(error)
        // })

        // http.get('/getList')
        // .then((data) => {
        //     this.list = data.data.list
        //     console.log(data)
        // })
        // .catch((error) => {
        //     if (axios.isCancel(error)){
        //         console.log(error.message)
        //     } else {
        //         console.log(error)
        //     }
        // })

        // 执行取消时打印 取消时走的是error
        // source.cancel("操作被用户取消")
        
        // 并发请求(只有两组数据都拿到才会返回内容)
        function http1(){
            return http.get("/getList")
        }

        function http2(){
            return http.get("/getList")
        }

        // axios.all([http1(), http2()]).then((data) => {
        //     // data传回的是一个数组，包含返回的数据
        //     console.log(data)
        // })
        // .catch((error) => {
        //     if (axios.isCancel(error)){
        //         console.log(error.message)
        //     } else {
        //         console.log(error)
        //     }
        // })

        // 拦截请求
        http.interceptors.request.use(function(config){
            // 可以对数据进一步操作，类似于中间件
            console.log("拦截了")
            console.log(config)
            return config
        }, function(data){
            console.log(data)
            console.log("reponse")
            // axios.interceptors.request.eject(data)
            return data
        })

        // 取消拦截
        // axios.interceptors.request.eject(myInterceptor)

        // 可以用axios.spread方法取用参数代替返回的数组
        axios.all([http1(), http2()]).then(axios.spread((res1, res2) => {
            console.log(res1)
            console.log(res2)
        }))
        .catch((error) => {
            if (axios.isCancel(error)){
                console.log(error.message)
            } else {
                console.log(error)
            }
        })
    }
} 
</script>

<style>

</style>


