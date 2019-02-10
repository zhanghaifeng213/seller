<template>
  <div class="main-order-record">
    <el-table 
    :data="orderList" 
    border 
    show-summary
    :summary-method="getSummaries"
    style="width: 100%">
      <el-table-column type="index" width="80px"></el-table-column>
      <el-table-column prop="tableNum" width="100px" sortable label="桌号">
        <template slot-scope="scope">
          {{scope.row.tableNum.num}}
        </template>
      </el-table-column>
      <el-table-column prop="orderNum" sortable label="订单号">
      </el-table-column>
      <el-table-column prop="created" sortable label="下单时间">
        <template slot-scope="scope">
          {{scope.row.created}}
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注">
      </el-table-column>
      <el-table-column prop="amount" label="实付金额">
      </el-table-column>
      <el-table-column label="操作" width="80px">
        <template slot-scope="scope">
          <el-button size="mini" @click="view(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="total">
    </el-pagination>
    <order-detail v-if="orderVisible" ref="orderDetail"></order-detail>
  </div>
</template>
<script>
import OrderDetail from "./order-detail";
import { hlist } from "@/fetch/order";
export default {
  name: "main-order",
  data() {
    return {
      orderList: [],
      orderVisible: false,
      total: 0,
      pageSize: 10,
      pageNum: 1
    };
  },
  methods: {
    view(row) {
      this.orderVisible = true;
      this.$nextTick(() => {
        this.$refs.orderDetail.init(row);
      });
    },
    getList() {
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      hlist(data).then(res => {
        res.data.data.list.map(item => {
          item.created = new Date(item.created).toLocaleString();
        });
        this.orderList = res.data.data.list;
        this.total = res.data.data.totalPage;
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.getList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageNum = val;
      this.getList();
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (
          index === 1 ||
          index === 2 ||
          index === 3 ||
          index === 4 ||
          index === 6
        ) {
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
          sums[index] += " 元";
        } else {
          sums[index] = "N/A";
        }
      });
      return sums;
    }
  },
  mounted() {
    this.getList();
  },
  components: {
    OrderDetail
  }
};
</script>

<style lang="less">
.main-order-record {
  .el-pagination {
    margin: 20px auto;
    text-align: center;
  }
}
</style>
