<template>
   <!-- 默认搜索建议 -->
  <div class="search-box">
    <!-- 搜索历史部分 -->
    <div class="search-history">
      <!-- 搜索历史标题 -->
      <div class="search-history-title" v-show="historyData.length > 0">
        <span style="font-size:18px;opacity: 0.6;">搜索历史</span>
        <img src="../../assets/img/trash.svg" alt="">
      </div>
    </div>
    <!-- 搜索历史数据 -->
    <div class="search-history-data" v-show="historyData.length > 0">
      <div class="history-data-box" v-for="(item,index) in historyData" :key="index">
        <span>{{item}}</span>
        <i class="el-icon-close" @click="deleteHistory(index)"></i>
      </div>
    </div>
    <!-- 热搜榜 -->
    <div class="hot-search">
      <span style="font-size:18px;opacity: 0.6;">热搜榜</span>
      <div class="hot-search-content"  v-for="(item,index) in hotSearchData" :key="index" @click="searchJump(item.searchWord)">
        <div style="width:10%;font-size:15px;padding-left:10px" :class="{ frontTir: index <= 2, other: index > 2 }"> 
          {{index + 1}}
        </div>
        <div>
          <div style="height:35px;display:flex;">
            <div style="padding-top: 10px; font-size:15px;font-weight: 540;">
              {{item.searchWord}}
            </div>
            <img :src="item.iconUrl" v-if="item.iconUrl != null">
            <span style="padding-top: 13px;padding-left:10px;color: rgb(207, 207, 207);">{{item.score}}</span>
          </div>
          <div class="hot-search-introduce" >
            {{item.content}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'searchSuggertion',
  data() {
    return {
      historyData:['111','222','333','444'],
      hotSearchData:[],
      searchOver:''
    }
  },
  created(){
    this.getHotSearchData()
  },
  methods:{
    //删除搜索历史数据
    deleteHistory(index){
      this.historyData.splice(index,1)
    },
    //获取热搜榜数据
    getHotSearchData(){
      this.$http.get('search/hot/detail')
      .then(res =>{
        this.hotSearchData = res.data.data
      })
      .catch(err => {
        console.log(err)
        this.$message.error('热搜榜数据请求失败')
      })
    },
    //点击搜索建议后跳转
    searchJump(searchWord){
      this.$emit('clickSearchJump',false)
      if(this.$route.query.searchWord != searchWord){
        this.$router.push({
          path: '/searchPage/searchBySong',
          query:{
            searchWord
          }
        })
      }
    }
  }
} 
</script>

<style scoped>
.search-box{
  position: absolute;
  margin-top: 5px;
  height: 400px;
  width: 380px;
  box-shadow: 0 0 1px 1px #f0f0f0;
  background-color: #fff;
  border-radius: 2%;
  z-index: 2000;
  padding: 20px 15px;
  overflow-x: hidden;
  overflow-y: auto;
}
.search-history-title{
  display: flex;
  align-items: center;
}
.search-history img{
  width: 21px;
  height: 21px;
}
.search-history-data{
  display: flex;
  flex-wrap: wrap;
}
.history-data-box{
  margin-top: 20px;
  margin-right: 10px;
  border-radius: 20px;
  border: 1px solid #d8d8d8;
  padding: 5px 10px;
  cursor: pointer;
}
.hot-search{
  margin-top: 20px;
  height: 330px;
}
.hot-search img{
  padding-top: 13px;
  padding-left:10px;
  width: 28px;
  height: 15px;
}
.hot-search-content{
  display: flex;
  align-items: center;
  margin-top: 10px;
  height: 70px;
  width: 100%;
  cursor: pointer; 
}
.hot-search-content:hover {
  background: #f2f2f2;
}
.hot-search-introduce{
  height:35px;
  display:flex;
  align-items: center;
  color: rgb(159, 159, 159);
  font-size:12px
}
.frontTir{
  color: #ff3b3b;
}

/* 滚动条样式 */
.search-box::-webkit-scrollbar {
  width: 10px;
}
.search-box::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 10px;
}
</style>