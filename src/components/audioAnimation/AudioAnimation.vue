<template>
<div>
  <div id="box">
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
</template>

<script>
  export default {
    data(){
      return{

      }
    }
  }
</script>

<style scoped>

#box div{
  display: inline-block;
  position: relative;
  width: 3px;
  height: 8px;
  background-color: rgb(243, 25, 25);
  transform-origin: bottom ;
  border-radius: 5px 5px 0 0;
}
#box div:nth-child(1){
  left: 0px;
  animation: musicWave 0.5s infinite linear both alternate;
}
#box div:nth-child(2){
  left: 1px;
  animation: musicWave 0.4s infinite linear both alternate;
}
#box div:nth-child(3){
  left: 2px;
  animation: musicWave 0.6s infinite linear both alternate;
}

@keyframes musicWave{
  0%{
    height: 5px;
  }
  100%{
    height: 15px;
  }
}
</style>
