<template>
  <div class="music-play">

    <!-- 左边播放的歌曲名字和图片 -->
    <div class="song-img" v-if="playSongId != ''">
      <el-image
        :src="songCover"
        fit="fill"
        style="height: 57px;width: 57px;border-radius: 10%;"
        @click="toSongDetails()"
      ></el-image>
    </div>
    <div class="song-name" v-if="playSongId != ''">
      <span style="margin-bottom:13px">{{songName}}</span>
      <span>{{songAuthor}}</span>
    </div>

    <!-- 中间的播放器 -->
    <div class="song-state">
      <div class="song-icon">
        <div class="song-icon-box">
          <!-- 顺序播放 -->
          <div @click="changMode" v-show="playMode == 'sequence'">
            <el-tooltip
              class="item"
              effect="light"
              content="顺序播放"
              placement="top"
              :open-delay="500"
            >
            <img :src="orderPlayImg" alt="" @mouseover="orderPlayOver" @mouseleave="orderPlayLeave">
           </el-tooltip>
          </div>
          <!-- 列表循环 -->
          <div @click="changMode" v-show="playMode == 'listLoop'">
            <el-tooltip
              class="item"
              effect="light"
              content="列表循环"
              placement="top"
              :open-delay="500"
            >
            <img :src="listLoopImg" alt="" @mouseover="listLoopOver" @mouseleave="listLoopLeave">
           </el-tooltip>
          </div>
          <!-- 单曲循环 -->
          <div @click="changMode" v-show="playMode == 'singleLoop'">
            <el-tooltip
              class="item"
              effect="light"
              content="单曲循环"
              placement="top"
              :open-delay="500"
            >
            <img :src="singleLoopImg" alt="" @mouseover="singleLoopOver" @mouseleave="singleLoopLeave">
           </el-tooltip>
          </div>
          <!-- 随机播放 -->
          <div @click="changMode" v-show="playMode == 'randomPlay'">
            <el-tooltip
              class="item"
              effect="light"
              content="随机播放"
              placement="top"
              :open-delay="500"
            >
            <img :src="randomPlayImg" alt="" @mouseover="randomPlayOver" @mouseleave="randomPlayLeave">
           </el-tooltip>
          </div>
          <!-- 上一曲 -->
          <img :src="lastSongImg" alt="" @mouseover="lastSongOver" @mouseleave="lastSongLeave" @click="lastSong">
          <div class="song-play"  @click="playState ? pauseMusic() : playMusic()">
            <img v-show="playState == false" src="@/assets/img/play.svg" alt="">
            <img v-show="playState" src="@/assets/img/suspend.svg" alt="">
          </div>
          <!-- 下一曲 -->
          <img :src="nextSongImg" alt="" @mouseover="nextSongOver" @mouseleave="nextSongLeave" @click="nextSong">
          <span :style="lyric" @mouseover="lyricSpanOver" @mouseleave="lyricSpanLeave">词</span>
        </div>
      </div>
      <div class="progress-bar">
        <span style="margin-right: 10px;">{{$seconds(musicDuration)}}</span>
        <div class="progress-bar-box">
          <audio 
          ref="player" 
          @timeupdate="playingMusic" 
          @ended="playFinish"
          :src="songUrl"
          autoplay
          >
          </audio>
          <el-slider class="bar" 
          v-model="musicDuration"
          :max="musicTotal"
          :show-tooltip="false"
          @change="changeMusicDuration"
          @mousedown.native="isChange = true"
          @mouseleave.native="isChange = false"
          @mouseup.native="isChange = false"
          ></el-slider>
        </div>
        <span style="margin-left: 10px;">{{$seconds(musicTotal)}}</span>
      </div>
    </div>

    <!-- 右边的音量和列表图标 -->
    <div class="volume-bar">
      <img src="@/assets/img/volume.svg" alt="" v-show="volumeState" @click="volumeSwitch">
      <img src="@/assets/img/volume-close.svg" alt="" v-show="volumeState == false" @click="volumeSwitch">
      <div class="volume-bar-box">
        <el-slider class="volume-run-bar"
          v-model="musicVolume"
          :min="0"
          :max="100"
          :show-tooltip="true"
          @input="inputMusicVolume"
          ></el-slider>
      </div>
    </div>
    <div class="song-list-icon">
      <img src="../../assets/img/list.svg" alt="" @click="listClick">
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex"
export default {
  name:'MusicPlay',
  data() {
    return {
      songName:'',//歌曲名字
      songCover:'',//歌曲封面
      songAuthor:'',//歌手名字
      randomPlayImg:require('@/assets/img/random-play.svg'),
      listLoopImg:require('@/assets/img/list-loop.svg'),
      singleLoopImg:require('@/assets/img/single-loop.svg'),
      orderPlayImg:require('@/assets/img/order-play.svg'),
      lastSongImg:require('@/assets/img/last-song.svg'),
      nextSongImg:require('@/assets/img/next-song.svg'),
      lyric:'',    //词绑定的样式
      songPlay:'', //播放按钮绑定的样式
      musicDuration:0, //进度条已播放时间
      musicTotal:0, //进度条总时间
      musicVolume:50, //音量
      volumeState:false,//音量是否关闭
      songUrl:"", //歌曲的URL
      songListState:true,//歌曲列表打开关闭状态
      isChange:false //判断是否被拖动
    }
  },
  //监听是否需要播放
  watch: {
    playSongId(val) {
      if(val != '' && val != ' '){
        //获取歌曲URL
        this.getSongUrl()
        //获取歌曲详情
        this.getMusicDetails()
      }else if(val != ' '){
        this.suspendMusic()
      }
      val != ''  ? this.startPlayMusic() : this.suspendMusic()
    }
  },
  computed:{
    ...mapGetters([
      //播放状态
      'playState',
      //要播放的音乐id
      'playSongId',
      //播放列表
      'palySongList',
      //历史记录列表
      'songHistoryList',
       //播放模式
       'playMode'
    ]),
    //生成随机数
    getRandom() {
      return (start, end, fixed=0) =>{
        let differ = end - start
        let random = Math.random()
        return (start + differ * random).toFixed(fixed)
      }
    }
  },
  methods:{
    ...mapMutations([
      //加入要播放的音乐ID
      'pushId',
      //播放音乐
      'startPlayMusic',
      //暂停音乐
      'suspendMusic',
      //添加音乐到播放列表
      'addMusicList',
      //添加音乐到历史记录列表
      'addHistoryList',
      //切换播放模式
      'modeSwitching'
    ]),
    orderPlayOver(){
      this.orderPlayImg = require('@/assets/img/order-play-select.svg')
    },
    orderPlayLeave(){
      this.orderPlayImg = require('@/assets/img/order-play.svg')
    },
    listLoopOver(){
      this.listLoopImg = require('@/assets/img/list-loop-select.svg')
    },
    listLoopLeave(){
      this.listLoopImg = require('@/assets/img/list-loop.svg')
    },
    singleLoopOver(){
      this.singleLoopImg = require('@/assets/img/single-loop-select.svg')
    },
    singleLoopLeave(){
      this.singleLoopImg = require('@/assets/img/single-loop.svg')
    },
    randomPlayOver(){
      this.randomPlayImg = require('@/assets/img/random-play-select.svg')
    },
    randomPlayLeave(){
      this.randomPlayImg = require('@/assets/img/random-play.svg')
    },
    lastSongOver(){
      this.lastSongImg = require('@/assets/img/last-song-select.svg')
    },
    lastSongLeave(){
      this.lastSongImg = require('@/assets/img/last-song.svg')
    },
    nextSongOver(){
      this.nextSongImg = require('@/assets/img/next-song-select.svg')
    },
    nextSongLeave(){
      this.nextSongImg = require('@/assets/img/next-song.svg')
    },
    lyricSpanOver(){
      this.lyric = 'color: red;'
    },
    lyricSpanLeave(){
      this.lyric = ''
    },
    //验证音乐是否可用
    // testingMusic(){
    //   let params = {
    //     id:playSongId
    //   }
    //   this.$http.get('/check/music')
    //   .then(res =>{
    //     console.log(res)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     this.$message.error('请求失败')
    //   })
    // },
    //获取音乐url
    getSongUrl(){
      let params = {
        id:this.playSongId
      }
      this.$http.get('/song/url',{params})
      .then(res =>{
        this.songUrl = res.data.data[0].url
      })
      .catch(err => {
        console.log(err)
        this.$message.error('音乐url请求失败')
      })
    },
    //获取音乐详情
    getMusicDetails(){
      let params = {
        ids:this.playSongId
      }
      this.$http.get('song/detail',{params})
      .then(res =>{
        //console.log(res.data.songs[0].al)
        //歌曲封面
        this.songCover = res.data.songs[0].al.picUrl
        //歌曲名字
        this.songName = res.data.songs[0].name
        //歌手名字
        this.songAuthor = res.data.songs[0].ar[0].name
        //歌曲时间
        this.musicTotal = res.data.songs[0].dt / 1000
        //加入播放列表
        this.addMusicList(res.data.songs[0])
        //加入历史列表
        this.addHistoryList(res.data.songs[0])
      })
      .catch(err => {
        console.log(err)
        this.$message.error('音乐详情请求失败')
      })
    },
    //切换播放模式
    changMode(){
      let arr = ['sequence','listLoop','singleLoop','randomPlay']
      const music = this.$refs.player
      music.loop = false
      if(this.playMode == 'sequence'){
        this.modeSwitching(arr[1])
      }else if(this.playMode == 'listLoop'){
        this.modeSwitching(arr[2])
        music.loop = true
      }else if(this.playMode == 'singleLoop'){
        this.modeSwitching(arr[3])
      }else if(this.playMode == 'randomPlay'){
        this.modeSwitching(arr[0])
      }
    },
    //开始播放音乐
    playMusic(){
      const music = this.$refs.player; //音频所在对象
      if(this.palySongList.length == 0){
        this.$message.error('列表中没有可播放的歌曲')
      }else{
        music.play()
        this.startPlayMusic()
      }
    },
    //暂停音乐
    pauseMusic(){
      const music = this.$refs.player; //音频所在对象
      music.pause()
      this.suspendMusic()
    },
    //上一曲
    lastSong(){
      //正在播放歌曲的下标
      let newSong = this.palySongList.findIndex(item => item.id === this.playSongId)
      if(newSong  == 0 &&this.playMode != 'randomPlay' && this.palySongList.length > 1){ //如果是第一首
        this.pushId(this.palySongList[this.palySongList.length - 1].id)
      }else if(this.palySongList.length == 1){
        this.$message.error('已经是列表最后一首')
      }else if(this.playMode != 'randomPlay'){
        this.pushId(this.palySongList[newSong - 1].id)
      }
    },
    //下一曲
    nextSong(){
      //正在播放歌曲的下标
      let newSong = this.palySongList.findIndex(item => item.id === this.playSongId)
      if(newSong + 1 == this.palySongList.length &&this.playMode != 'randomPlay' && this.palySongList.length > 1){ //如果是最后一首
        this.pushId(this.palySongList[0].id)
      }else if(this.palySongList.length == 1){
        this.$message.error('已经是列表最后一首')
      }else if(this.playMode != 'randomPlay'){
        this.pushId(this.palySongList[newSong + 1].id)
      }
    },
    //音乐播放时处理
    playingMusic(){
      if (this.isChange === true) return;
      const music = this.$refs.player; //音频所在对象
      if(music.readyState == 4){
        const stopTime = music.currentTime // 获得已播放的音频时长
        this.musicDuration = stopTime //进度条已播放时间赋值
      }
    },
    //音乐播放完成
    playFinish(){
      //正在播放歌曲的下标
      let newSong = this.palySongList.findIndex(item => item.id === this.playSongId)
      //顺序播放模式
      if(newSong + 1 == this.palySongList.length &&this.playMode == 'sequence'){ //如果是最后一首
        this.$message.error('已经是列表最后一首')
        this.suspendMusic()
      }else if(this.playMode == 'sequence'){
        this.pushId(this.palySongList[newSong + 1].id)
      }
      //列表循环播放模式
      if(this.playMode == 'listLoop' && newSong + 1 == this.palySongList.length && this.palySongList.length != 1){ //如果是最后一首
        this.pushId(this.palySongList[0].id)
      }else if(this.playMode == 'listLoop' && newSong + 1 == this.palySongList.length && this.palySongList.length == 1){
        this.$refs.player.pause()
        this.$refs.player.play()
      }else if(this.playMode == 'listLoop'){ //不是最后一首
        this.pushId(this.palySongList[newSong + 1].id)
      }
    },
    //歌曲列表点击事件
    listClick(){
      this.$emit('listClick',this.songListState)
      this.songListState = !this.songListState
    },
    //鼠标拖拽进度条跳转
    changeMusicDuration(val){
      this.$refs.player.currentTime = val
      this.isChange = false
    },
    //音量调整
    inputMusicVolume(val){
      this.musicVolume == 0 ? this.volumeState = false : this.volumeState = true
      const music = this.$refs.player;
      if(!music.muted){
        music.volume = val / 100
      }
    },
    //音量打开关闭
    volumeSwitch(){
      const music = this.$refs.player;
      music.muted = !music.muted
      music.muted ? (this.volumeState = false,this.musicVolume = 0) : (this.volumeState = true ,this.musicVolume = music.volume * 100 )
    },
    toSongDetails(){
      this.$router.push('/songDetails')
    }
  }
}
</script>

