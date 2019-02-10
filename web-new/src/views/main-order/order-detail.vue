<template>
  <el-dialog
    title="订单详情"
    :close-on-click-modal="true"
    :visible.sync="visible">
    <el-table
    ref="singleTable"
    :data="tableData"
    show-summary 
    :summary-method="getSummaries"
    highlight-current-row
    style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        property="menuItem"
        label="菜名">
        <template slot-scope="scope">
          {{scope.row.menuDetail.name}}
        </template>
      </el-table-column>
      <el-table-column
        property="image"
        label="图片">
        <template slot-scope="scope">
          <img width="40" height="40" :src="scope.row.menuDetail.img">
        </template>
      </el-table-column>
      <el-table-column
        label="单价">
        <template slot-scope="scope">
          {{scope.row.menuDetail.price}}
        </template>
      </el-table-column>
      <el-table-column
        property="count"
        label="数量">
      </el-table-column>
      <el-table-column
        property="total"
        label="合计">
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
      this.visible = true;
      this.$nextTick(() => {
        this.tableData = row.list;
      });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        if (index === 1 || index === 2 || index === 3) {
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (index === 4) {
            sums[index] += " 份";
          } else {
            sums[index] += " 元";
          }
        } else {
          sums[index] = "N/A";
        }
      });
      return sums;
    }
  }
};
</script>
