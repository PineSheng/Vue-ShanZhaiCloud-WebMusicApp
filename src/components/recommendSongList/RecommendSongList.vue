<template>
<!-- 个性推荐-推荐歌单部分 -->
  <div>
    <el-divider content-position="left"><h2>推荐歌单</h2></el-divider>
    <div class="recommen-list-content">
      <div class="recommen-list-box" v-for="(item,index) in recommenListData" :key="index" @click="seeDetails(item)">
        <div class="recommen-list-img">
          <img :src="item.picUrl" alt="">
          <div class="play-count">
            <i class="el-icon-headset"></i>
            <span>{{ playCount(item.playCount) }}</span>
          </div>
        </div>
        <div class="recommen-list-name">
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'RecommendedSongList',
  data() {
    return {
      recommenListData:[]
    }
  },
  computed:{
    //播放数量转换
    playCount(){
      return num => {
        num = Number(num)
	      if (num == 0) {
		      return num + ''
	      } else if (num > 1 && num < 10000) {
		      return num + ''
	      } else {
		      return (num / 10000).toFixed(0) + '万'
	      }
      }
    }    
  },
  created() {
    this.getRecommenListData()
  },
  methods:{
    //获取推荐歌单数据
    getRecommenListData(){
      let params = {
        limit:10
      }
      this.$http.get('/personalized',{params:params})
      .then(res =>{
        this.recommenListData = res.data.result
      })
      .catch(err => {
        console.log(err)
        this.$message.error('推荐歌单请求失败')
      })
    },
    //查看歌单详情
    seeDetails(item){
      this.$router.push({
        path: '/songSheetDetails',
        query:{
          id:item.id
        }
      })
    }
  }
}
</script>

<style scoped>
.recommen-list-content{
  display: flex;
  position: relative;
  flex-wrap: wrap;
  justify-content: space-between;
}
.recommen-list-box{
  display: flex;
  flex-direction: column;
  width: 18%;
  cursor: pointer;
  margin-bottom: 20px;
}
.recommen-list-img{
  width: 100%;
  position: relative;
}
.recommen-list-img img{
  width: 100%;
  border-radius: 10px;
  box-shadow: grey 0px 0px 2px 2px;
}
.recommen-list-name{
  height: 52px;
  overflow: hidden;
}
.recommen-list-name p{
  font-size: 15px;
  cursor: pointer;
  color: #373737;
  opacity: .9;
}
.play-count{
  display: flex;
  position: absolute;
  right: 2%;
  top: 2%;
  align-items: center;
  color: white;
}
</style>