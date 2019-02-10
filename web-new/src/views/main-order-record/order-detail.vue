<template>
  <el-dialog
    title="订单详情"
    :close-on-click-modal="true"
    :visible.sync="visible">
    <el-table
    ref="singleTable"
    :data="tableData"
    highlight-current-row
    style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        property="menuItem"
        label="菜名">
      </el-table-column>
      <el-table-column
        property="image"
        label="图片">
      </el-table-column>
      <el-table-column
        property="count"
        label="数量">
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      tableData: [],
      currentRow: null
    };
  },
  methods: {
    init(row) {
      console.log(row);
      this.visible = true;
      this.$nextTick(() => {
        this.tableData = row.list;
      });
    }
  }
};
</script>
