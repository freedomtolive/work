// vuex

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
    // 公用数据
    state:{
        count:100
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
        // 在当中提交mutation,可包含异步操作
        addAction(context){
            // context参数不是实例，而是一个对象，但这个对象包含和实例一样的方法
            setTimeout(() => {
                // 通过异步方式调用mutation
                context.commit("addIncrement", {num:5})
            }, 1000)
        }
    }
})


export default store
