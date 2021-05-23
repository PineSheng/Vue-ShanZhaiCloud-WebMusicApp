<template>
  <div class="artist-page" style="height:calc(100% - 50px)">
    <div class="detail">
      <div class="artist-img">
        <el-image
          :src="artistData.artist.cover"
          fit="fill"
          style="height: 100%;border-radius: 10px;"
        ></el-image>
      </div>
      <div class="artist-describe">
        <h2 style="margin-left:30px">{{artistData.artist.name}}</h2>
        <div class="is-btn-box">
          <div class="is-btn">
            <img src="@/assets/img/collection.svg">
            <span style="margin-left:5px">收藏</span>
          </div>
          <div class="is-btn">
            <img src="@/assets/img/user2.svg">
            <span style="margin-left:5px">个人主页</span>
          </div>
        </div>
        <div class="number">
          <span style="margin-top:50px">单曲数:{{artistData.artist.musicSize}}</span>
          <span style="margin-top:30px">专辑数:{{artistData.artist.mvSize}}</span>
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
        <el-menu-item index="1">专辑</el-menu-item>
        <el-menu-item index="2">MV</el-menu-item>
        <el-menu-item index="3">歌手详情</el-menu-item>
        <el-menu-item index="4">相似歌手</el-menu-item>
    </el-menu>
    <Album style="width:100%;" v-show="activeIndex == '1'" v-loading="loading" element-loading-text="正在加载"/>
    <Mv style="width:100%;" v-show="activeIndex == '2'" />
    <ArtistDetails :briefDesc="briefDesc" style="width:100%;" v-show="activeIndex == '3'" />
    <ArtistResemble style="width:100%;" v-show="activeIndex == '4'" />
    
  </div>
</template>

<script>
import Album from '@/components/artistPage/Album.vue'
import Mv from '@/components/artistPage/Mv.vue'
import ArtistDetails from '@/components/artistPage/ArtistDetails.vue'
import ArtistResemble from '@/components/artistPage/ArtistResemble.vue'
export default {
  name:'ArtistPage',
  data() {
    return {
      //组件活跃标识
      activeIndex:'1',
      //歌手的ID
      artistId:this.$route.query.artistId,
      //歌手的信息
      artistData:{
        artist:{
          cover:'',
          name:'',
          musicSize:'',
          mvSize:''
        }
      },
      //歌手个人简介
      briefDesc:'',
      loading:false
    }
  },
  watch: {
   //监听路由参数
   $route(){
    this.artistId = this.$route.query.artistId
   },
   artistId() {
     this.getArtistData()
   },
  },
  components:{
    Album,
    Mv,
    ArtistDetails,
    ArtistResemble
  },
  created(){
    this.getArtistData()
  },
  methods: {
    handleSelect(index){
      this.activeIndex = index
    },
    //获取歌手信息
    getArtistData(){
      let params = {
        id:this.artistId
      }
      this.$http.get('artist/detail',{params})
      .then(res =>{
        this.artistData = res.data.data
        this.briefDesc = res.data.data.artist.briefDesc
        //console.log(res.data.data.artist.briefDesc)
      })
      .catch(err => {
        console.log(err)
        this.$message.error('歌手详情请求失败,请重试')
      })
    }
  },
}
</script>

<style scoped>
h2{margin: 0px; padding: 0px;}

.artist-page{
  width: 100%;
  padding:20px;
  overflow-y: auto;
}
.artist-img{
  width: 30vh;
  height: 30vh;
}
.detail{
  display: flex;
  width: 100%;
  height: 35vh;
  margin-top: 20px;
  margin-left: 20px;
}
.is-btn-box{
  display: flex;
  margin-top: 40%;
  margin-left: 30px;
}
.is-btn{
  display: flex;
  margin-right: 10px;
  border-radius: 20px;
  border: 1px solid #d8d8d8;
  padding: 5px 15px;
  cursor: pointer;
}
.is-btn img{
  width: 20px;
  height: 20px;
}
.number{
  display: flex;
  flex-direction: column;
  margin-left: 30px;
}

/* 滚动条样式 */
.artist-page::-webkit-scrollbar {
  width: 10px;
}
.artist-page::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 10px;
}
</style>