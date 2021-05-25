<template>
  <div class="official-List">
    <div style="display:flex;margin-bottom: 50px;" v-for="(item,index) in officialListData" :key="index">
      <div>
        <el-image
          :src="item.coverImgUrl"
          fit="fill"
          style="width:180px;border-radius: 10px;"
        ></el-image>
      </div>
      <div style="width:70%">
        <div class="tracks" v-for="(song,index) in item.tracks" :key="index">
          <div style="width:33%">
            <span style="color:rgb(215, 53, 53);padding-left:20px">{{index + 1}}</span>
          </div>
          <span>{{song.first}}</span>
          <span>{{song.second}}</span>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
export default {
  name:'OfficialList',
  data() {
    return {
      
    }
  },
  props:{
    //官方榜数据
    officialListData:Array
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
</style>