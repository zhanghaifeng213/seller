<template>
  <div>
    <p class="h3">main-dishes</p>{{dishesForm.cid}}
    <el-form :inline="true" :model="dishesForm" class="demo-form-inline" size="small">
      <el-form-item label="菜品名称">
        <el-input v-model="dishesForm.name" placeholder="菜品名称"></el-input>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select v-model="dishesForm.cid" placeholder="所属分类">
          <el-option
            v-for="item in typeList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="菜品价格">
        <el-input v-model="dishesForm.price" placeholder="菜品价格"></el-input>
      </el-form-item>
      <el-form-item label="菜品描述">
        <el-input v-model="dishesForm.desc" placeholder="菜品描述"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">添加</el-button>
      </el-form-item>
    </el-form>
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
              <span>{{ props.row.id }}</span>
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
        prop="id"
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
        >
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini">Edit</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row.id, scope.row.name)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { dishes, types, disheAdd, disheDel } from '@/fetch/dishes'

export default {
  name: 'main-dishes',
  data () {
    return {
      dishesDatas: [],
      typeList: [],
      dishesForm: {
        name: '',
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
          const {code, data} = res.data
          if (code  === 1) {
            this.typeList = data.list
            this.getDishes()
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
    add () {
      disheAdd(this.dishesForm).then(
        res => {
          const {code, msg, errMsg} = res.data
          console.log(res.data)
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
    del (id, name) {
      const data = {id: id}
      this.$confirm(`您正在删除菜品，是否确认删除《${name}》？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('确定')
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
