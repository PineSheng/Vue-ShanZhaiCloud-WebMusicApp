<template>
  <div id="song-list-box">
    <div class="item-tab-box">
      <div class="item-tab">
        <div class="play-list" @click="playListClick" :style="playListColor">
          <span>播放列表</span>
        </div>
        <div class="history-list" @click="histroyListClick" :style="historyColor">
          <span>历史记录</span>
        </div>
      </div>
    </div>
    <div class="information-box">
      <p v-show="playListActive" class="song-number">总{{palySongList.length}}首</p>
      <p v-show="historyListActive" class="song-number">总{{songHistoryList.length}}首</p>
      <img src="../../assets/img/trash.svg" alt="">
      <span @click="delectAll">清空</span>
    </div>
    <div class="list-content">
      <div class="list-empty" v-show="palySongList.length == 0 && playListActive">
        <span v-show="playListActive">你还没有添加任何歌曲</span>
      </div>
      <div class="list-empty" v-show="songHistoryList.length == 0 && historyListActive">
        <span v-show="historyListActive">你还没有播放任何歌曲</span>
      </div>
      <!-- 播放列表 -->
      <div v-show="playListActive">
        <div class="list-have" v-for="(item,index) in palySongList" :key="index" @dblclick="listDblclick(index)">
          <div class="list-icon">
            <AudioAnimation style="width:15px" v-if="palySongList.findIndex(item => item.id === playSongId) == index" />
            <div 
              class="list-music-name"
              :title="item.name"
              style="padding-left:5px" 
              :class="{listIconName: palySongList.findIndex(item => item.id === playSongId) == index}">
              {{item.name}}
            </div>
          </div>
          <div 
             class="song-author" 
             :title="item.ar[0].name"
            :class="{listIconName: palySongList.findIndex(item => item.id === playSongId) == index}">
            {{item.ar[0].name}}
          </div>
          <div class="song-time">
            <img src="../../assets/img/close.svg" alt="" @click="songListDelect(index)">
            {{$seconds(item.dt / 1000)}}
          </div>
        </div>
      </div>
      <!-- 历史记录列表 -->
      <div v-show="historyListActive">
        <div class="list-have" v-for="(item,index) in songHistoryList" :key="index" @dblclick="listDblclick(index)">
          <div class="list-icon">
            <AudioAnimation style="width:15px" v-if="songHistoryList.findIndex(item => item.id === playSongId) == index" />
            <div 
              class="list-music-name"
              style="padding-left:5px" 
              :class="{listIconName: songHistoryList.findIndex(item => item.id === playSongId) == index}">
              {{item.name}}
            </div>
          </div>
          <div 
            class="song-author" 
            :class="{listIconName: songHistoryList.findIndex(item => item.id === playSongId) == index}">
            <span>{{item.ar[0].name}}</span>
          </div>
          <div class="song-time">
            <img src="../../assets/img/close.svg" alt="" @click="historyListDelete(index)">
            {{$seconds(item.dt / 1000)}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex"
import AudioAnimation from '../audioAnimation/AudioAnimation.vue'
export default {
  name:'SongList',
  data() {
    return {
      playListActive:true,
      historyListActive:false,
      playListColor:'background:#bbb;color:#fff',
      historyColor:'background:#fff',
      songNumber:0,
    }
  },
  computed:{
    ...mapGetters([
      //播放状态
      "playState",
      //要播放的音乐id
      "playSongId",
      //播放列表
      'palySongList',
      //历史记录列表
      'songHistoryList',
       //播放模式
       'playMode'
    ]),
  },
  components:{
    AudioAnimation
  },
  methods:{
    ...mapMutations([
      //加入要播放的歌曲id
      'pushId',
      //播放列表删除音乐
      'delectMusicList'
    ]),
    //播放列表切换
    playListClick(){
      this.playListActive = true;
      this.historyListActive = false;
      this.playListColor = 'background:#bbb;color:#fff';
      this.historyColor = 'background:#fff';
    },
    //历史记录切换
    histroyListClick(){
      this.playListActive = false;
      this.historyListActive = true;
      this.historyColor = 'background:#bbb;color:#fff';
      this.playListColor = 'background:#fff';
    },
    //历史记录删除数据
    historyListDelete(index){
      this.songHistoryList.splice(index,1)
    },
    //列表双击事件
    listDblclick(index){
      this.pushId(this.palySongList[index].id)
    },
    //播放列表删除数据
    songListDelect(index){
      //正在播放歌曲的下标
      let newSong = this.palySongList.findIndex(item => item.id === this.playSongId)
      //顺序播放模式下处理
      if(index + 1 == this.palySongList.length && this.playMode == 'sequence' && newSong == index){
        //当列表只剩最后一首且正在播放
        this.$message.error('已经是列表最后一首')
        this.delectMusicList(index)
        this.pushId(' ')
      }else if(index == 0 && this.palySongList.length == 1 ){
        //列表数量大于一首
        this.$message.error('已经是列表最后一首')
        this.delectMusicList(index)
        this.pushId(' ')
      }else if(newSong == index && index + 1 != this.palySongList.length ){
        this.pushId(this.palySongList[index + 1].id)
        this.delectMusicList(index)
      }
      //列表循环模式处理
      else if(this.playMode == 'listLoop' && index + 1 == this.palySongList.length){
        this.pushId(this.palySongList[0].id)
        this.delectMusicList(index)
      }else{
        this.delectMusicList(index)
      }
      //this.delectMusicList(index)
    },
    //清空列表
    delectAll(){
      //this.playListActive ? this.songList = [] : this.songHistoryList = []
      console.log(this.palySongList)
    },
  }
}
</script>

<style scoped>
#song-list-box{
  position: fixed;
  width: 30%;
  height: 80%;
  z-index: 100;
  background-color: #fff;
  border-left: 1px solid #ebebed;
  border-top: 1px solid #ebebed;
  right: 0;
  bottom: 80px;
  overflow:auto
  
}
/* 滚动条样式 */
#song-list-box::-webkit-scrollbar {
  width: 10px;
}
#song-list-box::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 10px;
}
.item-tab-box{
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 15px;
  font-size: 13px;
}
.item-tab{
  display: flex;
  border-radius: 35px;
  width: 240px;
  height: 30px;
  background-color: #fff;
  border:1px solid #bbb;
}
.play-list{
  width: 50%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #bbb;
  border-radius: 35px;
  cursor: pointer; 
}
.history-list{
  width: 50%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 35px; 
  cursor: pointer; 
}
.information-box{
  display: flex;
  align-items: center;
}
.song-number{
  font-size: 6px;
  opacity: 0.5;
  margin-left: 9%;
}
.information-box img{
  width: 20px;
  height: 20px;
  margin-left: auto;
  cursor: pointer; 
}
.information-box span{
  margin-right: 9%;
  font-size: 15px;
  cursor: pointer;
}
.list-content{
  width: 100%;
  height: calc(100% - 75px);
  /* background-color: aqua; */
}
.list-empty{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.list-have{
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer; 
}
.list-have:hover {
  background: #f2f2f2;
}
.list-icon{
  display: flex;
  align-items: center;
  width: 40%;
  height: 50px;
  margin-left: 10px;
}
.list-music-name{
  width: 80%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  cursor: pointer;
}
.listIconName{
  color: red;
}
.song-author{
  width:30%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  cursor: pointer;
}

.song-time{
  width: 30%;
  height: 50px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

.song-time img{
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;
}

</style>