<template>
  <div class="search-song-box" v-loading="loading" element-loading-text="正在加载">
    <div class="search-song-list">
      <div class="search-table-column">
        <span style="left:15%">音乐标题</span>
        <span style="left:45%">歌手</span>
        <span style="left:65%">专辑</span>
        <span style="left:88%">时长</span>
      </div>
      <div class="search-table" v-for="(item,index) in songsDetail.songs" :key="index" @dblclick="tableDbclick(index,item)" @mouseover="currentIndex = index" @mouseleave="currentIndex = -1">
        <span style="position: absolute;left:2%">{{ index >= 9 ? index + 1 : "0" + (index + 1) }}</span>
        <img class="mv-icon" src="@/assets/img/MV.svg" v-show="item.mv != 0"/>
        <img class="vip-icon" src="@/assets/img/VIP.svg" v-show="songsDetail.privileges[index].chargeInfoList[0].chargeType !== 0" />
        <img class="love-icon" style="height: 20px;width:20px" src="@/assets/img/love.svg" title="喜欢" v-show="index === currentIndex">
        <img class="add-icon" style="height: 20px;width:20px" src="@/assets/img/add.svg" title="添加到播放列表"  v-show="index === currentIndex" @click="addMusicList(item)">
        <img class="share-icon" style="height: 20px;width:20px" src="@/assets/img/share.svg" title="分享"  v-show="index === currentIndex">
        <!-- 音乐名字 -->
        <span class="table-music-name" :class="{noSongName: songsDetail.privileges[index].st == -200}"  :title="item.name">{{item.name}}</span>
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
  name:'SongSheetList',
  data() {
    return {
      //歌曲数据
      songsDetail:[],
      currentIndex:-1,
      loading:false,
    }
  },
  props:{
    trackIds:Array
  },
  created(){
    this.getSongSheetSongs()
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
    //获取歌单歌曲
    getSongSheetSongs(){
      this.loading = true
      //歌曲id拼接
      let ids = ''
      for(let i = 0; i < this.trackIds.length; i++){
        //console.log(this.trackIds[i].id.toString())
        if(i + 1 != this.trackIds.length){
          ids += this.trackIds[i].id.toString() + ','
        }else{
          ids += this.trackIds[i].id.toString()
        }
      }
      let params = {
        ids
      }
      this.$http.get('song/detail',{params})
      .then(res =>{
        this.songsDetail = res.data
        this.$emit('sendSongDetail',res.data)
        //console.log(this.songsDetail.privileges[0])
        this.loading = false
      })
      .catch(err => {
        console.log(err)
        this.$message.error('歌单歌曲请求失败,请重试')
      })
    },
    //双击歌曲列表播放音乐
    tableDbclick(index,item){
      this.songsDetail.privileges[index].st == -200 ? this.$message.error('因版权问题，该歌曲已下架') : this.pushId(item.id)
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

/* 滚动条样式 */
.search-song-box::-webkit-scrollbar {
  width: 10px;
}
.search-song-box::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 10px;
}
</style>