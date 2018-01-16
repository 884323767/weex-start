<template>
  <div class="app-article" v-if="article!=null">
    <text class="back" @click="goBack">返回</text>
    <text class="title">
      {{article.title}}
    </text>
    <text class="authors">
      {{article.authors}}
      <text class="date">
        {{article.publish_date}}
      </text>
    </text>

    <div class="content">
      <image v-bind:src="article.banner_image" class="img-responsive" alt="AQUMON"> </image>
      <div v-html="article.content" class=""> </div>
    </div>
  </div>
</template>
<script>
// import blog from "../services/blog.js";
const stream = weex.requireModule('stream');

export default {
  components: {},
  data() {
    return {
      active: 1,
      test: true,
      language: "en",
      // collection: null,
      languageMap: {
        zh_cn: "简",
        zh_tw: "繁",
        en: "EN"
      },
      article: null
      // isIOS: window.isIOS,
      // config: {
      //   url: "https://www.aqumon.com/article/6"
      // }
    };
  },
  created() {
    debugger;
    //  这里报错, 也没用到，暂时注释掉
    // addthis api script
    // let addthis = document.createElement('script');
    // addthis.setAttribute('type', 'text/javascript');
    // addthis.setAttribute('src', 'https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-5a180a4496752c31');
    // document.head.appendChild(addthis)
    //
    this.init();
  },
  props: ["bid"], // blog id

  computed: {
    // get the link you want to share
    // changed this to compute, the url in the DOM can be changed, however, the sharing url isn't.
    // Current solution is refresh current page.
    // shareLink() {
    //   if (
    //     /en/gi.test(location.href) ||
    //     /zh_cn/gi.test(location.href) ||
    //     /zh_tw/gi.test(location.href)
    //   ) {
    //     return location.href.replace(
    //       /localhost:\d{4}/i,
    //       "test-home.aqumon.com"
    //     );
    //   }
    //   let ret = location.href.replace(
    //     "test-home.aqumon.com",
    //     "test-home.aqumon.com/" + this.language
    //   );
    //   ret = ret.replace(
    //     /localhost:\d{4}/i,
    //     "test-home.aqumon.com/" + this.language
    //   );
    //   return ret;
    // }
  },
  watch: {
    article() {
      // setTimeout(() => {
      //   $("body").trigger("re-scroll");
      // }, 100);
    }
  },
  methods: {
    goBack() {
      this.$route.back();
    },
    init() {
      const self = this;
      console.log(this.$route.fullPath);
      let baseURL = 'https://cms.aqumon.com/api/blog/:pid?language=zh_cn'
      baseURL = baseURL.replace(':pid', this.$route.params.id);
      stream.fetch({
        method: 'GET',
        url: `${baseURL}`,
        type: 'json'
      }, (response) => {
        debugger;
        if (response.status == 200) {
          console.log(response.data);
          let result = response.data;
          this.article = result;
        }
        // result = result.slice(0, 5);
        // blog
        //   .getArticle(this.bid, this.$i18n.locale)
        //   .then(result => {
        //     this.article = result;
        //     // this.$nextTick(()=>{
        //     //   $('body').trigger('re-scroll');
        //     // })
        //     this.addMeta();
        //     console.log(typeof this.article, this.article);
        //   })
        //   .catch(err => {
        //     // 没有新闻 就 跳回上一页
        //     this.$router.back();
        //   });
      })

    },
    mounted() {
      debugger;
      this.$nextTick(() => {
        // this.language = this.languageMap[this.$i18n.locale];
        this.init();
      });
    }
  }
}

</script>
<style scoped>
.app-article {

}
.title {
  font-size: 24px;
  color: #000000;
  letter-spacing: 0;
  text-align: left;
  margin: 61px 27px 0px 27px;
  white-space: normal;
}
.authors {
  display: inline-block;
  font-size: 12px;
  color: #bbbbbb;
  letter-spacing: 0;
  line-height: 19px;
  text-align: left;
  margin-left: 25px;
  white-space: normal;
  display: flex;
  align-items: center;

}
.date {
  margin-top: -2px;
  display: inline-block;
  font-size: 14px;
  color: #bbbbbb;
  letter-spacing: 0;
  line-height: 19px;
  text-align: left;
  margin-top: 17px;
  display: flex;
  align-items: center;
  position: relative;
  top: -9px;
}
.content {
  font-size: 15px;
  color: #000000;
  letter-spacing: 0;
  line-height: 25px;
  text-align: left;
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 50px;
}
.img-responsive {
  padding-bottom: 20px;
  display: block;
  width: auto;
  height: 200px;
  margin: 17px 0px;
}

</style>
