<template>
  <div class="song-sheet-tag">
    <div class="all-song-sheet">
      <span style="margin-left:30px;cursor: pointer" @click="changeTag('全部歌单')" :class="{actTag:tagKind == '全部歌单'}" >全部歌单</span>
    </div>
    <div class="language" v-for="(item,index) in  allTags.sub" :key="index">
      <div class="type-title">
        <img src="@/assets/img/internet.svg"/>
        <span style="margin-left:5px">{{allTags.categories[index]}}</span>
      </div>
      <div class="song-sheet-type">
        <div class="label" v-for="(tag,index) in item" :key="index">
            <span :class="{actTag:item.name == tagKind}" style="cursor: pointer;" @click="changeTag(tag.name)">{{tag.name}}</span>
            <span style="color:red;font-size: 1px;" v-if="tag.hot == true">HOT</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'SongSheetTag',
  data() {
    return {
    }
  },
  props:{
    //当前标签
    tagKind:String,
    //所有标签
    allTags:Object
  },
  methods:{
    changeTag(tag){
      this.$emit('selectTag',tag)
    }
  },
}
</script>

<style scoped>
.song-sheet-tag{
  position: absolute;
  margin-top: 10px;
  width: 70%;
  z-index: 100;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 2px 2px rgb(0 0 0 / 10%);
}
.all-song-sheet{
  height: 70px;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid  #dcdfe6;
  margin-bottom: 24px;
}
.language{
  display: flex;
  padding-left:20px;
  padding-bottom: 20px;
  width: 95%;
}
.type-title{
  display: flex;
  align-items: center;
  height: 40px;
  width: 100px;
}
.type-title img{
  width: 30px;
  height: 30px;
}
.song-sheet-type{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  line-height: 40px;
  margin-left: 20px;
  font-size: 14px; 
}
.label{
  width: 16.5%;
}
.actTag {
  color: #d03535;
  padding: 5px 15px;
  border-radius: 20px;
  background: #fcf4f4;
}

</style>