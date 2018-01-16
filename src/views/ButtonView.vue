<template>
  <div style="margin:20px;">
    <button type="default" :value="value" @click="click()" ></button>
    <button type="nomal" :value="value" style="margin-top:20px;"></button>
    <button type="danger" :value="value" style="margin-top:20px;"></button>

    <div style="flex-direction: row;flex-wrap: nowrap;justify-content: space-between;margin-top:20px;">
      <button type="default" :value="value" style="flex:1;margin:10px;"></button>
      <button type="nomal" :value="value" style="flex:1;margin:10px;"></button>
      <button type="danger" :value="value" style="flex:1;margin:10px;"></button>
    </div>

    <button type="defaultborder" :value="value" style="margin-top:20px;"></button>
    <button type="nomalborder" :value="value" style="margin-top:20px;"></button>
    <button type="dangerborder" :value="value" style="margin-top:20px;"></button>

    <div style="flex-direction: row;flex-wrap: nowrap;justify-content: space-between;margin-top:20px;">
      <button type="defaultborder" :value="value" style="flex:1;margin:10px;"></button>
      <button type="nomalborder" :value="value" style="flex:1;margin:10px;"></button>
      <button type="dangerborder" :value="value" style="flex:1;margin:10px;"></button>
    </div>
  </div>
</template>
<style scoped>

</style>
<script>
  import button from '../components/button.vue'
  export default {
      components:{button},
      data(){
        return{
          value:'测试',
        }
      },
      methods:{
        click(){
          console.debug("clicked")
        }
      },
    created () {
      this.$router.push('/button');
    }
  }
</script>
