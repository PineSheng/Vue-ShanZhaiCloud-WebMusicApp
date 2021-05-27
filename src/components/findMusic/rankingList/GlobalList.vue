<template>
  <div class="global-list">
    <div 
      style="position: relative;width:100%;cursor: pointer;margin-bottom:30px"
      v-for="(item,index) in globalListData" :key="index"
      @click="seeAll(item.id)" 
      >
      <div style="width:100%">
        <el-image
          :src="item.coverImgUrl"
          fit="fill"
          style="width:100%;border-radius: 10px;"
          @mouseover="currentIndex = index" @mouseleave="currentIndex = '-1'"
        ></el-image>
      </div>
      <div style="margin-top:10px;font-size: 15px;cursor: pointer;">
        <span>{{item.name}}</span>
      </div>
      <div class="play-count">
        <i class="el-icon-headset"></i>
        {{playCount(item.playCount)}}
      </div>
      <div               
        :class="{'play-icon':currentIndex == index,'play-none':currentIndex != index}">
        <img src="@/assets/img/play2.svg" style="wdith:35px;height:35px"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'GlobalList',
  data() {
    return {
      currentIndex:'-1'
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
  props:{
    globalListData:Array
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
.global-list{
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5,1fr);
  -moz-column-gap: 40px;
  column-gap: 40px;
}
.play-count{
  position: absolute;
  color: #ffffff;
  top: 1%;
  right: 2%;
}
.play-icon{
  position: absolute;
  right:4%;
  bottom:16%;
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