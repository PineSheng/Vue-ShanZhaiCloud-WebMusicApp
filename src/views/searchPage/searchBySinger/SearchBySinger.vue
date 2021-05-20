<template>
  <div class="search-singer" v-loading="loading" element-loading-text="正在加载">
    <div class="idol" v-for="(item,index) in singerData" :key="index" @click="artistPageJump(item)">
      <el-image
        :src="item.picUrl"
        fit="fill"
        style="width: 150px;height: 150px;border-radius: 8px;"
      ></el-image>
      <span style="margin-left: 30px;">{{item.name}}</span>
      <img v-show="item.accountId" src="@/assets/img/character.svg" alt="">
    </div>
    <div class="block">
      <el-pagination
      background
      layout="prev, pager, next"
      :total="artistCount"
      :page-size="20"
      :current-page="currentPage"
      @current-change="handleCurrentChange">
      </el-pagination>
    </div>
    <div class="no-search" v-if="artistCount == 0">
      很抱歉，没有找到您搜索信息的任何相关歌手。
    </div>
  </div>
</template>

<script>
export default {
  name:'SearchBySinger',
  data() {
    return {
      //歌手数据
      singerData:[],
      //初始页
      currentPage:1,
      //数据条数
      artistCount:0,
      //搜索的参数
      keywords:this.$route.query.searchWord,
      //搜索偏移数量
      offset:0,
      loading:false,
    }
  },
  created(){
    this.getSingerData()
  },
  methods: {
    //获取歌手数据
    getSingerData(){
      this.loading = true
      let params = {
        keywords:this.keywords,
        limit:20,
        offset:this.offset,
        type:100,
      }
      this.$http.get('cloudsearch',{params})
      .then(res =>{
        this.singerData = res.data.result.artists
        this.artistCount = res.data.result.artistCount
        this.$emit('sendCount',`找到${this.artistCount}位歌手`)
        this.loading = false
        //console.log(res.data.result)
      })
      .catch(err => {
        console.log(err)
        this.$message.error('歌手信息请求失败,请重试')
      })
    },
    artistPageJump(item){
      //console.log(item)
      this.$router.push({
        path: '/artistPage',
        query:{
          artistId:item.id
        }
      })
    },
    //页码改变事件
    handleCurrentChange(currentPage){
      this.currentPage = currentPage;
      this.offset = (currentPage - 1) * 20
      this.getSingerData()
      //console.log(this.currentPage)  //点击第几页
    },
  },
}
</script>

<style scoped>
.search-singer{
  width: 100%;
  height:calc(100% - 120px);
  overflow-y: auto;
}
.idol{
  display: flex;
  align-items: center;
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
.idol img:nth-child(3){
  width: 30px;
  height: 30px;
  margin-left: auto;
  margin-right: 10%;
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
.search-singer::-webkit-scrollbar {
  width: 10px;
}
.search-singer::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 10px;
}
</style>