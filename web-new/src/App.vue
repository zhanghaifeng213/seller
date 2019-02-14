<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: "App",
  sockets: {
    connect: function() {
      console.log("socket connected");
    },
    customEmit: function(data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    }
  }
};
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>

