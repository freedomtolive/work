<template>
   <ul class="list">
        <li 
            :key="index" 
            v-for="(item,index) in data"
            @click = getTitHandle(item.title)
        >{{item.title}}</li>
   </ul>
</template>

<script>


export default {
    props:["data"],
    methods:{
        getTitHandle(title){
            this.$emit("changeTitle", title)
        }
    }
}
</script>

<style>

</style>
