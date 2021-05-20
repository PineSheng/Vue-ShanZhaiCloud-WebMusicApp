<template>
  <div id="heads">
    <img class="logo" src="../../assets/img/logo2.svg" alt=""/>
    <h2 class="website-title">余音缭绕</h2>
    <div id="back">
      <img src="../../assets/img/left-arrow.svg" alt="" @click="$router.go(-1)">
    </div>
    <div class="heads-input">
      <!-- <input type="text" placeholder="请输入歌曲名或歌手名"> -->
      <el-input placeholder="请输入歌曲名或歌手名" v-model="searchContent"  @click.stop.native="inputFocus"  @keyup.enter.native="search" @input="userInput">
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <SearchSuggertion @clickSearchJump="closeDefaultSugger" v-show="searchSuggestions" />
      <SearchInputSuggertion 
      :searchContent="searchContent" 
      :searchContentData="searchContentData" 
      v-show="isInputSearch && searchContent != ''"
      @closeInputSearch="closeInputSearch"
      />
    </div>
    <div class="login">
      <img src="../../assets/img/user.svg" alt="">
      <span>{{userLoginState}}</span>
    </div>
  </div>
</template>

<script>
import SearchSuggertion from '../searchSuggertion/searchSuggertion'
import SearchInputSuggertion from '../searchInputSuggertion/SearchInputSuggertion'
export default {
  name:'heads',
  data() {
    return {
      userLoginState:'未登录',
      searchSuggestions:false,//默认搜索建议框状态
      isInputSearch:false, //用户输入后搜索建议框状态
      searchContent:'',    //输入框内容
      searchContentData:'', //输入框内容搜索数据
    }
  },
  components:{
    SearchSuggertion,
    SearchInputSuggertion
  },
  methods:{
    login(){
      let data = {
        phone:'17607474820',
        password:'qq648166871'
      }
      this.$http.post('login/cellphone',data).then(res =>{
        console.log(res)
      })
    },
    //回车搜索
    search(){
      let searchWord = this.searchContent
      if(this.$route.query.searchWord != searchWord && this.searchContent != ''){
        this.$router.push({
          path: '/searchPage/searchBySong',
          query:{
            searchWord
          }
        })
        this.isInputSearch = false
      }
    },
    //关闭搜索框
    closeDefaultSugger(){
      this.searchSuggestions = false
      this.isInputSearch = false
    },
    //关闭输入搜索框
    closeInputSearch(){
      this.isInputSearch = false
    },
    //输入框点击聚焦事件
    inputFocus(){
      if(this.searchContent != ''){
        this.searchSuggestions = false
        this.isInputSearch = true
      }else{
        this.searchSuggestions = true
        this.isInputSearch = false
      }
    },
    //根据用户输入获取搜索建议
    userInput(){
      let params = {
        keywords:this.searchContent,
      }
      this.$http.get('search/suggest',{params})
      .then(res =>{
        this.searchContentData = res.data.result
      })
      .catch(err => {
        console.log(err)
        this.$message.error('搜索建议请求失败')
      })
      //输入框有输入就显示搜索建议 没有内容就显示默认搜索建议框
      this.searchContent != '' ? (this.isInputSearch = true,this.searchSuggestions = false):(this.searchSuggestions = true)
    }
  }
}
</script>

<style scoped>
#heads{
  height: 60px;
  width: 100%;
  background-color: #c62f2f;
  display: flex;
  align-items: center;
}
.logo{
  height: 40px;
  width: 40px;
  margin-left: 40px;
}
.website-title{
  color: #fff;
}
#back{
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  margin-left: 40px;
  color: #fff;
  background: rgba(77,71,71,.1);
  border-radius: 50%;
}
#back img{
  width: 13px;
  height: 13px;
}
.heads-input{
  margin-left: 40px;
  font-size: 12px;
}
.el-input__icon{
  line-height: 25px;
} 

.login{
  position: absolute;
  right: 5%;
  color: #fff;
  display: flex;
  align-items: center;
}
.login img{
  width: 40px;
  height: 40px;
  background: rgba(77,71,71,.1);
  border-radius: 50%;
}
.login span{
  margin-left: 10px;
  font-weight: 500;
  font-size: 15px;
}
</style>