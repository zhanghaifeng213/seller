<template>
  <div class="main">
    <main-navbar />
    <main-sidebar />
    <div class="wrap-content">
      <main-content />
       
    </div>
   
    <div @click="logout">logout</div>

   
  </div>
</template>
<script>
import MainNavbar from "./main-navbar";
import MainSidebar from "./main-sidebar";
import MainContent from "./main-content";
export default {
  name: "main-index",
  components: {
    MainNavbar,
    MainSidebar,
    MainContent
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(res => {
        this.$router.push({ path: "/" });
      });
    }
  },
  mouted() {}
};
</script>

<style lang="less" scoped>
.main {
  height: 100vh;
  .wrap-content {
    padding-top: 50px;
    margin-left: 230px;
    min-height: 100%;
    background: #f1f4f5;
    width: calc(100vw - 230px);
    height: calc(100vh - 50px);
    padding: 65px 15px 15px 15px;
  }
}
</style>
