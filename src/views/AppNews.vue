<template>
  <div class="fullpage">
    <div class="news-nav">
      <p class="up-line"></p>
      <div class="news-category">
        <ul class="category-nav">
          <div class="navli-1" @click="changeArticle(1)" :class="{'line-down': menuActive === 1}">
            <li>{{$t('res.categoryAll')}}</li>
          </div>
          <div class="navli-2" @click="changeArticle(2)" :class="{'line-down': menuActive === 2}">
            <li>{{$t('res.category4')}}</li>
          </div>
          <div class="navli-2" @click="changeArticle(3)" :class="{'line-down': menuActive === 3}">
            <li>{{$t('res.category2')}}</li>
          </div>
          <div class="navli-4" @click="changeArticle(4)" :class="{'line-down': menuActive === 4}">
            <li>{{$t('res.category3')}}</li>
          </div>
        </ul>
      </div>
      <p></p>
    </div>
    <div class="news-preview">
      <div class="news-content" v-for="item in articles" @click="goArticle(item.title,item.id)">
        <div class="zoomimage">
          <img v-bind:src="item.banner_image" alt="AQUMON">
        </div>
        <div class="news-date">
          {{item.publish_date}}
        </div>
        <div class="news-title">
          {{item.title}}
        </div>
      </div>
    </div>
    <div class="loadMore" @click="loadMore()" v-show="showLoadMore">
      {{$t('res.loadMore')}}
    </div>
  </div>
