<template>
  <div class="gallery-list">
    <div class="viewer-box" v-viewer="vieverOptions">
      <img v-for="src in prevImages" :src="src" :key="src">
    </div>

    <el-row>
      <!-- 图片上传 -->
      <el-col :span="3" class="card-box-outer">
        <div class="card-box upload-box">
           <div class="avatar-box">
             <el-upload
              :action="actionUrl"
              :data="extData"
              list-type="picture-card"
              :show-file-list="false"
              :on-error="handleError"
              :on-success="handleSuccess"
              :before-upload="beforeUpload">
              <i class="el-icon-plus"></i>
            </el-upload>
           </div>
        </div>
      </el-col>

      <!-- 图片卡片列表 -->
      <el-col :span="3" v-for="(item, index) in list" :key="item.id" class="card-box-outer">
        <el-card shadow="hover" class="card-box">
          <div class="avatar-box" :title="item.url"
            :style="{ background: 'url('+ item.url +') no-repeat center', backgroundSize: 'contain' }"></div>
          <div class="desc-box">
            <el-button size="small" type="default" icon="el-icon-picture-outline" @click.prevent="previewImage(item)">图片预览</el-button>
            <el-button size="small" type="primary" icon="el-icon-share"
              v-clipboard:copy="item.url"
              v-clipboard:success="onCopySuccess"
              v-clipboard:error="onCopyError">复制链接</el-button>
            <el-button size="small" type="danger" icon="el-icon-delete" @click.prevent="delImage(item, index)">删除图片</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div class="pagenation-bar">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="psize"
        :current-page.sync="pnumber"
        layout="prev, pager, next"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import http from "@/libs/httpRequest";

export default {
  props: {
    group: {
      type: String,
      value: "default"
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
      actionUrl: http.adornUrl('/image/upload'),
      list: [],
      extData: {
        group: this.group,
        name: "未命名"
      },
      totalCount: 0,
      pnumber: this.pageNum,
      psize: this.pageSize,
      vieverOptions: {
        "inline": false,
        "button": true,
        "navbar": false,
        "title": true,
        "toolbar": true,
        "tooltip": true,
        "movable": true,
        "zoomable": true,
        "rotatable": true,
        "scalable": true,
        "transition": false,
        "fullscreen": false,
        "keyboard": true,
        "url": "data-source"
      },
      prevImages: ['http://116.62.147.91:3030/upload/05c15d5feb140f0c5f1bb8502b86d6c4.png']
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 获取列表
    getList() {
      http({
        url: http.adornUrl(`/image/query?group=${this.group}&pageNum=${this.pnumber}&pageSize=${this.psize}`),
        method: "get",
      }).then(res => {
        if (res.data.data.list.length > 0) {
          this.list = res.data.data.list;
          this.totalCount = res.data.data.totalCount;
        } else {
          this.list = [];
        }
      });
    },
    // 删除
    delImage(item, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.operateDelete(item, index);
      })
    },
    // 图片预览
    previewImage(item) {
      console.log(item);
      this.prevImages = [item.url];
      setTimeout(() => {
        const viewer = this.$el.querySelector('.viewer-box').$viewer;
        viewer.show();
      }, 300);
    },
    operateDelete(item, index) {
      http({
        url: http.adornUrl(`/image/delete`),
        method: "POST",
        data: { id: item.id }
      }).then(res => {
        if (res.data && +res.data.code === 1) {
          if (this.list.length === 1) {
            this.pnumber = this.pnumber - 1 || 1;
          }
          this.getList();
          this.$message.success(res.data.msg);
        } else {
          this.$message.success(res.data.msg);
        }
      });
    },
    // 复制路径
    onCopySuccess() {
      this.$message.success('图片URL复制成功');
    },
    onCopyError() {
      this.$message.error('复制失败, 请刷新页面后重试');
    },


    // 上传成功
    handleSuccess(res, file) {
      this.$message.success('上传成功');
      this.pnumber = 1;
      this.getList();
    },
    handleError() {
      this.$message.success('上传失败');
    },
    // 上传校验
    beforeUpload(file) {
      const checkFormat = /((jpe?g)|(png)|(webp))$/i.test(file.type);
      const isLt2M = file.size / 1024 / 1024 < 1;

      if (!checkFormat) {
        this.$message.error('上传头像图片只能是 jpg/png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
      }
      return checkFormat && isLt2M;
    },

    // 分页切换
    handleCurrentChange(page){
      this.pnumber = page;
      this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
.viewer-box {
  display: none;
}
.card-box-outer {
  min-width: 150px;
}
.card-box {
  position: relative;
  transform: scale(0.9);
  &:hover {
    .desc-box {
      opacity: 1;
    }
  }
  &.upload-box {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    .avatar-box {
      position: relative;
      & > div {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .avatar-box {
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
    cursor: pointer;

    .image {
      width: 100%;
    }
  }
  .desc-box {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    background: rgba(0, 0, 0, 0.5);
    transition: all .6s;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    button {
      margin: 8px;
      outline: none;
    }
  }
}

.pagenation-bar {
  padding-top: 30px;
  display: flex;
  justify-content: center;
}

.el-card__body {
  padding: 0 !important;
}
</style>

