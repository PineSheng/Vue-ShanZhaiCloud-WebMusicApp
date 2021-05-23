<template>
  <div class="song-sheet-details" style="height:calc(100% - 20px);" v-loading="loading" element-loading-text="正在加载">
    <div class="introduce">
      <div class="song-sheet-img">
        <el-image
          :src="songSheetData.coverImgUrl"
          fit="fill"
          style="border-radius: 10px;height: 100%;width:100%"
         ></el-image>
      </div>
      <div class="song-sheet-describe">
        <div class="song-sheet-title">
          <div class="song-sheet-text">歌单</div>
          {{songSheetData.name}}
        </div>
        <div class="release">
          <div style="height:40px">
            <el-image
              :src="songSheetData.creator.avatarUrl"
              fit="fill"
              style="width:40px;height:40px;border-radius: 40px"
            ></el-image>
          </div>
          <span style="margin-left:5px;color: rgb(80, 125, 175);cursor: pointer;">{{songSheetData.creator.nickname}}</span>
          <span style="font-size: 10px;margin-left:10px">{{formatDate(songSheetData.createTime)}} 创建</span>
        </div>
        <!-- 按钮 -->
        <div class="song-sheet-btn">
          <div class="play-all" @click="playAll">
            <img src="@/assets/img/play-white.svg" alt="">
            <span>播放全部</span>
          </div>
          <div class="collection">
            <img src="@/assets/img/collection.svg" alt="">
            <span>收藏({{playCount(songSheetData.subscribedCount)}})</span>
          </div>
          <div class="share">
            <img src="@/assets/img/share.svg" alt="">
            <span>分享({{songSheetData.shareCount}})</span>
          </div>
        </div>
        <div class="describe-text">
          <div>
            标签：
            <span v-for="(item,index) in songSheetData.tags" :key="index">
              <span style="color: rgb(80, 125, 175);cursor: pointer;">{{item}}</span>
              /
            </span>
          </div>
          <div style="margin-top:10px">
            <span>歌曲: {{songSheetData.trackCount}}</span>
            <span style="margin-left:20px">播放：{{playCount(songSheetData.playCount)}}</span>
          </div>
          <div class="synopsis">
            <span :title="songSheetData.description">简介: {{songSheetData.description}}</span>
          </div>
        </div>
      </div>
    </div>
    <el-menu 
      :default-active="activeIndex"
      mode="horizontal" 
      @select="handleSelect"
      text-color="#909399"
      active-text-color="#ec4141"
      >
        <el-menu-item index="1">歌曲列表</el-menu-item>
        <el-menu-item index="2">评论({{count}})</el-menu-item>
    </el-menu>
    <SongSheetList :trackIds="songSheetData.trackIds" @sendSongDetail="receiveSongDetail" v-show="activeIndex == '1'" />
    <SongSheetComment @sendCount="receiveCount" v-show="activeIndex == '2'" />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex"
