<template>
  <div>
    main-table-number
    <el-form :inline="true" :model="tableForm" class="demo-form-inline" size="small">
      <el-form-item label="桌号">
        <el-input v-model="tableForm.num" placeholder="桌号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add">添加</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableList"
      style="width: 100%">
      <!-- <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> -->
      <el-table-column
        label="桌号 ID"
        prop="_id">
      </el-table-column>
      <el-table-column
        label="桌号"
        prop="num">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { tableNumber,tableAdd } from '@/fetch/number'
export default {
  name: 'main-table-number',
  data() {
    return {
      tableList: [],
      typeList: [],
      tableForm: {
        num: '',
      },
    }
  },
  mounted:function () {
    this.getTableNumber()
  },
  methods: {
    getTableNumber () {
      tableNumber().then(
        res => {
          console.log(res)
          let {code,data} =res.data;
          if( code === 1) {
            this.tableList=data.list;
          }
        }
      ).catch(
        err => {
          console.log(err)
        }
      )
    },
    add() {
      tableAdd(this.tableForm).then(
        res => {
          console.log(res)
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
             this.getTableNumber();
             this.tableForm.num='';
              break
          }
        }
      ).catch(
        
        err => {
          console.log(err)
          this.$message({
            message: '添加失败',
            type: 'error'
          })
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
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
