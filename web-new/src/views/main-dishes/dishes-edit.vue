<template>
  <el-dialog
    :title="status ? '修改菜品' : '添加菜品'"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose">
    <el-form :inline="true" :model="dishesForm" class="demo-form-inline" size="small">
      <el-form-item label="菜品名称">
        <el-input v-model="dishesForm.name" placeholder="菜品名称"></el-input>
      </el-form-item>
      <el-form-item label="菜品图片">
        <el-input v-model="dishesForm.img" placeholder="菜品图片"></el-input>
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
        <!-- <el-button type="primary" @click="add">添加</el-button> -->
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editForm(false)">取 消</el-button>
      <el-button type="primary" @click="editForm(true)">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  name: 'dishes-edit',
  props: {
    dialogVisible: Boolean,
    typeList: Array,
    dishesForm: Object,
    status: Number
  },
  data () {
    return {
      show: false,
    }
  },
  methods: {
    editForm (e) {
      // this.show = false
      this.$emit('edit', e)
      console.log(this.dishesForm)
      console.log('parent', this.$parent.dishesForm)
    },
    handleClose () {
      this.$parent.dialogVisible = this.show
      this.$parent.clear()
    }
  }
}
</script>

