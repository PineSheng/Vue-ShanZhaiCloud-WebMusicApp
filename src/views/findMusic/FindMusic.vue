<template>
  <div class="find-music">
    <!-- 导航栏菜单 -->
    <div class="navigation-bar">
      <el-menu 
      :default-active="this.$route.path" 
      class="el-menu-demo" 
      mode="horizontal" 
      @select="handleSelect"
      text-color="#909399"
      active-text-color="#ec4141"
      :router="true"
      >
        <el-menu-item index="/findMusic/recommend">个性推荐</el-menu-item>
        <el-menu-item index="/findMusic/songSheet">歌单</el-menu-item>
        <el-menu-item index="/findMusic/rankingList">排行榜</el-menu-item>
        <el-menu-item index="/findMusic/singer">歌手</el-menu-item>
        <el-menu-item index="/findMusic/latestMusic">最新音乐</el-menu-item>
    </el-menu>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods:{
    handleSelect(key,keyPath){
      //console.log(key,keyPath,this.$route.path)
    },
  }
}
//#ec4141 #909399
</script>

<style scoped>
.find-music{
  padding:20px;
}

.navigation-bar{
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  width: 100%;
}
</style>