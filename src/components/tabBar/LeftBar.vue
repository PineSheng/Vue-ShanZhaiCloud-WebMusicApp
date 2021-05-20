<template>
  <div id="bar">
    <slot></slot>
  </div>
</template>

<script>


export default {
  name: 'leftbar',
}
</script>

<style scoped>
#bar{
  height: 100%;
  width: 20%;
  border-right: 1px solid #e6e6e6;
}
</style>