import SongSheetList from '@/components/songSheet/SongSheetList.vue'
import SongSheetComment from '@/components/songSheet/SongSheetComment.vue'
export default {
  name:'SongSheetDetails',
  data() {
    return {
      //组件活跃标识
      activeIndex:'1',
      //歌单的ID
      id:this.$route.query.id,
      //歌单的信息
      songSheetData:[],
      //歌曲详情
      songs:[],
      //歌曲其他信息
      privileges:[],
      //评论数量
      count:0,
      //加载状态
      loading:false
    }
  },
  components:{
    SongSheetList,
    SongSheetComment
  },
  computed:{
    //时间戳转时间
    formatDate() {
      return (timestamp) => {
        let time = new Date(timestamp)
        let year = time.getFullYear()
        const month = (time.getMonth() + 1).toString().padStart(2, '0')
        const date = (time.getDate()).toString().padStart(2, '0')
        const hours = (time.getHours()).toString().padStart(2, '0')
        const minute = (time.getMinutes()).toString().padStart(2, '0')
        const second = (time.getSeconds()).toString().padStart(2, '0')
        return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
      }
    },
    //播放数量转换
    playCount(){
      return num => {
        num = Number(num)
	      if (num == 0) {
		      return num + ''
	      } else if (num > 1 && num < 10000) {
		      return num + ''
	      } else {
		      return (num / 10000).toFixed(0) + '万'
	      }
      }
    } 
  },
  created(){
    this.getSongSheetData()
  },
  methods: {
    handleSelect(index){
      this.activeIndex = index
    },
    ...mapMutations([
      //加入要播放的音乐ID
      'pushId',
      //添加音乐到播放列表
      'addMusicList',
    ]),
    //获取歌单信息
    getSongSheetData(){
      this.loading = true
      let params = {
        id:this.id
      }
      this.$http.get('playlist/detail',{params})
      .then(res =>{
        this.songSheetData = res.data.playlist
        this.loading = false
        //console.log(res)
      })
      .catch(err => {
        console.log(err)
        this.$message.error('歌单详情请求失败,请重试')
      })
    },
    //评论数量
    receiveCount(count){
      this.count = count
    },
    //接收子组件的歌曲详情
    receiveSongDetail(data){
      this.songs = data.songs
      this.privileges = data.privileges
      //console.log(this.songs)
    },
    //歌单所有歌曲加入播放列表
    playAll(){
      //开始播放歌单第一首
      this.pushId(this.songs[0].id)
      //其他歌曲全部加入播放列表
      for(let i = 0; i < this.songs.length; i++){
        //判断歌曲是否可以播放
        if(this.privileges[i].st != -200){
          this.addMusicList(this.songs[i])
        }
      }
    }
  },
}
</script>

<style scoped>
.song-sheet-details{
  padding: 20px;
  overflow-y: auto;
}
.introduce{
  display: flex;
  margin-left: 40px;
  margin-top: 40px;
  width: 90%;
}
.song-sheet-img{
  height: 30vh;
  width: 30vh;
}
.song-sheet-title{
  margin-left: 30px;
  font-weight: 600;
  font-size: 25px;  
}
.song-sheet-describe{
  width: 70%;
}
.song-sheet-text{
  color: rgb(208, 53, 53);
  border: 1px solid rgb(208, 53, 53);
  display: inline-block;
  font-size: 20px;
  margin-right: 10px;
  border-radius: 5px;
  padding: 0px 7px;
  cursor: default;
}
.release{
  display: flex;
  align-items: center;
  margin-left: 30px;
  margin-top: 30px;
}
.song-sheet-btn{
  display: flex;
  margin-top: 30px;
  margin-left: 30px;
}
.play-all{
  display: flex;
  align-items: center;
  margin-right: 10px;
  border-radius: 20px;
  background: #d03535;
  padding: 5px 15px;
  color: #fff;
  cursor: pointer;
}
.play-all img{
  width: 15px;
  height: 15px;
  padding-right: 5px;
}
.collection{
  display: flex;
  align-items: center;
  margin-right: 10px;
  border-radius: 20px;
  border: 1px solid #d8d8d8;
  padding: 5px 15px;
  cursor: pointer;  
}
.collection img{
  width: 20px;
  height: 20px;
  padding-right: 5px;  
}
.share{
  display: flex;
  align-items: center;
  margin-right: 10px;
  border-radius: 20px;
  border: 1px solid #d8d8d8;
  padding: 5px 15px;
  cursor: pointer;  
}
.share img{
  width: 20px;
  height: 20px;
  padding-right: 5px;
}
.describe-text{
  margin-left:30px;
  margin-top:30px
}
.synopsis{
  margin-top: 10px;
  position: relative;
  width: 70%;
}
.synopsis span{
  position: absolute;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
/* 滚动条样式 */
.song-sheet-details::-webkit-scrollbar {
  width: 10px;
}
.song-sheet-details::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 10px;
}
</style>