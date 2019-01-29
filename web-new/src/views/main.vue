<template>
  <div>
    <main-navbar />
    <main-sidebar />
    <div class="wrap-content">
      <main-content />
    </div>
    <router-view></router-view>
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
  }
};
</script>

<style>
.wrap-content {
  padding-top: 50px;
  margin-left: 230px;
  min-height: 100%;
  background: #f1f4f5;
}
</style>
