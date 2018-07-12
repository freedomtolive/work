<template>
    <div>
        <h1>user</h1>
        <div class="user-list">
            <router-link style="padding:0 20px;" :to="'/user/'+item.id" key="index" v-for= "item,index in userList" >{{item.userName}}</router-link>
        </div>
    </div>
</template>

<script>
    let dataList = [
        {
            id:1,
            userName:"leo1",
            sex:'男',
            hobby:'写代码'
        },
        {
            id:2,
            userName:"leo2",
            sex:'男',
            hobby:'唱歌'
        },
        {
            id:3,
            userName:"leo3",
            sex:'女',
            hobby:'设计'
        }
    ];
export default {
    data(){
        return {
            userList: dataList
        }
    }
}
</script>


<style>

</style>

