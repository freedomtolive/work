import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// vuex模块划分(子模块可以继续划分子模块)
let selectModule = {
    state:{
        title:"我是组件中的title",
        list:[]
    },
    // 注意：在提交的时候不需要指定哪个模块的mutations
    mutations:{
        changeItem(state, title){
            state.title = title
        },
        changeList(state, payload){
            state.list = payload
        }
    },
    actions:{
        getListAction({commit}){
            axios.get('https://easy-mock.com/mock/5b97d7aba7e9571f105d3f89/example/getList')
            .then((data) => {
                if (data.data.code === 0){
                    commit("changeList", data.data.list)
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

}


let store = new Vuex.Store({
    state:{
        title:"",
        list:[]
    },
    mutations:{
        // changeItem(state, title){
        //     state.title = title
        // },
        // changeList(state, payload){
        //     state.list = payload
        // }
    },
    actions:{
        // getListAction({commit}){
        //     axios.get('https://easy-mock.com/mock/5b97d7aba7e9571f105d3f89/example/getList')
        //     .then((data) => {
        //         if (data.data.code === 0){
        //             commit("changeList", data.data.list)
        //         }
        //     })
        //     .catch((error) => {
        //         console.log(error)
        //     })
        // }
    },
    // 定义selectModule模块
    // 取值：
        // 总的state数据：this.$store.state.数据
        // 模块内的数据：this.$store.state.selectModule.数据
    modules:{
        selectModule
    }
})

export default store

