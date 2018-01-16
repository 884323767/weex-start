<template>
  <div class="stories-view" append="tree">
    <app-header :menuActive="menuActive"></app-header>
    <list class="story-list" @loadmore="loadMoreStories" loadmoreoffset="50">
      <cell class="story-cell" v-for="story in stories" :key="story.id" append="tree">
        <story :story="story" @click="goArticle(story.id)"></story>
      </cell>
    </list>
    <div class="loading" v-if="loading">
      <text class="loading-text">loading ...</text>
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
      type: {
        type: String,
        required: true,
        default: 'top'
      }
    },
    data () {
      return {
        loading: true,
        stories: [],
        menuActive: 1,
        articles: [],
        allNews: [],
        insight: [],
        series: [],
        news: [],
      }
    },

    computed: {
      // stories () {
      //   // return this.$store.getters.activeItems
      // }
    },

    methods: {
      goArticle(id) {
        this.$router.push('article/'+id);
      },
      fetchListData () {
        this.loading = true
        const baseURL = 'https://cms.aqumon.com/api/blog_all?language=zh_cn'

        stream.fetch({
          method: 'GET',
          url: `${baseURL}`,
          type: 'json'
        }, (response) => {
          if (response.status == 200) {
            console.log(response.data);
            let result = response.data;
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
            switch (this.type) {
              case 'top':
                this.menuActive = 1;
                this.articles = this.allNews.slice(0, 6);
                break;
              case 'new':
                this.menuActive = 2;
                this.articles = this.news.slice(0, 6);
                break;
              case 'show':
                this.menuActive = 3;
                this.articles = this.series.slice(0, 6);
                break;
              case 'ask':
                this.menuActive = 4;
                this.articles = this.insight.slice(0, 6);
                break;
              default:
            }
            this.stories = this.articles;
            this.loading = false;
          }
        });
      },
      loadMoreStories () {
        this.loading = true
        this.$store.dispatch('LOAD_MORE_ITEMS').then(() => {
          this.loading = false
        })
      }
    },

    created () {
      this.fetchListData()
    }
  }
</script>

<style scoped>
  .stories-view {
    height: 100%;
  }
  .story-cell {
    margin-bottom: 3px;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: #DDDDDD;
    background-color: #FFFFFF;
  }
  .story-list {
    width: 100%;
    height: 100%;
    padding-top: 36px;
    padding-left: 28px;
    padding-right: 28px;
    padding-bottom: 44px;
  }
  .loading {
    width: 750px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loading-text {
    margin: auto;
    text-align: center;
    font-size: 40px;
    color: #BBB;
  }
</style>
