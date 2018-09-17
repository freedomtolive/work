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

export default {
    data(){
        return {
            list:[1, 2, 3]
        }
    },
    created (){
        console.log("111")
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

        axios.get("https://www.easy-mock.com/mock/5b97d7aba7e9571f105d3f89/example/axios/getList")
        .then((data) => {
            console.log(data.data)
            this.list = data.data.list
            console.log(this.list)
        })
        .catch((error) => {
            console.log(error)
        })
    }
}
</script>

<style>

</style>


