<template>
  <div class="page-metarial">
    <h6 class="page-title">素材管理</h6>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未分组" name="default"><gallery-list group="default"></gallery-list></el-tab-pane>
      <el-tab-pane label="菜品分组" name="menu"><gallery-list group="menu"></gallery-list></el-tab-pane>
      <el-tab-pane label="用户头像" name="avatar"><gallery-list group="avatar"></gallery-list></el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
// import { mapActions } from "vuex";
import galleryList from './gallery-list.vue'
export default {
  name: "main-gallery",
  data() {
    return {
      activeName: 'default'
    }
  },
  components: { galleryList },
  methods: {
    handleClick() {}
  }
};
</script>

<style lang="less" scoped>
.page-metarial {
  .el-tabs__content {
    position: absolute !important;
    overflow: scroll;
  }

  .page-title {
    margin-bottom: 20px;
  }
}

</style>

