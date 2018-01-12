<template>
  <div class="wrapper" @click="update">
    <!-- <image :src="logoUrl" class="logo"></image> -->
    <div class="container" >
      <text class="title-h5">h5</text>

      <div class="cell">
         <image class="thumb" src="http://t.cn/RGE3AJt"></image>  
      </div>
    </div>
    <text class="title">Start {{target}}</text>
    <text class="desc">Now, let's use vue to build your weex app.</text>
  </div>
</template>

<style>
  .wrapper { align-items: center; margin-top: 20px; }
  .title { padding-top:40px; padding-bottom: 40px;font-size: 48px; }
  .logo { width: 360px; height: 156px; }
  .desc { padding-top: 20px; color:#888; font-size: 24px;}
  .cell{margin-top:10px; margin-left:10px; flex-direction: row; }
  .thumb {width: 200px; height: 200px; display: block; }
  .title-h5 {text-align: center ; flex: 1; color: grey; font-size: 50px; display: block;}
  .container {

/*    width: auto;
    height: 200px;*/
  }
</style>

<script>
  export default {
    data: {
      logoUrl: 'http://img1.vued.vanthink.cn/vued08aa73a9ab65dcbd360ec54659ada97c.png',
      target: 'World'
    },
    methods: {
      update: function (e) {
        this.target = 'Weex'
        console.log('target:', this.target)
      }
    }
  }
</script>