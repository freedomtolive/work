import Vue from 'vue'
import Router from 'vue-router'
import axios from '@/components/axios'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'axios',
      component: axios
    }
  ]
})
