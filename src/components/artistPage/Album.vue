<template>
  <div class="album-div" v-loading="loading" element-loading-text="正在加载">
    <div class="album-box">
      <div class="album" v-for="(item,index) in albumData" :key="index">
        <img 
        v-show="imgIndex === index" 
        src="@/assets/img/play2.svg" 
        class="album-play-img"
        @mouseover="imgIndex = index"
        @mouseleave="imgIndex = '-1'"
        >
        <el-image
          :src="item.picUrl"
          fit="fill"
          style="width:100%;border-radius: 10px;box-shadow: grey 0px 0px 2px 2px;"
          @mouseover="imgIndex = index"
          @mouseleave="imgIndex = '-1'"
          @click="albumImgClick(item)"
        ></el-image>
        <div>
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <div class="block">
      <el-pagination
      background
      layout="prev, pager, next"
      :total="albumCount"
      :page-size="16"
      :current-page="currentPage"
      @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name:'Album',
  data() {
    return {
      //歌手id
      artistId:this.$route.query.artistId,
      //专辑数据
      albumData:[],
      //初始页
      currentPage:1,
      //数据条数
      albumCount:0,
      //数据请求偏移数量
      offset:0,
      //是否正在加载
      loading:false,
      imgIndex:'-1'
    }
  },
  created(){
    this.getAlbumData()
  },
  watch: {
   //监听路由参数
   $route(){
    this.artistId = this.$route.query.artistId
   },
   artistId() {
     this.getAlbumData()
   },
  },
  methods: {
    //获取专辑信息
    getAlbumData(){
      this.loading = true
      let params = {
        id:this.artistId,
        limit:16,
        offset:this.offset
      }
      this.$http.get('artist/album',{params})
      .then(res =>{
        this.albumData = res.data.hotAlbums
        this.albumCount = res.data.artist.albumSize
        this.loading = false
        // console.log(res.data.artist.albumSize)
      })
      .catch(err => {
        console.log(err)
        this.$message.error('歌手专辑请求失败,请重试')
      })
    },
    //页码改变事件
    handleCurrentChange(currentPage){
      this.currentPage = currentPage;
      this.offset = (currentPage - 1) * 16
      this.albumData = []
      this.getAlbumData()
    },
    albumImgClick(item){
      this.$router.push({
        path: '/AlbumPage',
        query:{
          albumId:item.id
        }
      })
    }
  },
}
</script>

<style scoped>
.album-div{
  margin-top: 20px;
}
.album-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.album-box:after{
  content: "";
  width: 22%;
  height: 0px;
  visibility: hidden;
}
.album{
  width: 22%;
  cursor: pointer;
  margin-bottom: 20px;
  position: relative;
}
.album-play-img{
  position: absolute;
  z-index: 100;
  width: 50px;
  height: 50px;
  left: 50%;
  top: 44%;
  transform: translate(-50%, -50%);
}
.block{
  display: flex;
  justify-content: center;
}
</style>