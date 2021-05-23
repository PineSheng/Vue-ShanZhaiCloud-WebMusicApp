<template>
  <div class="artist-details">
    <div>
      <h2 style="cursor: pointer;">个人简介</h2>
      <p>{{briefDesc}}</p>
    </div>
    <div v-for="(item,index) in DetailsText" :key="index">
      <h2 style="cursor: pointer;">{{item.ti}}</h2>
      <p>{{item.txt}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name:'ArtistDetails',
  data() {
    return {
      //歌手id
      artistId:this.$route.query.artistId,
      DetailsText:[],
    }
  },
  props:{
    briefDesc:String
  },
  created(){
    this.getDetailsText()
  },
  watch: {
   //监听路由参数
   $route(){
    this.artistId = this.$route.query.artistId
   },
   artistId() {
     this.getDetailsText()
   },
  },
  methods: {
    //获取歌手详情文本
    getDetailsText(){
      let params = {
        id:this.artistId
      }
      this.$http.get('artist/desc',{params})
      .then(res =>{
        //console.log(res)
        this.DetailsText = res.data.introduction
      })
      .catch(err => {
        console.log(err)
        this.$message.error('歌手详情文本请求失败,请重试')
      })
    }
  },
}
</script>

<style scoped>
.artist-details p{
  opacity: 0.7;
  text-indent: 30px;
  letter-spacing: 1px;
  line-height: 40px;
}
</style>