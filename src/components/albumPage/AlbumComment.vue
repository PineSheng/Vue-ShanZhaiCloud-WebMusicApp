<template>
  <div>
    <div style="margin-top:30px;width:95%;position: relative;height: 150px;">
      <el-input
        style="width:100%"
        type="textarea"
        :rows="4"
        placeholder="请输入内容"
        maxlength="140"
        show-word-limit
        v-model="textarea">
      </el-input>
      <div class="or-btn">评论</div>
    </div>
    <div style="font-weight: 600;">
      <p>精彩评论</p>
    </div>
    <div v-for="(item,index) in hotComments" :key="index">
      <div class="comments">
        <img :src="item.user.avatarUrl" alt="">
        <div style="margin-top:5px;margin-left:10px">
          <span style="color: rgb(77, 153, 222);cursor: pointer;">{{item.user.nickname}}:</span>
          <span>{{item.content}}</span>
          <div style="padding: 15px;background-color: rgb(241, 241, 244);margin-top:20px" v-if="item.beReplied.length > 0">
            <span style="color: rgb(77, 153, 222);cursor: pointer;">{{item.beReplied[0].user.nickname}}:</span>
            <span>{{item.beReplied[0].content}}</span>
          </div>
          <div style="margin-top:10px;font-size: 13px;color: gray;">
            {{formatDate(item.time)}}
          </div>
        </div>
      </div>
      <div class="comment-operate">
        <img src="@/assets/img/praise.svg" class="praise-img">
        <span style="margin-right: 20px;">{{item.likedCount}}</span>
        <img src="@/assets/img/comment.svg">
      </div>
    </div>
    <div class="more">更多精彩评论</div>
    <div style="font-weight: 600;">
      <p>最新评论</p>
    </div>
    <div v-for="(item,index) in comments" :key="index + '-only'">
      <div class="comments">
        <img :src="item.user.avatarUrl" alt="">
        <div style="margin-top:5px;margin-left:10px">
          <span style="color: rgb(77, 153, 222);cursor: pointer;">{{item.user.nickname}}:</span>
          <span>{{item.content}}</span>
          <div style="padding: 15px;background-color: rgb(241, 241, 244);margin-top:20px" v-if="item.beReplied.length > 0">
            <span style="color: rgb(77, 153, 222);cursor: pointer;">{{item.beReplied[0].user.nickname}}:</span>
            <span>{{item.beReplied[0].content}}</span>
          </div>
          <div style="margin-top:10px;font-size: 13px;color: gray;">
            {{formatDate(item.time)}}
          </div>
        </div>
      </div>
      <div class="comment-operate">
        <img src="@/assets/img/praise.svg" class="praise-img">
        <span style="margin-right: 20px;">{{item.likedCount}}</span>
        <img src="@/assets/img/comment.svg">
      </div>
    </div>
    <div class="block">
      <el-pagination
      background
      layout="prev, pager, next"
      :total="count"
      :page-size="20"
      :current-page="currentPage"
      @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name:'AlbumComment',
  data() {
    return {
      textarea:'',
      //参数
      albumId:this.$route.query.albumId,
      //热门评论
      hotComments:[],
      //最新评论
      comments:[],
      //初始页
      currentPage:1,
      //数据条数
      count:0,
      //数据请求偏移数量
      offset:0,
      time:0,
    }
  },
  created(){
    this.getAlbumCommentData()
  },
  computed:{
    //时间戳转时间
    formatDate() {
      return (timestamp) => {
        let time = new Date(timestamp)
        let year = time.getFullYear()
        const month = (time.getMonth() + 1).toString().padStart(2, '0')
        const date = (time.getDate()).toString().padStart(2, '0')
        const hours = (time.getHours()).toString().padStart(2, '0')
        const minute = (time.getMinutes()).toString().padStart(2, '0')
        const second = (time.getSeconds()).toString().padStart(2, '0')
        return year + '-' + month + '-' + date + ' ' + hours + ':' + minute + ':' + second
      }
    }
  },
  methods: {
    //获取专辑评论
    getAlbumCommentData(){
      let params = {
        id:this.albumId,
        limit:15,
        offset:this.offset,
      }
      this.$http.get('comment/album',{params})
      .then(res =>{
        //console.log(res)
        this.hotComments = res.data.hotComments
        this.comments = res.data.comments
        this.count = res.data.total
        this.time = this.comments[14].time
        this.$emit('sendCount',this.count)
      })
    },
    //获取分页评论
    getAlbumPagingData(){
      let params = {
        id:this.albumId,
        limit:20,
        offset:this.offset,
        time:this.time
      }
      this.$http.get('comment/album',{params})
      .then(res =>{
        //console.log(res)
        this.comments = res.data.comments
      })
    },
    //页码改变事件
    handleCurrentChange(currentPage){
      this.currentPage = currentPage;
      this.offset = (currentPage - 1) * 20
      this.getAlbumPagingData()
      //console.log(this.currentPage)  //点击第几页
    },
  },
}
</script>

<style scoped>
.or-btn{
  display: inline-block;
  border-radius: 20px;
  border: 1px solid #d8d8d8;
  padding: 5px 15px;
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 0;
}
.or-btn:hover{
  background: #f2f2f2;
}
.comments{
  display: flex;
  width: 90%;
  padding-top: 10px;
}
.comments img{
  display: inline;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  cursor: pointer;
}
.comment-operate{
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(240, 240, 242);
  width: 90%;
}
.comment-operate img{
  width: 23px;
  height: 23px;
}
.praise-img{
  margin-left: auto;
}
.more{
  display: inline-block;
  margin-left: 40%;
  margin-top: 3%;
  transform: translateX(-50%);
  border-radius: 20px;
  border: 1px solid rgb(216, 216, 216);
  padding: 5px 15px;
  cursor: pointer;
}
.block{
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>