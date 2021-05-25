<template>
  <div>
    <div class="item" :class="{'item-select':isActive}" @mouseover="mouseOver" @mouseleave="mouseLeave" :style="actvie" @click="itemClick">
        <slot name="item-img"></slot>
        <slot name="item-span"></slot>
    </div>    
  </div>
</template>

<script>
export default {
  name:'BarItemContent',
  data(){
    return {
      actvie:'',
    }
  },
  props:{
    link:String
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.link) !== -1
    }
  },
  methods:{
    mouseOver(){
      this.actvie = 'background-color: #e6e7ea!important'
    },
    mouseLeave(){
      this.actvie = ''
    },
    itemClick(){
      if(this.link != this.$route.path){
        this.$router.push(this.link)
      }
    }
  }
}
</script>

<style scoped>
.item{
  display: flex;
  align-items: center;
  height: 56px;
}
.item img{
  width: 15px;
  height: 15px;
  margin-top: 3px;
  margin-left: 10px;
}
.item span{
  margin-left: 10px;
  font-size: 14px;
}
.item-select{
  background-color: #e6e7ea
}
</style>