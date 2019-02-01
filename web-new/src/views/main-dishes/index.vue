<template>
  <div>
    <p class="h3">main-dishes</p>{{dishesForm.cid}}
    <el-button @click="dialogVisible = true">添加菜品</el-button>
    <DishesEdit
      :dialogVisible="dialogVisible"
      :typeList="typeList"
      :dishesForm="dishesForm"
      :status="status"
      @edit="dealDatas"></DishesEdit>
    <el-table
      :data="dishesDatas"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="菜品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="菜品 ID">
              <span>{{ props.row._id }}</span>
            </el-form-item>
            <el-form-item label="菜品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ cidStr(props.row.cid) }}</span>
            </el-form-item>
            <el-form-item label="更新日期">
              <span>{{ props.row.updateTime }}</span>
            </el-form-item>
            <el-form-item label="菜品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="img"
        label="菜品图片"
        width="300">
        <template slot-scope="scope">
          <img :src="scope.row.img" :alt="scope.row.name" width="180" height="60">
        </template>
      </el-table-column>
      <el-table-column
        prop="_id"
        label="菜品 ID"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="菜品名称"
        >
      </el-table-column>
      <el-table-column
        prop="price"
        label="菜品价格"
        width="150"
        >
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini" @click="edit(scope.row)">Edit</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row._id, scope.row.name)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { dishes, types, disheAdd, disheDel, disheEdit } from '@/fetch/dishes'
import DishesEdit from './dishes-edit'

export default {
  name: 'main-dishes',
  components: {
    DishesEdit
  },
  data () {
    return {
      dialogVisible: false,
      curID: '',
      status: 0, // 0:添加 1:编辑
      dishesDatas: [],
      typeList: [],
      dishesForm: {
        name: '',
        img: '',
        price: '',
        cid: '',
        desc: ''
      }
    }
  },
  mounted: function () {
    this.getTypes()
  },
  computed: {
    // 获取分类名称
    cidStr () {
      return cid => {
        for (let item of this.typeList) {
          if (item.id === cid) {
            return item.name
          }
        }
      }
    }
  },
  methods: {
    getTypes () {
      types().then(
        res => {
          console.log(res)
          const {code, data} = res.data
          if (code  === 1) {
            this.typeList = data.list
            this.$nextTick(() => {
              this.getDishes()
            })
          }
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    getDishes () {
      dishes().then(
        res => {
          const {code, data} = res.data
          if (code === 1) {
            this.dishesDatas = data.list
          }
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    dealDatas (e) {
      // 判断是确定还是取消
      if (e) {
        if (this.status) {
          this.editDo()
        } else {
          this.add()
        }
        console.log('确定')
      } else {
        this.dialogVisible = false
        this.clear()
      }
    },
    // 添加菜品
    add () {
      disheAdd(this.dishesForm).then(
        res => {
          const {code, msg, errMsg} = res.data
          switch (code) {
            case 0:
              this.$message({
                message: errMsg,
                type: 'warning'
              })
              break
            case 1:
              this.$message({
                message: msg,
                type: 'success'
              })
              this.clear()
              this.dialogVisible = false
              break
          }
        }
      ).catch(
        err => {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
        }
      )
    },
    // 编辑按钮
    edit (item) {
      for (let val in this.dishesForm) {
        this.dishesForm[val] = item[val]
      }
      this.curID = item._id
      this.status = 1
      this.dialogVisible = true
    },
    // 编辑菜品
    editDo () {
      let data = this.dishesForm
      data.id = this.curID
      disheEdit(data).then(
        res => {
          const {code, msg} = res.data
          if (code === 1) {
            this.$message({
              message: msg,
              type: 'success'
            })
            this.clear()
            this.dialogVisible = false
          }
        }
      )
    },
    // 删除菜品
    del (id, name) {
      const data = {id: id}
      this.$confirm(`您正在删除菜品，是否确认删除《${name}》？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        disheDel(data).then(
          res => {
            console.log(res)
            if (res.code === 1) {
              this.$message({type: 'success', message: '菜品删除成功!'})
            }
          }
        )
      }).catch((err) => {
        console.log(err)
      })
    },
    // 清空表单
    clear () {
      for (let val in this.dishesForm) {
        this.dishesForm[val] = ''
      }
    }
  }
}
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
