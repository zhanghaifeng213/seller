<template>
  <div class="page-metarial">
    <h6 class="page-title">素材管理</h6>
    <div class="usage">
      素材管理模块主要用于管理本站中上传的图片。使用方法:
      <p>1. 在本素材库找到目标图片。</p>
      <p>2. 鼠标移入图片上方会出现复制和删除按钮，点击复制链接按钮可复制目标图片URL地址。</p>
      <p>3. 在需要用到的地方填写得到的图片URL地址即可。</p>
      <p class="warning-text">说明: 图片删除时为永久删除，请确认无误后再操作!</p>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="未分组" name="default">
        <gallery-list group="default" :pageNum="1" :pageSize="15"></gallery-list>
      </el-tab-pane>

      <el-tab-pane label="菜品展示" name="menu">
        <gallery-list group="menu" :pageNum="1" :pageSize="15"></gallery-list>
      </el-tab-pane>

      <el-tab-pane label="用户头像" name="avatar">
        <gallery-list group="avatar" :pageNum="1" :pageSize="15"></gallery-list>
      </el-tab-pane>
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
    margin-bottom: 10px;
  }

  .usage {
    color: #999;
    font-size: 14px;
    line-height: 160%;
    padding-bottom: 20px;
    p {
      padding: 0;
      margin: 0;
    }
    .warning-text {
      font-size: 12px;
      color: #f55b5b;
    }
  }
}

</style>

