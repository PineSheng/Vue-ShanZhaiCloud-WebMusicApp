<template>
  <div class="ranking-list">
    <div class="official-list">
      <div>
        <h2>官方榜</h2>
      </div>
    </div>
    <OfficialList :officialListData="officialListData" />
    <div class="global-list">
      <div>
        <h2>全球榜</h2>
      </div>
    </div>
    <GlobalList :globalListData="globalListData" />
  </div>
</template>

<script>
import GlobalList from '@/components/findMusic/rankingList/GlobalList.vue'
import OfficialList from '@/components/findMusic/rankingList/OfficialList.vue'
export default {
  name:'RankingList',
  data() {
    return {
      //加载状态
      loading:false,
      //官方榜数据
      officialListData:[],
      //全球榜数据
      globalListData:[],
    }
  },
  components:{
    OfficialList,
    GlobalList
  },
  created(){
    this.getRankingListData()
  },
  methods: {
    //获取排行榜信息
    getRankingListData(){
      this.loading = true
      this.$http.get('toplist/detail')
      .then(res =>{
        //console.log(res)
        this.officialListData = res.data.list.slice(0, 4)
        this.globalListData = res.data.list.slice(4)
        console.log(this.globalListData)
        this.loading = false
      })
      .catch(err => {
        console.log(err)
        this.$message.error('排行榜数据请求失败,请重试')
      })
    },
  },
}
</script>

<style scoped>
.ranking-list{
  height:calc(100% - 100px);
  overflow-y: auto;
  width: 100%;
  padding-right: 17px;
  padding-left: 3px;
}

/* 滚动条样式 */
.ranking-list::-webkit-scrollbar {
  width: 10px;
}
.ranking-list::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 10px;
}
</style>