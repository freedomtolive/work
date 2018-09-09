<template>
    <div>
        <h2>加法计算其</h2>
        <div>
            <input type="button" value="-" @click = "deHandle({num:11})">    
            <span><!-- {{num}} -->{{count}}</span> 
            <input type="button" value="+" @click = "addHandle" >
            <p>{{num2}}</p>
        </div> 
    </div>
</template>

<script>
    // vuex辅助函数
    // mapState 状态映射
    // mapGetters 动态属性映射
    // mapActions 调用动态属性
    // mapMutations 提交mutations
    import {mapState, mapGetters, mapMutations, mapActions} from "vuex"

    export default {
        // 用mapState进行状态管理
        // computed : mapState({
            // num : state => state.count,
            // num : "count"
             // 组件中单独处理通用变量
            // num(state){
            //     return state.count + 100
            // }
        // }),
        // 如果组件渲染的值和vuex中定义的值相同，可以用下数写法
        // computed : mapState(["count"]),
        computed:{
            abc(){
                return 123
            },
            ...mapGetters({
                num2 : "filterCount"
            }),
            // ...为扩展运算符，将mapState的对象扩展到compoted中
            ...mapState(["count"])
        },
        methods : {
            // 提交action
            ...mapActions({
                addHandle : "addAction"
            }),
            ...mapMutations({
                // 注意：传参的时候要在函数中传
                deHandle : "deIncrement"
            })
        }
    }
    
    // 传统写法
    // export default {
    //     computed : {
    //         num(){
    //             return this.$store.state.count
    //         },
    //         // num2去从getter中拿值，拿到逻辑处理后的值
    //         num2(){
    //             return this.$store.getters.filterCount
    //         }
    //     },
    //     methods : {
    //         addHandle(){
    //             // 改变状态，提交一个mutation（addHandle）
    //             // 如果异步的时候就不需要在这里触发mutation，而是要触发action
    //             // this.$store.commit("addIncrement", {num:5})    
    //             // 触发mutation用commit //触发action用dispatch
    //             this.$store.dispatch("addAction") 
    //         },
    //         deHandle(){
    //             // this.$store.commit("deIncrement", {num:5})
    //             // 可以通过提交对象的方式将mutation写在一起
    //             this.$store.commit({
    //                 type:"deIncrement",
    //                 num:10
    //             })
    //         }
    //     }
    // }
</script>

<style>

</style>

