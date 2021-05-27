<template>
  <div class="official-List">
    <div style="display:flex;margin-bottom: 50px;cursor: pointer;" v-for="(item,index) in officialListData" :key="index">
      <div style="position: relative">
        <el-image
          :src="item.coverImgUrl"
          fit="fill"
          style="width:180px;border-radius: 10px;"
          @click="seeAll(item.id)"
          @mouseover="currentIndex = index" @mouseleave="currentIndex = '-1'"
        ></el-image>
        <div               
        :class="{'play-icon':currentIndex == index,'play-none':currentIndex != index}">
        <img src="@/assets/img/play2.svg" style="wdith:50px;height:50px"/>
      </div>
      </div>
      <div style="width:70%">
        <div class="tracks" v-for="(song,index) in item.tracks" :key="index">
          <div style="width:33%">
            <span style="color:rgb(215, 53, 53);padding-left:20px">{{index + 1}}</span>
          </div>
          <span>{{song.first}}</span>
          <span>{{song.second}}</span>
        </div>
        <div style="margin-left:50px;cursor: pointer;" @click="seeAll(item.id)">查看全部 ></div>
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  name:'OfficialList',
  data() {
    return {
      currentIndex:'-1'
    }
  },
  props:{
    //官方榜数据
    officialListData:Array
  },
  methods: {
    seeAll(id){
      //console.log(id)
      this.$router.push({
        path: '/songSheetDetails',
        query:{
          id:id
        }
      })
    }
  },
}
</script>

<style scoped>
.tracks{
  display: flex;
  margin-left: 50px;
  width: 100%;
  height: 60px;
  line-height: 60px;
}
.tracks span{
  width: 33%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
}
.tracks:hover{
  background: #f2f2f2;
}
.play-icon{
  position: absolute;
  left: 50%; 
  top: 50%;
  transform: translate(-50%, -50%);
  animation-name: play;
  animation-duration: 0.8s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
}

@keyframes play {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.play-none{
  display: none;
}
</style>