<style scoped>
/* 底部播放栏 */
.music-play{
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  box-shadow: 0 0 1px 1px #b9b5b5;
  bottom: 0;
  background: #f6f6f8;
  /* z-index: 3000; */
}

/* 左边播放的歌曲图片和名字 */
.song-img{
  border-radius: 10%;
  height: 57px;
  width: 57px;
  cursor: pointer;
  margin-left: 30px;
}
.song-name{
  display: flex;
  flex-direction: column;
  width: 160px;
  margin-left: 10px;
}
.song-name span{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}

/* 中间的播放器 */
.song-state{
  position: absolute;
  width: 50%; 
  left: 50%;
  transform: translate(-50%);   
}
.song-icon{
  display: flex;
  justify-content: center;
  height: 50px;
  width: 100%;
}
.song-icon-box{
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
}
.song-icon-box span{
  cursor: pointer;
}
.song-play{
  cursor: pointer;
  background: #f2f2f2;
  border-radius: 100%;
  height: 40px;
  width: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.song-play:hover{
  background: rgb(228, 226, 226);
}
.song-icon img{
  width: 18px; 
  height: 18px;
  cursor: pointer;
}
.progress-bar{
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30px;
}
.progress-bar-box{
  width: 90%;
  height: 30px;
  display: flex;
  align-items: center;
  /* background-color: blue; */
}
.bar{
  background-color: #e6e7ea;
  width: 100%;
  height: 7px;
  border-radius: 10px;
  display: flex;
  align-items: center;
}


/* 右边的音量和列表图标 */
.volume-bar{
  position: absolute;
  display: flex;
  align-items: center;
  right: 10%;
  width: 10%;
}
.volume-bar img{
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
.volume-bar-box{
  width: 100%;
  height: 7px;
  background-color: #e6e7ea;
  border-radius: 10px;
  display: flex;
  align-items: center;
}
.volume-run-bar{
  width: 100%;
  height: 7px;
  display: flex;
  align-items: center;
  border-radius: 10px;
}
.song-list-icon{
  position: absolute;
  right: 5%;
}
.song-list-icon img{
  width: 25px;
  height: 25px;
  cursor: pointer;
}
</style>