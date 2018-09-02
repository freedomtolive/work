<template>
    <div>
        <h2>加法计算其</h2>
        <div>
            <input type="button" value="-" @click = "deHandle">    
            <span>{{num}}</span>
            <input type="button" value="+" @click = "addHandle" >
            <p>{{num2}}</p>
        </div> 
    </div>
</template>

<script>
    export default {
        computed : {
            num(){
                return this.$store.state.count
            },
            // num2去从getter中拿值，拿到逻辑处理后的值
            num2(){
                return this.$store.getters.filterCount
            }
        },
        methods : {
            addHandle(){
                // 改变状态，提交一个mutation（addHandle）
                // 如果异步的时候就不需要在这里触发mutation，而是要触发action
                // this.$store.commit("addIncrement", {num:5})    
                // 触发mutation用commit //触发action用dispatch
                this.$store.dispatch("addAction") 
            },
            deHandle(){
                // this.$store.commit("deIncrement", {num:5})
                // 可以通过提交对象的方式将mutation写在一起
                this.$store.commit({
                    type:"deIncrement",
                    num:10
                })
            }
        }
    }
</script>

<style>

</style>

