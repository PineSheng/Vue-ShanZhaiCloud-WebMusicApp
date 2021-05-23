<template>
  <div class="song-sheet-tag">
    <span>SongSheetTag</span>
  </div>
</template>

<script>
export default {
  name:'SongSheetTag',
  data() {
    return {
      
    }
  },
}
</script>

<style scoped>
.song-sheet-tag{
  position: absolute;
  margin-top: 10px;
  width: 40%;
  z-index: 100;
  background: #fff;
  padding-top: 20px;
  border-radius: 10px;
  box-shadow: 0 0 2px 2px rgb(0 0 0 / 10%);
}
</style>