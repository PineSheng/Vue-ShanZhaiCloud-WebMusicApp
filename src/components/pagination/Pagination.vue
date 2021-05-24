<template>
  <div class="block">
    <el-pagination
    background
    layout="prev, pager, next"
    :total="count"
    :page-size="pageSize"
    :current-page="currentPage"
    @current-change="handleCurrentChange">
    </el-pagination>
  </div>  
</template>

<script>
export default {
  name:'pagination',
  data() {
    return {
    }
  },
  props:{
    pageSize:Number,
    count:Number,
    currentPage:Number
  },
  methods:{
    handleCurrentChange(page){
      this.$emit("handleCurrentChange", page)
    }
  },
}
</script>

<style scoped>
.block{
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>