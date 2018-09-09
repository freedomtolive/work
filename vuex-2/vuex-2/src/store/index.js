// vuex

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
    // 公用数据
    state:{
        count:100
    },
    // 对vuex中的数据做逻辑处理,类似组件中的computed
    getters : {
        filterCount(state){
            return state.count < 120 ? state.count : 120
        }
    },
    mutations : {
        // 当中必须是同步操作
        addIncrement(state, payload){
            state.count += payload.num
        },
        deIncrement(state, payload){
            state.count -= payload.num
        }
    },
    actions : {
        // // 在当中提交mutation,可包含异步操作
        // addAction(context){ 
        //     // context参数不是实例，而是一个对象，但这个对象包含和实例一样的方法
        //     console.log(context)
        //     setTimeout(() => {
        //         // 通过异步方式调用mutation,同样是提交一个commit
        //         context.commit("addIncrement", {num:5})
        //         context.dispatch("textAction", {text:"测试"})
        //     }, 1000)
        // },
        // 这里可以用es6中的结构赋值
        addAction({commit, dispatch}){  
            // 此处的commit就为上面的context.commit，dispatch就为context.dispatch
            console.log(commit, dispatch)
            setTimeout(() => {
                // 通过异步方式调用mutation,同样是提交一个commit
                commit("addIncrement", {num:5})
                dispatch("textAction", {text:"测试"})
            }, 1000)
        },
        textAction(context, obj){
            console.log("我被触发了")
            console.log(obj)
        }
    }
})


export default store
