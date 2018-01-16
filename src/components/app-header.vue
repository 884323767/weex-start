<template>
  <div class="header">
    <!--     <div class="logo" @click="jump('/')">
      <image class="image" src="https://news.ycombinator.com/favicon.ico"></image>
    </div> -->
    <div class="nav">
      <div class="link" :class="[menuActive === 1?'link-border':'']" @click="jump('/top')">
        <text class="title">所有分类</text>
      </div>
      <div class="link" :class="[menuActive === 2?'link-border':'']" @click="jump('/new')">
        <text class="title">新闻</text>
      </div>
      <div class="link" :class="[ menuActive === 3?'link-border':'']" @click="jump('/show')">
        <text class="title">投资见解</text>
      </div>
      <div class="link" :class="[menuActive === 4?'link-border':'']" @click="jump('/ask')">
        <text class="title">专业洞察</text>
      </div>
      <!--       <div class="link" @click="jump('/job')">
        <text class="title">Job</text>
      </div> -->
    </div>
  </div>
</template>
<script>
import AppHeader from '../components/app-header.vue'
import Story from '../components/story.vue'
const stream = weex.requireModule('stream')

export default {
  components: { AppHeader, Story },
  props: {
    menuActive: {
      type: Number,
      required: true,
      default: 1
    }
  },
  data() {
    return {

    }
  },

  computed: {

  },

  created() {}
}

</script>
<style scoped>
.header {
  position: relative;
  height: 120px;
  margin-bottom: 3px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: #DDDDDD;
  background-color: #fff;
}


/*.logo {
  position: relative;
  width: 50px;
  height: 50px;
  top: 35px;
  left: 35px;
  border-width: 3px;
  border-style: solid;
  border-color: #FFFFFF;
}
*/

.image {
  width: 44px;
  height: 44px;
}

.nav {
  display: flex;
  /*position: absolute;*/
  justify-content: center;
  /*  left: 120px;
*/
  top: 35px;
  flex-direction: row;
  flex-wrap: nowrap;
  /*justify-content: flex-start;*/
  align-items: center;
}

.link {
  cursor: pointer;
  padding-left: 15px;
  padding-right: 15px;
}

.link-border {
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #ff6624;
}

.title {
  font-family: Verdana, Geneva, sans-serif;
  font-size: 32px;
  line-height: 44px;
  color: #5a5a5a;
}

</style>
