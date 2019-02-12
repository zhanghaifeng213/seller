<template>
  <div>
    <el-form :inline="true" :model="addList" class="demo-form-inline">
      <p>添加新用户</p>
      <el-form-item label="用户名">
        <el-input v-model="addList.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="addList.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="userLists" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
        <template slot-scope="scope">
          <el-input :value="scope.row.username" v-if="scope.row.showEdit" v-model="scope.row[scope.column.property]"></el-input>
          <span v-else>{{scope.row.username}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="role" label="权限" width="150">
        <template slot-scope="scope">
          <span>{{scope.row.role}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="avatar" label="头像" width="120">
        <template slot-scope="scope">
          <el-upload class="avatar-uploader" action="/proxyApi/image/upload" :show-file-list="false" :on-success="handleAvatarSuccess" v-if='scope.row.showEdit' :data="imageData">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="img-wrap" v-else>
            <img :src="scope.row.avatar" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="password" label="密码" width="300">
        <template slot-scope="scope">
          <el-input :value="scope.row.password" v-if="scope.row.showEdit" v-model="scope.row[scope.column.property]" type="password"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleFinish(scope.$index, scope.row)" v-if="scope.row.showEdit">完成</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-else>编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" @click="handleCancel(scope.$index, scope.row)" v-if="scope.row.showEdit">取消</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
  name: 'main-info',
  data () {
    return {
      userLists: [],
      addList: {
        username: '',
        password: ''
      },
      imageUrl: '',
      imageData: {
        group: 'avatar',
        name: '用户头像'
      }
    }
  },
  methods: {
    ...mapActions(['handleUserReg','handleGetUserLists','handleUpdateUser','handleDeleteUser']),
    handleEdit (index, row) {
      row.showEdit = true
    },
    handleFinish (index, row) {
      const updateData = {}
      updateData.username = row.username
      updateData.password = row.password
      updateData.id = row._id
      this.handleUpdateUser(updateData).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          row.showEdit = false
          this.getUserLists()
          console.log(row.avatar)
          location.reload()
        } else {
          this.$message.error(res.data.data)
        }
      }).catch(err => {
        console.log(res)
      })
    },
    handleDelete(index, row) {
      const userId = {}
      userId.id = row._id
      console.log(userId)
    },
    handleCancel(index, row) {
      row.showEdit = false
      this.$message('已取消')
    },
    getUserLists() {
      this.handleGetUserLists().then(res => {
        res.data.data.userLists.forEach(item => {
          item.showEdit = false
          if (item.role === '0') {
            // 判断 0 或 1
            item.role = '超级管理员'
          } else if (item.role === '1') {
            item.role = '管理员'
          }
        })
        this.userLists = res.data.data.userLists
        console.log(this.userLists)
      }).catch(err => {
        console.log(err)
      }) 
    },
    onSubmit() {
      if (this.addList.username === '') {
        this.$message.error('请输入要添加的用户名')
      } else if (this.addList.password === '') {
        this.$message.error('请输入密码')
      } else {
        this.handleUserReg(this.addList).then(res => {
          if (res.data.code === 1) {
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
          } else {
            this.$message.error(res.data.data)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    handleAvatarSuccess(res, file) {
       this.imageUrl = URL.createObjectURL(file.raw)
       console.log(res)
    },
    
     beforeAvatarUpload(file) {
       console.log(file)
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M;
    },
    // uploadAvatar(file) {
    //   const formData = new FormData()
    //   formData.append('file', file.file)
    //   formData.append('file', file.file)
      
    // }
  },
  mounted() {
    this.getUserLists()
  }
}
</script>

<style>
.img-wrap {
  width: 100px;
  height: 100px;
}
.img-wrap img{
  width: 100%;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>
