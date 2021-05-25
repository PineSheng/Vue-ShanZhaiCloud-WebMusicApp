<template>
  <div class="search-box">
    <div style="padding-bottom:10px">
      <span style="color: rgb(159, 159, 159);">搜"{{searchContent}}"相关的结果 ></span>
    </div>
    <!-- 搜索的单曲建议 -->
    <div class="content-box">
      <div class="content-title">
        <img src="@/assets/img/note.svg" alt="">
        <span>单曲</span>
      </div>
      <div class="content-name" v-for="(item,index) in searchContentData.songs" :key="index" @click="searchSongClick(item)">
        <span>{{item.name}}-{{item.artists[0].name}}</span>
      </div>
    </div>
    <!-- 搜索的歌手建议 -->
    <div class="content-box">
      <div class="content-title">
        <img src="@/assets/img/user2.svg" style="width: 15px;height:15px" alt="">
        <span style="margin-left:5px">歌手</span>
      </div>
      <div class="content-name" v-for="(item,index) in searchContentData.artists" :key="index" @click="searchSingerClick(item)">
        <span>{{item.name}}</span>
      </div>
    </div>
    <!-- 搜索的专辑建议 -->
    <div class="content-box">
      <div class="content-title">
        <img src="@/assets/img/album.svg" style="width: 15px;height:15px" alt="">
        <span style="margin-left:5px">专辑</span>
      </div>
      <div class="content-name" v-for="(item,index) in searchContentData.albums" :key="index" @click="searchAlbumClick(item)">
        <span>{{item.name}}</span>
      </div>
    </div>
    <!-- 搜索的歌单建议 -->
    <div class="content-box">
      <div class="content-title">
        <img src="@/assets/img/list.svg" style="width: 15px;height:15px" alt="">
        <span style="margin-left:5px">歌单</span>
      </div>
      <div class="content-name" v-for="(item,index) in searchContentData.playlists" :key="index" @click="searchSongSheetClick(item)">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex"
export default {
  name:'SearchInputSuggertion',
  data() {
    return {
    }
  },
  props:{
    //heads组件传的输入框内容
    searchContent:String,
    //heads组件传的搜索建议数据
    searchContentData:{
      default: () => {
        return {
          song:{},
          artists:{},
          albums:{},
          playlists:{}
        }
      }
    },
  },
  methods:{
    ...mapMutations([
      //加入要播放的音乐ID
      'pushId',
      //播放音乐
      'startPlayMusic',
      //添加音乐到播放列表
      'addMusicList',
      //添加音乐到历史记录列表
      'addHistoryList',
      //切换播放模式
      'modeSwitching'
    ]),
    //搜索建议单曲点击事件
    searchSongClick(item){
      //点击后直接跳转播放
      this.pushId(item.id)
      this.startPlayMusic()
      this.$emit('closeInputSearch',false)
    },
    //搜索建议歌手点击事件
    searchSingerClick(item){
      console.log(item)
      this.$router.push({
        path: '/ArtistPage',
        query:{
          artistId:item.id
        }
      })
      this.$emit('closeInputSearch',false)
    },
    //搜索建议专辑点击事件
    searchAlbumClick(item){
      this.$router.push({
        path: '/AlbumPage',
        query:{
          albumId:item.id
        }
      })
      this.$emit('closeInputSearch',false)
    },
    //搜索建议歌单点击事件
    searchSongSheetClick(item){
      if(this.$route.query.id != item.id){
        this.$router.push({
          path: '/SongSheetDetails',
          query:{
            id:item.id
          }
        })
      this.$emit('closeInputSearch',false)
      }
    }
  }
}
</script>

<style scoped>
.search-box{
  position: absolute;
  margin-top: 5px;
  height: 420px;
  width: 380px;
  box-shadow: 0 0 1px 1px #f0f0f0;
  background-color: #fff;
  border-radius: 2%;
  z-index: 100;
  padding: 10px 15px;
  overflow-x: hidden;
  overflow-y: auto;
}
.content-box{
  cursor: pointer; 
}
.content-box img{
  width: 22px;
  height: 22px;
}
.content-title{
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  background-color: #f2f2f2;
}
.content-name{
  height: 30px;
  display: flex;
  align-items: center;
}
.content-name span{
  margin-left: 20px;
}
.content-name:hover {
  background: #f2f2f2;
}


/* 滚动条样式 */
.search-box::-webkit-scrollbar {
  width: 10px;
}
.search-box::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 10px;
}

</style>