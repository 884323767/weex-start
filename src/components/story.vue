<template>
    <div class="cell-item">
        <div class="zoomimage">
            <image class="imageItem" v-bind:src="story.banner_image" alt="AQUMON"></image>
        </div>
        <text class="news-date">
            {{story.publish_date}}
        </text>
        <text class="news-title">
            {{story.title}}
        </text>
        <!--     <external-link :url="story.url" class="story-link">
      <text class="story-title">{{story.title}}</text>
      <text class="small-text" v-if="story.url">({{ story.url | host }})</text>
    </external-link> -->
        <!--     <div class="text-group">
      <text class="small-text text-cell">by </text>
      <div class="text-cell" @click="jump(`/user/${story.by}`)">
        <text class="small-text link-text">{{story.by}}</text>
      </div>
      <text class="small-text text-cell"> | {{ story.time | timeAgo }} ago</text>
      <text class="small-text text-cell" v-if="!noComment"> | </text>
      <div class="text-cell" @click="jump(`/item/${story.id}`)" v-if="!noComment">
        <text class="small-text link-text">{{ story.descendants }} comments</text>
      </div>
    </div> -->
    </div>
</template>
<style scoped>
.cell-item {
    position: relative;
    padding-top: 20px;
    padding-bottom: 25px;
    padding-left: 40px;
    padding-right: 40px;
    width: 100%;
}



/*.story-score {
    position: absolute;
    width: 100px;
    text-align: center;
    left: 0;
    top: 20px;
    font-size: 32px;
    font-weight: bold;
    color: #FF6600;
  }
  .story-link {
    margin-bottom: 25px;
    width: 610px;
  }
  .story-title {
    font-size: 33px;
    color: #404040;
  }
  .small-text {
    color: #BBB;
    font-size: 22px;
    margin-bottom: 0;
    font-family: Verdana, Geneva, sans-serif;
  }
  .link-text {
    /*color: red;*/


/*   text-decoration: underline;
  }
  .text-group {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  .text-cell {
    flex-grow: 0;
  }*/

.news-content {
    cursor: pointer;
}

.imageItem {
    margin-top: 40px;
    width: 100%;
    height: 400px;
    /*height: 250px;*/
    background-size: contain;
}

.news-date {
    font-size: 22px;
    color: #a5a29b;
    letter-spacing: 0.2px;
    padding-top: 19px;
    padding-bottom: 15px;
    white-space: pre-line;
}

.news-title {
    width: 100%;
    font-size: 22px;
    color: #a5a29b;
    letter-spacing: 0.2px;
    line-height: 18px;
    padding-bottom: 5px;
    white-space: pre-line;
}
</style>
<script>
import ExternalLink from './external-link.vue'

export default {
    components: { ExternalLink },
    props: {
        story: {
            type: Object,
            required: true
        },
        'no-comment': {
            type: [String, Boolean],
            default: false
        }
    }
}
</script>