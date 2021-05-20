<template>
  <div class="search-song-box">
    <div class="search-song-list">
      <div class="search-table-column">
        <span style="left:15%">音乐标题</span>
        <span style="left:45%">歌手</span>
        <span style="left:65%">专辑</span>
        <span style="left:88%">时长</span>
      </div>
      <div class="search-table" v-for="(item,index) in albumData.songs" :key="index" @dblclick="tableDbclick(item)" @mouseover="currentIndex = index" @mouseleave="currentIndex = -1">
        <span style="position: absolute;left:2%">{{ index >= 9 ? index + 1 : "0" + (index + 1) }}</span>
        <img class="mv-icon" src="@/assets/img/MV.svg" v-show="item.mv != 0"/>
        <img class="vip-icon" src="@/assets/img/VIP.svg" v-show="item.privilege.chargeInfoList[0].chargeType !== 0" />
        <img class="love-icon" style="height: 20px;width:20px" src="@/assets/img/love.svg" title="喜欢" v-show="index === currentIndex">
        <img class="add-icon" style="height: 20px;width:20px" src="@/assets/img/add.svg" title="添加到播放列表"  v-show="index === currentIndex" @click="addMusicList(item)">
        <img class="share-icon" style="height: 20px;width:20px" src="@/assets/img/share.svg" title="分享"  v-show="index === currentIndex">
        <!-- 音乐名字 -->
        <span class="table-music-name" :class="{noSongName: item.privilege.st == -200}"  :title="item.name">{{item.name}}</span>
        <!-- 歌手 -->
        <span class="table-singer">{{item.ar[0].name}}</span>
        <!-- 专辑 -->
        <span class="table-album">{{item.al.name}}</span>
        <!-- 时长 -->
        <span class="table-duration">{{$seconds(item.dt / 1000)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex"
export default {
  name:'AlbumSongList',
  data() {
    return {
      currentIndex:-1,
      loading:false,
    }
  },
  props:{
    albumData:Object
  },
  methods: {
    ...mapMutations([
      //加入要播放的音乐ID
      'pushId',
      //播放音乐
      'startPlayMusic',
      //添加音乐到播放列表
      'addMusicList',
    ]),
    //双击歌曲列表播放音乐
    tableDbclick(item){
      item.privilege.st == -200 ? this.$message.error('因版权问题，该歌曲已下架') : this.pushId(item.id)
    }
  },
}
</script>

<style scoped>
.search-song-list{
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
}
.search-table-column{
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  position: relative;
}
.search-table-column span{
  position: absolute;
  color: rgb(136, 136, 136);
  font-size: 15px;
}
.search-table{
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  color: rgb(136, 136, 136);
}
.search-table:hover {
  background: #f2f2f2;
}
.search-table img{
  width: 15px;
  height: 15px;
}
.noSongName {
  color: #bababa !important;
}
.mv-icon{
  position: absolute;
  left: 11%;
}
.vip-icon{
  position: absolute;
  left: 13%;
}
.love-icon{
  position: absolute;
  left: 36%;
  cursor: pointer;
}
.add-icon{
  position: absolute;
  left: 39%;
  cursor: pointer;
}
.share-icon{
  position: absolute;
  left: 42%;
  cursor: pointer;   
}
.table-music-name{
  position: absolute;
  left: 15%;
  width: 20%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  color: #000000;
  cursor: pointer;
}
.table-singer{
  position: absolute;
  left: 45%;
  color: #507daf;
  width: 20%;
  cursor: pointer;
}
.table-album{
  position: absolute;
  left: 65%;
  width: 20%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  cursor: pointer;
}
.table-duration{
  position: absolute;
  left: 88%;
  width: 10%;
}

</style>