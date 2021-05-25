<template>
  <div class="album-page" style="height:calc(100% - 20px);" v-loading="loading" element-loading-text="正在加载">
    <div class="album-head-box">
      <div class="album-img">
        <el-image
          :src="albumData.album.picUrl"
          fit="fill"
          style="border-radius: 10px;height: 100%;"
        ></el-image>
      </div>
      <div class="album-describe">
        <!-- 专辑名字 -->
        <div class="album-title">
          <div class="album-text">专辑</div>
          {{albumData.album.name}}
        </div>
        <!-- 按钮 -->
        <div class="album-btn">
          <div class="play-all" @click="playAll">
            <img src="@/assets/img/play-white.svg" alt="">
            <span>播放全部</span>
          </div>
          <div class="share">
            <img src="@/assets/img/share.svg" alt="">
            <span>分享 ({{albumDynamicData.shareCount}})</span>
          </div>
        </div>
        <div style="margin-left:30px;margin-top:50px">歌手: {{albumData.album.artist.name}}</div>
        <div style="margin-left:30px;margin-top:30px">时间: {{formatDate(albumData.album.publishTime)}}</div>
      </div>
    </div>
    <div>
      <el-menu 
      :default-active="activeIndex"
      mode="horizontal" 
      @select="handleSelect"
      text-color="#909399"
      >
        <el-menu-item index="1">歌曲列表</el-menu-item>
        <el-menu-item index="2">评论({{count}})</el-menu-item>
        <el-menu-item index="3">专辑详情</el-menu-item>
      </el-menu>
    </div>
    <AlbumSongList :albumData="albumData" v-show="activeIndex == '1'" />
    <Comment 
    :comments="comments"
    :count="count"
    :currentPage="currentPage"
    @handleCurrentChange="handleCurrentChange"
    v-show="activeIndex == '2'" />
    <AlbumDetails :description="albumData.album.description" v-show="activeIndex == '3'" />
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex"
import AlbumSongList from '@/components/albumPage/AlbumSongList.vue'
import Comment from '@/components/comment/Comment.vue'
import AlbumDetails from '@/components/albumPage/AlbumDetails.vue'
export default {
  name:'AlbumPage',
  data() {
    return {
      activeIndex:'1',
      //专辑数据
      albumData:[],
      //专辑动态数据
      albumDynamicData:[],
      //参数
      albumId:this.$route.query.albumId,
      //评论数量
      count:0,
      //评论最新页
      currentPage: 1,
      //评论
      comments:{},
      //加载状态  
      loading:false,
    }
  },
  components:{
    AlbumSongList,
    Comment,
    AlbumDetails
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
        return year + '-' + month + '-' + date
      }
    }
  },
  created(){
    this.getAlbumData()
    this.getAlbumDynamicData()
    this.getAlbumCommentData()
  },
  methods:{
    ...mapMutations([
      //加入要播放的音乐ID
      'pushId',
      //播放音乐
      'startPlayMusic',
      //添加音乐到播放列表
      'addMusicList',
    ]),
    //组件切换
    handleSelect(index){
      this.activeIndex = index
    },
    //获取专辑信息
    getAlbumData(){
      this.loading = true
      let params = {
        id:this.albumId,
      }
      this.$http.get('album',{params})
      .then(res =>{
        this.albumData = res.data
        this.loading = false
        //console.log(this.albumData)
      })
      .catch(err => {
        console.log(err)
        this.$message.error('专辑信息请求失败,请重试')
      })
    },
    //获取专辑动态信息
    getAlbumDynamicData(){
      let params = {
        id:this.albumId,
      }
      this.$http.get('album/detail/dynamic',{params})
      .then(res =>{
        this.albumDynamicData = res.data
        //console.log(res)
      })
      .catch(err => {
        console.log(err)
        this.$message.error('专辑动态信息请求失败,请重试')
      })
    },
    //获取专辑评论
    getAlbumCommentData(){
      let params = {
        id:this.albumId,
        limit:20,
        offset:this.offset,
        before:this.time
      }
      this.$http.get('comment/album',{params})
      .then(res =>{
        //console.log(res)
        this.comments = res.data
        this.count = res.data.total
        if(this.comments.length > 0){
          this.time = this.comments[this.comments.length - 1].time
        }
      })
    },
    //评论页码改变事件
    handleCurrentChange(page){
      this.currentPage = page;
      this.offset = (page - 1) * 20
      this.getAlbumCommentData()
    }, 
    //播放全部按钮
    playAll(){
      this.pushId(this.albumData.songs[0].id)
      for(let item in this.albumData.songs){
        this.addMusicList(this.albumData.songs[item])
      }
    },
    receiveCount(count){
      this.count = count
    }
  }
}
</script>

<style scoped>
.album-page{
  padding: 20px;
  overflow-y: auto;
}
.album-head-box{
  display: flex;
  margin-left: 40px;
  margin-top: 40px;
}
.album-img{
  width: 30vh;
  height: 30vh;
}
.album-title{
  margin-left: 30px;
  font-weight: 600;
  font-size: 25px;
}
.album-text{
  color: rgb(208, 53, 53);
  border: 1px solid rgb(208, 53, 53);
  display: inline-block;
  font-size: 20px;
  margin-right: 10px;
  border-radius: 5px;
  padding: 0px 7px;
  cursor: default;
}
.album-btn{
  display: flex;
  margin-top: 70px;
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

/* 滚动条样式 */
.album-page::-webkit-scrollbar {
  width: 10px;
}
.album-page::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 10px;
}
</style>