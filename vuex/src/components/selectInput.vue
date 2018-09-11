<template>
    <div class="clearFix">
      <input 
        @click = "showListHandle"
        :value="title"
      />
      <input type="button" value="GO" >
      <span></span>
    </div>
</template>

<script>
export default {
    // 先拿到值
    props:['isShow', "title"],
    computed : {
        initShow (){
            return this.isShow
        }
    },
    methods : {
        showListHandle (){
            //update为vue定义的，后面跟的是要改变值得key值
            this.$emit("update:isShow", !this.initShow)
        }
    }
}
</script>

<style>

</style>
