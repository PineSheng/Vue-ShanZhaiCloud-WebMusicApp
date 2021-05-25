<template>
  <div class="search-page">
    <span style="font-size: 10px;color: rgb(173, 173, 173);">{{songCountText}}</span>
    <!-- 导航栏菜单 -->
    <div class="navigation-bar">
      <el-menu 
      :default-active="this.$route.path"
      mode="horizontal" 
      @select="handleSelect"
      text-color="#909399"
      >
        <el-menu-item index="/searchPage/searchBySong">单曲</el-menu-item>
        <el-menu-item index="/searchPage/searchBySinger">歌手</el-menu-item>
        <el-menu-item index="/searchPage/searchByAlbum">专辑</el-menu-item>
        <el-menu-item index="/searchPage/searchByVideo">视频</el-menu-item>
        <el-menu-item index="/searchPage/searchBySongList">歌单</el-menu-item>
    </el-menu>
    </div>
    <router-view @sendCount="receiveSongCount"></router-view>
  </div>
</template>

<script>
export default {
  name:'SearchPage',
  data() {
    return {
      songCountText:''
    }
  },
  methods:{
    handleSelect(key,keyPath){
      //console.log(key,keyPath,this.$route)
      let searchWord = this.$route.query.searchWord
      if(key != this.$route.path){
        this.$router.push({
          path: key,
          query:{
            searchWord
          }
        })
      }
    },
    receiveSongCount(songCount){
      this.songCountText = songCount
    }
  }
}
</script>

<style scoped>
.search-page{
  width: 100%;
  padding: 20px 0px 20px 20px;
}

.navigation-bar{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  width: 100%;
}

</style>