</template>
<script>
// import blog from "../services/blog.js";
const ARTICLE_LENGTH = 6;
export default {
  data() {
    return {
      category: 0,
      isIOS: window.isIOS,
      categoryMap: {
        0: "All",
        1: "News",
        2: "Insight",
        3: "Series"
      },
      articles: [],
      menuActive: 1,
      allNews: [],
      insight: [],
      series: [],
      news: [],
      newsLen: ARTICLE_LENGTH,
      insightLen: ARTICLE_LENGTH,
      seriesLen: ARTICLE_LENGTH,
      allNewsLen: ARTICLE_LENGTH,
      showLoadMore: false,
      articleUrl: null
    };
  },
  computed: {},
  watch: {},
  methods: {
    changeArticle(val) {
      // 加载文章长度初始化
      this.newsLen = ARTICLE_LENGTH;
      this.insightLen = ARTICLE_LENGTH;
      this.seriesLen = ARTICLE_LENGTH;
      this.allNewsLen = ARTICLE_LENGTH;
      this.showLoadMore = true;
      // 点击时按类型显示文章
      switch (val) {
        case 1:
          this.menuActive = 1;
          this.articles = this.allNews.slice(0, 6);
          break;
        case 2:
          this.menuActive = 2;
          this.articles = this.news.slice(0, 6);
          break;
        case 3:
          this.menuActive = 3;
          this.articles = this.series.slice(0, 6);
          break;
        case 4:
          this.menuActive = 4;
          this.articles = this.insight.slice(0, 6);
          break;
        default:
      }

      this.backToTop();
    },
    loadMore() {
      //  debugger
      // 点击导航栏不同类型，进入不同类型的加载更多
      // 每次点击加载更多，加载长度加6
      switch (this.menuActive) {
        case 1:
          this.allNewsLen = this.allNewsLen + ARTICLE_LENGTH;
          if (this.allNewsLen >= this.allNews.length) {
            this.showLoadMore = false;
          }
          this.articles = this.allNews.slice(0, this.allNewsLen);
          break;
        case 2:
          // debugger
          this.newsLen = this.newsLen + ARTICLE_LENGTH;
          if (this.newsLen >= this.news.length) {
            this.showLoadMore = false;
          }
          this.articles = this.news.slice(0, this.newsLen);
          break;
        case 3:
          this.seriesLen = this.seriesLen + ARTICLE_LENGTH;
          if (this.seriesLen >= this.series.length) {
            this.showLoadMore = false;
          }
          this.articles = this.series.slice(0, this.seriesLen);
          break;
        case 4:
          this.insightLen = this.insightLen + ARTICLE_LENGTH;
          if (this.insightLen >= this.insight.length) {
            this.showLoadMore = false;
          }

          this.articles = this.insight.slice(0, this.insightLen);
          break;
        // default:
      }
    },
    init(reScroll = true) {
      blog
        .getBlogs(
          this.$i18n.locale,
          this.categoryMap[this.category].toLowerCase()
        )
        .then(result => {
          if (reScroll) {
            this.$nextTick(() => {
              setTimeout(() => {
                $("body").trigger("re-scroll");
              }, 100);
            });
          }
          // result = result.slice(0, 5);
          this.articles = result.map(article => {
            article.publish_date = article.publish_date.replace(
              new RegExp("-", "g"),
              "."
            );
            return article;
          });
          // 分4种类型筛选文章
          this.allNews = this.articles;
          this.insight = [];
          this.series = [];
          this.news = [];
          for (var i = 0; i < this.articles.length; i++) {
            var categoryType = this.articles[i].tags;
            for (var tag_num = 0; tag_num < categoryType.length; tag_num++) {
              if (categoryType[tag_num] == "Insight") {
                this.insight.push(this.articles[i]);
              } else if (categoryType[tag_num] == "Series") {
                this.series.push(this.articles[i]);
              } else if (categoryType[tag_num] == "News") {
                this.news.push(this.articles[i]);
              }
            }
          }
          this.articles = this.articles.slice(0, 6);
          this.showLoadMore = true;
        });

      $(".footer-container").hide();
    },

    goArticle(title, bid) {

      this.articleUrl = location.href.replace("appnews", "article/" + bid);
      if (
        window &&
        window.webkit &&
        window.webkit.messageHandlers &&
        window.webkit.messageHandlers.AQUMON &&
        window.webkit.messageHandlers.AQUMON.postMessage
      ) {
        window.webkit.messageHandlers.AQUMON.postMessage({
          type: "showNews",
          data: {
            title: title,
            url: this.articleUrl
          }
        });
      } else {
        this.$router.push({
          path: "/article/" + bid,
          // query: { isIOS: true }
        });
      }
      // if (this.isIOS) {
      //   // this.$router.push({
      //   //   path: "/apparticle/" + bid,
      //   //   query: { isIOS: true }
      //   // });
      //   return;
      // }
      // this.$router.push("/apparticle/" + bid);
    },

    backToTop: function() {
      $("html,body")
        .stop()
        .animate(
          {
            scrollTop: 0
          },
          "slow",
          "swing"
        );
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.init();
      //  window.webkit.messageHandlers.AQUMON.postMessage("javascrip message");
      //      this.language = this.languageMap[this.$i18n.locale];
    });
  }
};
</script>
<style>
/*@import "../sass/variables.scss";*/
/*.en .fullpage {
  .news-nav {
    .category-nav {
      white-space: nowrap;
      overflow-x: scroll;
      overflow-y: hidden;
      padding: 0 8% 0 8%;
      &::-webkit-scrollbar {
        display: none;
      }
      .navli-1 {
        margin-left: 0px;
        margin-right: 11%;
      }
      .navli-2 {
        margin-right: 11%;
      }
      .navli-4 {
        margin-right: 0;
      }
    }
  }
}

.fullpage {
  .news-nav {
    position: fixed;
    width: 100%;
    height: 46px;
    left: 0px;
    top: 0px;
    background-color: #fff;
    p {
      border: 1px solid rgba(231, 231, 231, 0.6);
    } // .up-line {
    //   margin-top: 57px;
    // }
    .category-nav {
      width: 100%;
      font-size: 14px;
      color: #5a5a5a;
      letter-spacing: 0.17px;
      padding: 0 9% 0 9%; // zoom: 1;
      div {
        display: inline-block;
      }

      .navli-1 {
        padding: 14px 0px;
        margin-right: 10%;
        cursor: pointer;
      }
      .navli-2 {
        padding: 14px 0px;
        margin-right: 10%;
        cursor: pointer;
      }
      .navli-4 {
        padding: 14px 0px;
        margin-right: -3%;
        cursor: pointer;
      }
      @media (max-width: 320px) {
        .navli-1 {
          margin-right: 6%;
        }
        .navli-2 {
          margin-right: 6%;
        }
        .navli-4 {
          margin-right: 0%;
        }
      }
      @media (min-width: 400px) {
        .navli-1 {
          // padding: 14px 0px;
          // margin-right: 10%;
          // cursor: pointer;
          margin-left: 4%;
        }
        // .navli-2 {
        //   // padding: 14px 0px;
        //   // margin-right: 10%;
        //   // cursor: pointer;
        // }
        // .navli-4 {
        //   padding: 14px 0px;
        //   margin-right: -3%;
        //   cursor: pointer;
        // }
      }
      .line-down {
        border-bottom: 1px solid #ff6624;
      }
    }
  }
  .news-preview {
    width: 100%;
    height: 100%;
    padding-top: 36px;
    padding-left: 28px;
    padding-right: 28px;
    padding-bottom: 44px;
    .news-content {
      cursor: pointer;
      img {
        margin-top: 40px;
        width: 100%;
        height: auto;
      }

      .news-date {
        font-size: 15px;
        color: #a5a29b;
        letter-spacing: 0.2px;
        margin-top: 19px;
        margin-bottom: 15px;
      }
      .news-title {
        font-size: 15px;
        color: #a5a29b;
        letter-spacing: 0.2px;
        line-height: 18px;
      }
    }
  }
  .loadMore {
    cursor: pointer;
    background: #ff671f;
    border-radius: 100px;
    width: 124px;
    height: 27px;
    left: 15px;
    font-size: 15px;
    color: #ffffff;
    letter-spacing: 1px;
    line-height: 27px;
    text-align: center;
    font-weight: 500;
    padding-left: 15px;
    padding-right: 15px;
    margin-left: 15px;
    margin-bottom: 25px;
    &:hover {
      background-color: #f0905a;
    }
  }
}*/
</style>
