<template>
  <div>
    <el-table :data="orderList" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="tableNum" sortable label="桌号">
      </el-table-column>
      <el-table-column prop="orderNum" sortable label="订单号">
      </el-table-column>
      <el-table-column prop="created" sortable label="下单时间">
        <template slot-scope="scope">
          {{scope.row.created}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="status" label="订单状态">
      </el-table-column>
      <el-table-column prop="amount" label="订单金额">
      </el-table-column>
      <el-table-column prop="realAmount" label="实付金额">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="view(scope.row)">查看</el-button>
          <el-button size="mini" @click="handleFinish(scope.row)">处理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <order-detail v-if="orderVisible" ref="orderDetail"></order-detail>
  </div>
</template>
<script>
import OrderDetail from "./order-detail";
export default {
  name: "main-order",
  data() {
    return {
      orderList: [],
      orderVisible: false
    };
  },
  methods: {
    clickButton: function(data) {
      // $socket is socket.io-client instance
      this.$socket.emit("emit_method", data);
    },
    view(row) {
      this.orderVisible = true;
      this.$nextTick(() => {
        this.$refs.orderDetail.init(row);
      });
    }
  },
  mounted() {
    this.sockets.subscribe("NEW_ORDER", data => {
      let order = data;
      order.created = new Date(data.created).toLocaleString();
      console.log(order.created);
      this.orderList.unshift(order);
    });
  },
  components: {
    OrderDetail
  }
};
</script>

<style>
</style>
