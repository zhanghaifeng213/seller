<template>
  <div class="">
    <div>
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="actionUrl"
        name="file"
        :limit="1"
        :data="extData"
        :auto-upload="false"
        :on-success="handleSuccess">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>


    <el-row v-if="list.length > 0">
      <el-col :span="4" v-for="(item, index) in list" :key="index" class="card-box-outer">
        <el-card shadow="hover" class="card-box">
          <!-- 卡片 -->
          <img :src="item.url" class="image" />
          <div style="padding: 14px;">
            <span>{{item.name}}</span>
            <div class="bottom clearfix">
              <!-- <time class="time">{{ new Date() }}</time> -->
              <!-- <el-button type="text" class="button">操作按钮</el-button> -->
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div v-else>暂无数据</div>
  </div>
</template>

<script>

import http from '@/libs/httpRequest'

export default {
  props: {
    group: {
      type: String,
      value: 'default'
    },
    pageNum: {
      type: Number,
      value: 1
    },
    pageSize: {
      type: Number,
      value: 10
    }
  },
  data() {
    return {
      actionUrl: `${process.env.NODE_ENV !== 'production' ? '/proxyApi/' : process.env.API_ROOT}/image/upload`,
      list: [],
      extData: {
        group: this.group,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        name: '未命名'
      },
      fileList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    refresh() {
      this.getList();
    },
    getList() {
      http({
        url: http.adornUrl(`/image/query?group=${this.group}&pageNum=${this.pageNum}&pageSize=${this.pageSize}`),
        method: 'get',
        data: {}
      }).then(res => {
        this.list = res.data.data.list || [];
      })
    },

    submitUpload() {
      this.$refs.upload.submit();
    },
    // 上传成功
    handleSuccess() {
      this.refresh();
      this.fileList = [];
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  },
};
</script>

<style lang="less" scoped>
.card-box-outer {
  min-width: 150px;
}
.card-box {
  transform: scale(0.9);

  .image {
    width: 100%;
  }
}

.el-card__body {
  padding: 0;
}
</style>

