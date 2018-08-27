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
        addIncrement(state){
            state.count++
        },
        deIncrement(state){
            state.count--
        }
    }
})


export default store
