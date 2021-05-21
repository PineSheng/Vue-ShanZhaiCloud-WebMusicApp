<template>
  <div class="song-list"  v-loading="loading" element-loading-text="正在加载">
    <div class="song-list-box" v-for="(item,index) in songListData" :key="index" @click="songSheetDetails(item)">
      <el-image
        :src="item.coverImgUrl"
        fit="fill"
        style="height: 150px;width: 150px;border-radius: 8px;"
      ></el-image>
      <span class="song-list-name" :title="item.name">{{item.name}}</span>
      <div class="track-count">
        <span style="opacity: .5;font-size:15px">{{item.trackCount}}首</span>
      </div>
      <div class="nick-name">
        <span style="margin-left:15%;">by:{{item.creator.nickname}} </span>
      </div>
    </div>
    <div class="block">
      <el-pagination
      background
      layout="prev, pager, next"
      :total="playlistCount"
      :page-size="20"
      :current-page="currentPage"
      @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name:'SearchBySongList',
  data() {
    return {
      //搜索的参数
      keywords:this.$route.query.searchWord,
      //歌单数据
      songListData:[],
      //初始页
      currentPage:1,
      //数据条数
      playlistCount:0,
      //数据请求偏移数量
      offset:0,

      loading:false,
    }
  },
  created(){
    this.getSongListData()
  },
  methods: {
    //获取歌单信息
    getSongListData(){
      this.loading = true
      let params = {
        keywords:this.keywords,
        limit:20,
        offset:this.offset,
        type:1000,
      }
      this.$http.get('cloudsearch',{params})
      .then(res =>{
        //console.log(res)
        this.songListData = res.data.result.playlists
        this.playlistCount = res.data.result.playlistCount
        this.loading = false
      })
      .catch(err => {
        console.log(err)
        this.$message.error('歌单信息请求失败,请重试')
      })
    },
    songSheetDetails(item){
      //console.log(item)
      this.$router.push({
        path: '/songSheetDetails',
        query:{
          id:item.id
        }
      })
    },
    //页码改变事件
    handleCurrentChange(currentPage){
      this.currentPage = currentPage;
      this.offset = (currentPage - 1) * 20
      this.getSongListData()
      //console.log(this.currentPage)  //点击第几页
    },
  },
}
</script>

<style scoped>
.song-list{
  width: 100%;
  height: calc(100% - 120px);
  overflow-y: auto;
}
.song-list-box{
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 30px;
  position: relative;
}
.song-list-box:hover{
  background: #f2f2f2;
}
.song-list-name{
  width: 30%;
  margin-left:30px;
  color: #507daf;
  font-weight: 400;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.track-count{
  position: absolute;
  left:50%;
}
.nick-name{
  position: absolute;
  width: 30%;
  left:65%;
}
.block{
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
/* 滚动条样式 */
.song-list::-webkit-scrollbar {
  width: 10px;
}
.song-list::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 10px;
}
</style>