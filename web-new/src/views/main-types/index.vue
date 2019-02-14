<template>
  <div>
    <el-form :inline="true" :model="addList" class="demo-form-inline">
      <el-form-item label="添加类别">
        <el-input v-model="addList.name" placeholder="添加类别"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="addList.desc" placeholder="描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="menuList" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="name" label="分类名" width="180">
        <template slot-scope="scope">
          <el-input :value="scope.row.name" v-if="scope.row.showEdit" v-model="scope.row[scope.column.property]"></el-input>
          <span v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="desc" label="描述">
        <template slot-scope="scope">
          <el-input :value="scope.row.desc" v-if="scope.row.showEdit" v-model="scope.row[scope.column.property]"></el-input>
          <span v-else>{{scope.row.desc}}</span>
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
import { mapActions } from "vuex";
export default {
  name: 'main-types',
  data() {
    return {
      addList:{
        name: '',
        desc: ''
      },
      menuList:[{name:'小红',desc:"小绿",showEdit: false}]
    }
  },
  methods: {
    ...mapActions(["handleAddTypesList", 'handleDeleteType','handleUpdataType']),
    handleEdit(index, row) {
      row.showEdit = true
    },
    handleFinish(index, row) {
      if (row.name === '') {
        this.$message.error('请输入分类名称')
        return
      } else {
        const typedata = {}
        typedata.id = row.id
        typedata.name = row.name
        if (row.desc !== '暂无描述') {
          typedata.desc = row.desc
        }
        this.handleUpdataType(typedata).then(res => {
          console.log(res)
          if (res.data.code === 1) {
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.getTypesInfo()
          } else if (res.data.code === 0) {
            this.$message.error(res.data.errMsg)
          } else if (res.data.code === -1) {
            this.$message.error(res.data.errMsg)
          }
        })
        row.showEdit = false
      }
    },
    handleDelete(index, row) {
      this.$confirm(`是否删除 "${row.name}" 这一分类`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDeleteType(row.id).then(res => {
          if (res.data.code === 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getTypesInfo()
          } else {
            this.$message({
              message: '警告哦，这是一条警告消息',
              type: 'warning'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })       
      })
    },
    handleCancel(index, row) {
      row.showEdit = false
      this.$message('已取消');
    },
    addTypesList() {
      if (!this.addList.name) {
        this.$message.error('请输入分类名')
        return
      }
      this.handleAddTypesList(this.addList)
      .then(res => {
        if (res.data.code === 1) {
          this.$message({
            message: "添加成功",
            type: "success"
          })

          // 添加成功后重新请求一次内容
          this.getTypesInfo()
        } else if (res.data.code === 0) {
          this.$message.error(res.data.errMsg)
        } else if (res.data.code === -1) {
          this.$message.error(res.data.errMsg)
        }
      }).catch(err => {
        console.log(err.response)
      })
    },
    onSubmit() {
      this.addTypesList()
    },
    getTypesInfo(){
      this.$store.dispatch('handleGetTypeInfo').then(res => {
        res.list.forEach(item => {
          item.showEdit = false
        })
        this.menuList = res.list
      }).catch(err => {
        console.log(err.response)
      })
    }
  },
  mounted() {
    this.getTypesInfo()
  }
}
</script>

<style>
</style>
