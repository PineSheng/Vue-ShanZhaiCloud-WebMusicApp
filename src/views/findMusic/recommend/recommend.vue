<template>
  <div class="recommend-box">
    <div>
      <el-carousel 
      :interval="4000" 
      type="card" 
      height="260px"
      arrow="never"
      >
        <el-carousel-item v-for="(item,index) in carouselData" :key="(item,index)" style="border-radius: 10px">
          <el-image
            :src="item.imageUrl"
            fit="fill"
            style="height: 100%; border-radius: 10px"
            @click="carouselClick(item.targetId)"
          ></el-image>
          <el-tag
            :type="item.typeTitle === '独家' ? 'danger' : 'primary'"
            effect="dark"
            style="position: absolute; bottom: 0; right: 0; border-radius: 5px"
           >
            {{ item.typeTitle }}
          </el-tag>
        </el-carousel-item>
      </el-carousel>
    </div>
    <RecommendSongList></RecommendSongList>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex"
import RecommendSongList from '@/components/recommendSongList/RecommendSongList.vue'
export default {
  name:'recommend',
  data() {
    return {
      carouselData:[],
      mediumColor:'background-color:blue'
    }
  },
  components:{
    RecommendSongList
  },
  computed:{
    ...mapGetters([
      //播放状态
      "playState",
    ]),
  },
  created(){
    this.getCarouselData()
  },
  mounted(){
  },
  methods:{
    ...mapMutations([
      //播放音乐
      'startPlayMusic',
      //暂停音乐
      'suspendMusic',
      //加入要播放的歌曲id
      'pushId'
    ]),
    //获取轮播图数据
    getCarouselData(){
      this.$http.get('/banner')
      .then(res =>{
        this.carouselData = res.data.banners
      })
      .catch(err => {
        console.log(err)
        this.$message.error('轮播图请求失败')
      })
    },
    //轮播图点击事件
    carouselClick(id){
      //console.log(id)
      if(id == 0){
        this.$message.error('您暂无权限收听该歌曲')
      }else{
        this.pushId(id)
        this.startPlayMusic()
      }
    }
  }
}
</script>

<style scoped>
/* 轮播组件样式 */
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.el-tag{
  height: 24px;
  padding: 0 8px;
  line-height: 22px;
}

.recommend-box{
  width: 100%;
  height: calc(100% - 90px);
  padding-right: 17px;
  padding-left: 3px;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 滚动条样式 */
.recommend-box::-webkit-scrollbar {
  width: 10px;
}
.recommend-box::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 10px;
}

</style>