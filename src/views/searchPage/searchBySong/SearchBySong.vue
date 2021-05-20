<template>
  <div class="search-song-box" v-loading="loading" element-loading-text="正在加载">
    <div class="search-song-list">
      <div class="search-table-column">
        <span style="left:15%">音乐标题</span>
        <span style="left:45%">歌手</span>
        <span style="left:65%">专辑</span>
        <span style="left:88%">时长</span>
      </div>
      <div class="search-table" v-for="(item,index) in tableData" :key="index" @dblclick="tableDbclick(item)" @mouseover="currentIndex = index" @mouseleave="currentIndex = -1">
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
      <div class="no-search" v-if="songCount == 0">
        很抱歉，没有找到您搜索信息的任何相关歌曲。
      </div>
    </div>
    <div class="block">
      <el-pagination
      background
      layout="prev, pager, next"
      :total="songCount"
      :page-size="50"
      :current-page="currentPage"
      @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex"
export default {
  name:'SearchBySong',
  data() {
    return {
      //歌曲数据
      tableData:[],
      //搜索的参数
      keywords:this.$route.query.searchWord,
      //初始页
      currentPage:1,
      //数据条数
      songCount:0,
      //数据请求偏移数量
      offset:0,
      currentIndex:-1,
      loading:false,
    }
  },
  watch: {
   //监听路由参数
   $route(){
    this.keywords = this.$route.query.searchWord
   },
   keywords() {
     this.getSearchSongData()
   },
  },
  created(){
    this.getSearchSongData()
  },
  mounted(){
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
    //获取歌曲列表
    getSearchSongData(){
      this.loading = true
      let params = {
        keywords:this.keywords,
        limit:50,
        offset:this.offset,
        type:1,
      }
      this.$http.get('cloudsearch',{params})
      .then(res =>{
        this.tableData = res.data.result.songs
        this.songCount = res.data.result.songCount
        this.$emit('sendCount',`找到${this.songCount}首单曲`)
        this.loading = false
        //console.log(res.data.result.songs)
      })
      .catch(err => {
        console.log(err)
        this.$message.error('歌曲列表请求失败,请重试')
      })
    },
    //页码改变事件
    handleCurrentChange(currentPage){
      this.currentPage = currentPage;
      this.offset = (currentPage - 1) * 50
      this.tableData = []
      this.getSearchSongData()
      //console.log(this.currentPage)  //点击第几页
    },
    //双击歌曲列表播放音乐
    tableDbclick(item){
      item.privilege.st == -200 ? this.$message.error('因版权问题，该歌曲已下架') : this.pushId(item.id)
    }
  },
}
</script>

<style scoped>
.search-song-box{
  height:calc(100% - 120px);
  overflow-y: auto;
}

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
.block{
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.no-search{
  position: relative;
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
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