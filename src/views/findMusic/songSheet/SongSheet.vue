<template>
  <div class="song-sheet-view" v-loading="loading" element-loading-text="正在加载">
    <div class="tag">
      <div class="tag-choose" @click="allTagsAct = !allTagsAct">
        {{cat}} >
      </div>
      <div class="hot-tags">
        <span 
        v-for="(item,index) in hotTags" :key="index" 
        @click="cat = item.playlistTag.name"
        :class="{actHotTag : cat == item.playlistTag.name}"
        >{{item.playlistTag.name}}</span>
      </div>
    </div>
    <SongSheetTag :allTags="allTags" :tagKind="cat" @selectTag="selectTag" v-show="allTagsAct"/>
    <div class="song-sheet-box">
      <div class="song-sheet" v-for="(item,index) in songSheetData" :key="index" @click="seeDetails(item)">
        <div class="cover-img">
          <el-image
            :src="item.coverImgUrl"
            fit="fill"
            style="width:100%;border-radius: 10px;"
            @mouseover="currentIndex = index"
            @mouseleave="currentIndex = '-1'"
          ></el-image>
          <div class="play-count">
            <i class="el-icon-headset"></i>
            <span style="text-shadow: rgb(0 0 0) 0px 0px 2px;">{{playCount(item.playCount)}}</span>
          </div>
          <div class="publisher">
            <i class="el-icon-user"></i>
            <span :title="item.creator.nickname" style="margin-left:5px">{{item.creator.nickname}}</span>
            <el-image
              v-show="item.creator.avatarDetail"
              :src="item.creator.avatarDetail ? item.creator.avatarDetail.identityIconUrl : ''"
              fit="fill"
              style="width: 18px;margin-left:10px;margin-top:5px"
            ></el-image>
            <div               
            :class="{playIcon:currentIndex == index,playNone:currentIndex != index}">
              <img src="@/assets/img/play2.svg" style="wdith:35px;height:35px"/>
            </div>
          </div>
        </div>
        <div class="introduce">
          <span>{{item.name}}</span>
        </div>
      </div>
    </div>
    <div class="block">
      <el-pagination
      background
      layout="prev, pager, next"
      :total="songSheetCount"
      :page-size="50"
      :current-page="currentPage"
      @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import SongSheetTag from '@/components/songSheetTag/SongSheetTag.vue'
export default {
  name:'SongSheet',
  data() {
    return {
      //热门歌单分类标签
      hotTags:[],
      //所有歌单分类标签
      allTags:{
        //标签类型
        categories: {},
        //对应类型的标签
        sub: [[], [], [], [], []],
      },
      //所有歌单分类标签是否打开
      allTagsAct:false,
      //歌单请求分类参数
      cat:'全部歌单',
      //歌单数据
      songSheetData:[],
      //初始页
      currentPage:1,
      //数据条数
      songSheetCount:0,
      //数据请求偏移数量
      offset:0,
      //播放图标活跃标识
      currentIndex:'-1',
      //是否正在加载
      loading:false,
    }
  },
  components:{
    SongSheetTag
  },
  watch:{
    cat(){
      this.getSongSheetData(this.cat)
    }
  },
  created(){
    this.getSongSheetData(this.cat)
    this.getHotTagsData()
    this.getAllTagsData()
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
  methods:{
    //获取歌单数据
    getSongSheetData(cat){
      this.loading = true
      let params = {
        limit:50,
        offset:this.offset,
        cat:cat
      }
      this.$http.get('top/playlist',{params:params})
      .then(res =>{
        //console.log(res)
        this.songSheetData = res.data.playlists
        this.songSheetCount = res.data.total
        this.loading = false
      })
      .catch(err => {
        console.log(err)
        this.$message.error('歌单请求失败')
      })
    },
    //获取热门歌单分类
    getHotTagsData(){
      this.$http.get('playlist/hot')
      .then(res =>{
        this.hotTags = res.data.tags
      })
      .catch(err => {
        console.log(err)
        this.$message.error('热门歌单分类请求失败')
      })
    },
    //获取所有歌单分类
    getAllTagsData(){
      this.$http.get('playlist/catlist')
      .then(res =>{
        this.allTags.categories = res.data.categories;
        for (let tag of res.data.sub) {
          switch (tag.category) {
            case 0:
              this.allTags.sub[0].push(tag);
              break;
            case 1:
              this.allTags.sub[1].push(tag);
              break;
            case 2:
              this.allTags.sub[2].push(tag);
              break;
            case 3:
              this.allTags.sub[3].push(tag);
              break;
            case 4:
              this.allTags.sub[4].push(tag);
              break;
          }
        }
      })
    },
    //选中Tag
    selectTag(tag){
      this.allTagsAct = false
      this.cat = tag
    },
    //查看歌单详情
    seeDetails(item){
      this.$router.push({
        path: '/songSheetDetails',
        query:{
          id:item.id
        }
      })
    },
    //页码改变事件
    handleCurrentChange(currentPage){
      this.currentPage = currentPage;
      this.offset = (currentPage - 1) * 50
      this.songSheetData = []
      this.getSongSheetData()
      //console.log(this.currentPage)  //点击第几页
    },
  }
}
</script>

<style scoped>
.song-sheet-view{
  position: relative;
  height:calc(100% - 100px);
  width: 100%;
  overflow-y: auto;
  padding-right: 17px;
  padding-left: 3px;
}
.tag{
  display: flex;
  align-items: center;
  width: 100%;
}
.tag-choose{
  width: 120px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  border: 1px solid rgba(0,0,0,.2);
  border-radius: 30px;
  color: #373737;
  cursor: pointer;
}
.tag-choose:hover{
  background: #f2f2f2;
}
.hot-tags{
  display: flex;
  margin-left:auto;
  margin-right: 40px;
}
.actHotTag {
  color: #d03535;
  font-size: 13px;
  border-radius: 10px;
  cursor: pointer;
  background: #fcf4f4;
}
.hot-tags span{
  margin-right: 30px;
  font-size: 13px;
  opacity: .8;
  cursor: pointer;
}
.song-sheet-box{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
}
.song-sheet{
  margin-top: 30px;
  width: 18%;
  cursor: pointer;
}
.cover-img{
  position: relative;
  width: 100%;
}
.play-count{
  display: flex;
  position: absolute;
  align-items: center;
  top: 1%;
  right: 3%;
  color: white;
}
.playIcon{
  position: absolute;
  right:2%;
  bottom:10%;
  z-index:10;
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
.playNone{
  display: none;
}
.publisher{
  display: flex;
  position: absolute;
  align-items: center;
  width: 90%;
  bottom: 2%;
  left: 3%;
  color: white;
}
.publisher span{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  cursor: pointer;
}
.introduce{
  width: 100%;
  margin-top: 10px;
  font-size: 15px;
  cursor: pointer;
  color: #373737;
  opacity: .9;
}
.block{
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 10px;
}

/* 滚动条样式 */
.song-sheet-view::-webkit-scrollbar {
  width: 10px;
}
.song-sheet-view::-webkit-scrollbar-thumb {
  background-color: #bfbfbf;
  border-radius: 10px;
}
</style>