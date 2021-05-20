<template>
  <div>
    <h2>专辑介绍</h2>
    <p 
    v-for="(item, index) in textFormat(description)" :key="index"
    style="text-indent: 30px;letter-spacing: 1px;line-height: 40px;opacity: 0.7;"
    >{{item}}</p>
  </div>
</template>

<script>
export default {
  name:'AlbumDetails',
  data() {
    return {}
  },
  methods: {
    textFormat(text) {
      let newText = text.split("\n");
      return newText;
    },
  },
  props:{
    description:String
  }
}
</script>

<style scoped>

</style>