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
          <el-input :value="scope.row.role" v-if="scope.row.showEdit" v-model="scope.row[scope.column.property]"></el-input>
          <span v-else>{{scope.row.role==0?'超级管理员':'普通管理员'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="avatar" label="头像" width="300">
        <template slot-scope="scope">
          <el-input :value="scope.row.avatar" v-if="scope.row.showEdit" v-model="scope.row[scope.column.property]"></el-input>
          <div class="img-wrap" v-else>
            <img :src="scope.row.avatar" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="password" label="密码" width="150">
        <template slot-scope="scope">
          <el-input :value="scope.row.password" v-if="scope.row.showEdit" v-model="scope.row[scope.column.property]" type="password"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" :disabled="scope.row.role==0" @click="handleFinish(scope.$index, scope.row)" v-if="scope.row.showEdit">完成</el-button>
          <el-button size="mini" :disabled="scope.row.role==0" @click="handleEdit(scope.$index, scope.row)" v-else>编辑</el-button>
          <el-button size="mini" :disabled="scope.row.role==0" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "main-info",
  data() {
    return {
      userLists: [],
      addList: {
        username: "",
        password: ""
      }
    };
  },
  computed: {},
  methods: {
    ...mapActions(["handleUserReg", "handleGetUserLists", "handleUpdateUser"]),
    handleEdit(index, row) {
      row.showEdit = true;
    },
    handleFinish(index, row) {
      const updateData = {};
      updateData.username = row.username;
      updateData.password = row.password;
      updateData.id = row._id;
      this.handleUpdateUser(updateData)
        .then(res => {
          if (res.data.code === 1) {
            this.$message({
              type: "success",
              message: "添加成功!"
            });
            row.showEdit = false;
          } else {
            this.$message.error(res.data.data);
          }
        })
        .catch(err => {
          console.log(res);
        });
    },
    getUserLists() {
      this.handleGetUserLists()
        .then(res => {
          res.data.data.userLists.forEach(item => {
            item.showEdit = false;
            if (item.avatar.indexOf("http://116.62.147.91:3030") === -1) {
              item.avatar = process.env.API_ROOT + item.avatar;
            }
            // if (item.role === "0") {
            //   item.role = "超级管理员";
            // } else if (item.role === "1") {
            //   item.role = "管理员";
            // }
          });
          this.userLists = res.data.data.userLists;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onSubmit() {
      if (this.addList.username === "") {
        this.$message.error("请输入要添加的用户名");
      } else if (this.addList.password === "") {
        this.$message.error("请输入密码");
      } else {
        this.handleUserReg(this.addList)
          .then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
            } else {
              this.$message.error(res.data.data);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  mounted() {
    this.getUserLists();
  }
};
</script>

<style>
.img-wrap {
  width: 100px;
  height: 100px;
  margin: 0 auto;
}
.img-wrap img {
  width: 100%;
}
</style>
