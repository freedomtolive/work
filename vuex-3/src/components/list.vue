<template>
   <ul class="list">
        <li 
            :key="index"
            v-for="(item,index) in getList"
            @click = "changeItemHandle(item.title)"
        >
        {{item.title}}
        </li>
   </ul>
</template>

<script>
import $store from "vuex"

export default {
    props:["data"],
    computed:{
        getList(){
            return this.$store.state.selectModule.list
        }
    },
    methods:{
    // 注意：在提交的时候不需要指定哪个模块的mutations
        ...$store.mapMutations({
            changeItemHandle:"changeItem"
        })
    },
    created(){
        // 获取数据
        this.$store.dispatch("getListAction")
    }
}
</script>

<style>

</style>
