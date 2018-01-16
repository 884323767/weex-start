<template>
  <div @androidback="back">
    <div>test-test111</div>
    <router-view style="flex:1"></router-view>
  </div>
</template>

<script>
  export default {
    methods: {
      back: function () {
        this.$router.back()
      }
    }
  }
</script>
