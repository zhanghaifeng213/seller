<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {}
</script>
<style lang="less">
.size {
  width: 100%;
  height: 100%;
}
html,
body {
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
</style>