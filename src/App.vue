<template>
  <div id="app">
    <heads ref="heads"/>
    <div class="content" @click="closeSugges">
      <left-bar>
        <Bar-Item>
          <p slot="item-title">推荐</p>
        </Bar-Item>
        <BarItemContent link="/findMusic">
          <img slot="item-img" src="./assets/img/music.svg" alt="">
          <span slot="item-span">发现音乐</span>
        </BarItemContent>
        <BarItemContent link="/recommendVideo">
          <img slot="item-img" src="./assets/img/music.svg" alt="">
          <span slot="item-span">推荐视频</span>
        </BarItemContent>
        <Bar-Item>
          <p slot="item-title">我的音乐</p>
        </Bar-Item>
        <BarItemContent link="/cloudDisk">
          <img slot="item-img" src="./assets/img/music.svg" alt="">
          <span slot="item-span">我的音乐云盘</span>
          <!-- <router-link slot="item-span" to="/clouddisk">我的音乐云盘</router-link> -->
        </BarItemContent>
        <Bar-Item>
          <p slot="item-title">创建的歌单</p>
        </Bar-Item>
      </left-bar>
      <router-view id="view"></router-view>
    </div>
    <music-play v-on:listClick='songListValue'></music-play>
    <song-list v-show="songListState"></song-list>
  </div>
</template>

<script>
import heads from './components/headItem/heads.vue';
import LeftBar from './components/tabBar/LeftBar.vue';
import BarItem from './components/tabBar/BarItem.vue';
import BarItemContent from './components/tabBar/BarItemContent.vue';
import MusicPlay from './components/musicPlay/MusicPlay.vue';
import SongList from './components/songList/SongList.vue';
export default {
  name:'App',
  data(){
    return {
      songListState:false,//歌曲列表打开关闭状态
    }
  },
  components:{
    heads,
    LeftBar,
    BarItem,
    BarItemContent,
    MusicPlay,
    SongList
  },
  methods:{
    //接收MusicPlay组件的点击事件数据 来控制歌曲列表组件的打开关闭
    songListValue(songListState){
      this.songListState = songListState
    },
    //关闭搜索建议
    closeSugges(){
      this.$refs.heads.searchSuggestions = false
      this.$refs.heads.isInputSearch = false
    },
  }
}
</script>

<style>
@import url('./assets/css/base.css');
#view{
  width: 80%;
  height: 100%;
}
.content{
  display: flex;
  position: absolute;
  width: 100%;
  height: calc(100% - 140px);
}
</style>
