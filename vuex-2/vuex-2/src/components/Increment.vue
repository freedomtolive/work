<template>
    <div>
        <h2>加法计算其</h2>
        <div>
            <input type="button" value="-" @click = "deHandle">    
            <span>{{num}}</span>
            <input type="button" value="+" @click = "addHandle" >
        </div> 
    </div>
</template>

<script>
    export default {
        computed : {
            num(){
                return this.$store.state.count
            }
        },
        methods : {
            addHandle(){
                // 改变状态，提交一个mutation（addHandle）
                this.$store.commit("addIncrement")
            },
            deHandle(){
                this.$store.commit("deIncrement")
            }
        }
    }
</script>

<style>

</style>

