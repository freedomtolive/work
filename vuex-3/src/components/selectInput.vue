<template>
    <div class="clearFix">
      <input 
        @click = "changeShow"
        :value = "title"
      />
      <input type="button" value="GO" >
      <span></span>
    </div>
</template>

<script>
import {mapState} from "vuex"
export default {
    // 先拿到值
    props : ["isShow"],
    computed:{
        initShow(){
            return this.isShow
        },
        ...mapState({
            title : "title"
        })
    },
    methods:{
        changeShow (){
            this.$emit("update:isShow", !this.initShow)
        }
    }
}
</script>

<style>

</style>
