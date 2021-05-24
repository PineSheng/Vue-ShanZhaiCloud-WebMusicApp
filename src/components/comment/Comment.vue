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
    <div v-for="(item,index) in comments.hotComments" :key="index">
      <!-- {{item.beReplied}} -->
      <div class="comments">
        <img :src="item.user.avatarUrl"/>
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
    <div v-for="(item,index) in comments.comments" :key="index + '-only'">
      <div class="comments">
        <img :src="item.user.avatarUrl" />
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
    <Pagination 
    :pageSize="20"
    :count="count"
    :currentPage="currentPage"
    @handleCurrentChange="handleCurrentChange"
    />    
  </div>
</template>

<script>
import Pagination from '@/components/pagination/Pagination.vue'
export default {
  name:'comment',
  data() {
    return {
      textarea:'',
    }
  },
  components:{
    Pagination
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
  props:{
    //评论
    comments:Object,
    //初始页
    currentPage:Number,
    //评论数量
    count:Number,
  },
  methods:{
    //页码改变事件
    handleCurrentChange(page){
      this.$emit("handleCurrentChange", page)
      //console.log(page)
    },    
  }  
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