import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

let store = new Vuex.Store({
    state:{
        title:"",
        list:[]
    },
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

})

export default store

