<template>
  <div>
    <div class="title">
      <slot name="item-title"></slot>
      <!-- <p>推荐</p> -->
    </div>
  </div>
</template>

<script>
export default {
  name:'BarItem',
  data(){
    return {
    }
  },
  methods:{
  }
}
</script>

<style scoped>
.title{
  font-size: 13px;
  margin-left: 10px;
  opacity: .5;
  font-weight: 50;
}
</style>