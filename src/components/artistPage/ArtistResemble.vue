<template>
  <div class="artist-resemble" v-loading="loading" element-loading-text="正在加载">
    <div style="width:18%;margin-right: 2%;" v-for="(item,index) in SimilarSingerData" :key="index" @click="artistPageJump(item)">
      <el-image
        :src="item.picUrl"
        fit="fill"
        style="width: 100%;border-radius: 10px;"
      ></el-image>
      <div class="artist-name">
        <p>{{item.name}}</p>
        <img src="@/assets/img/character.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'ArtistResemble',
  data() {
    return {
      //歌手id
      artistId:this.$route.query.artistId,
      //相似歌手数据
      SimilarSingerData:[],
      loading:false
    }
  },
  created(){
    this.getSimilarSinger()
  },
  watch: {
   //监听路由参数
   $route(){
    this.artistId = this.$route.query.artistId
   },
   artistId() {
     this.getSimilarSinger()
   },
  },
  methods: {
    getSimilarSinger(){
      this.loading = true
      let params = {
        id:this.artistId
      }
      this.$http.get('simi/artist',{params})
      .then(res =>{
        //console.log(res)
        this.loading = false
        this.SimilarSingerData = res.data.artists
      })
      .catch(err => {
        console.log(err)
        this.$message.error('歌手详情请求失败,请重试')
      })
    },
    artistPageJump(item){
      //console.log(item)
      this.$router.push({
        query:{
          artistId:item.id
        }
      })
    }
  },
}
</script>

<style scoped>
.artist-resemble{
  margin-left: 10px;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
}
.artist-name{
  display: flex;
  align-items: center;
}
.artist-name img{
  width: 20px;
  height: 20px;
  margin-left: auto;
  margin-right: 5px;
}
</style>