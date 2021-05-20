<template>
  <div class="search-album" v-loading="loading" element-loading-text="正在加载">
    <div class="idol" v-for="(item,index) in albumData" :key="index" @click="albumDetails(item)">
      <el-image
        :src="item.picUrl"
        fit="fill"
        style="width: 150px;height: 150px;border-radius: 8px;"
      ></el-image>
      <span style="margin-left: 30px;">{{item.name}}</span>
      <span class="album-artist">{{item.artist.name}}</span>
      <img src="@/assets/img/album-red.svg" alt="">
    </div>
    <div class="block">
      <el-pagination
      background
      layout="prev, pager, next"
      :total="albumCount"
      :page-size="20"
      :current-page="currentPage"
      @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <div class="no-search" v-if="albumCount == 0">
      很抱歉，没有找到您搜索信息的任何相关专辑。
    </div>
  </div>
</template>

<script>
export default {
  name:'SearchByAlbum',
  data() {
    return {
      //歌手数据
      albumData:[],
      //初始页
      currentPage:1,
      //数据条数
      albumCount:0,
      //搜索的参数
      keywords:this.$route.query.searchWord,
      //搜索偏移数量
      offset:0,
      loading:false,
    }
  },
  created(){
    this.getAlbumData()
  },
  methods: {
    //获取专辑数据
    getAlbumData(){
      this.loading = true
      let params = {
        keywords:this.keywords,
        limit:20,
        offset:this.offset,
        type:10,
      }
      this.$http.get('cloudsearch',{params})
      .then(res =>{
        this.albumData = res.data.result.albums
        this.albumCount = res.data.result.albumCount
        this.$emit('sendCount',`找到${this.albumCount}张专辑`)
        this.loading = false
        //console.log(res.data.result)
      })
      .catch(err => {
        console.log(err)
        this.$message.error('专辑信息请求失败,请重试')
      })
    },
    albumDetails(item){
      //console.log(item.id)
      this.$router.push({
        path: '/AlbumPage',
        query:{
          albumId:item.id
        }
      })
    },
    //页码改变事件
    handleCurrentChange(currentPage){
      this.currentPage = currentPage;
      this.offset = (currentPage - 1) * 20
      this.getAlbumData()
      //console.log(this.currentPage)  //点击第几页
    },
  },
}
</script>

<style scoped>
.search-album{
  width: 100%;
  height:calc(100% - 120px);
  overflow-y: auto;
}
.idol{
  display: flex;
  align-items: center;
  position: relative;
  height: 150px;
  margin-top: 30px;
}
.idol:hover{
  background: #f2f2f2;
}
.idol img:nth-child(1){
  width: 150px;
  height: 150px;
  border-radius: 8px;
}
.idol img:nth-child(4){
  width: 30px;
  height: 30px;
  margin-left: auto;
  margin-right: 10%;
}
.album-artist{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 50%;
  font-size: 15px;
  font-weight: 100;
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
.search-album::-webkit-scrollbar {
  width: 10px;
}
.search-album::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 10px;
}
</style>