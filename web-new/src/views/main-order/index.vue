<template>
  <div class="main-order">
    <el-table
      :data="orderList"
      show-summary
      :summary-method="getSummaries"
      border
      style="width: 100%"
    >
      <el-table-column type="index" width="80px"></el-table-column>
      <el-table-column prop="tableNum" width="100px" sortable label="桌号">
        <template slot-scope="scope" v-if="scope.row.tableNum">{{scope.row.tableNum.num}}</template>
      </el-table-column>
      <el-table-column prop="orderNum" sortable label="订单号"></el-table-column>
      <el-table-column prop="created" sortable label="下单时间">
        <template slot-scope="scope">{{scope.row.created}}</template>
      </el-table-column>
      <el-table-column sortable prop="status" label="订单状态" width="120px">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0">未处理</span>
          <span v-if="scope.row.status==1">已通知后厨</span>
          <span v-if="scope.row.status==2">已上菜</span>
          <span v-if="scope.row.status==3">菜以上齐</span>
          <span v-if="scope.row.status==4">已结账</span>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.status==4"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="scope.row.remark"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column sortable prop="amount" label="订单金额" width="120px">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.status==4"
            placeholder="请输入内容"
            type="number"
            v-model="scope.row.amount"
          ></el-input>
          <span v-else>{{scope.row.amount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180px">
        <template slot-scope="scope">
          <el-button size="mini" @click="view(scope.row)">查看</el-button>
          <el-button
            v-if="scope.row.status==0"
            size="mini"
            type="primary"
            @click="handleFinish(1,scope.row)"
          >通知后厨</el-button>
          <el-button
            v-if="scope.row.status==1"
            size="mini"
            type="success"
            @click="handleFinish(2,scope.row)"
          >已上菜</el-button>
          <el-button
            v-if="scope.row.status==2"
            size="mini"
            type="info"
            @click="handleFinish(3,scope.row)"
          >菜以上齐</el-button>
          <el-button
            v-if="scope.row.status==3"
            size="mini"
            type="warning"
            @click="handleFinish(4,scope.row)"
          >已结账</el-button>
          <el-button
            v-if="scope.row.status==4"
            size="mini"
            type="danger"
            @click="handleFinish(5,scope.row)"
          >完成</el-button>
        </template>
      </el-table-column>
    </el-table>
    <audio ref="audio" controls>
      <source src="../../assets/audio/friendship.mp3" type="audio/mp3">
    </audio>
    <el-pagination
      background
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <order-detail v-if="orderVisible" ref="orderDetail"></order-detail>
  </div>
</template>
<script>
import OrderDetail from "./order-detail";
import { clist, update } from "@/fetch/order";
export default {
  name: "main-order",
  data() {
    return {
      orderList: [],
      orderVisible: false,
      total: 0,
      pageSize: 20,
      pageNum: 1
    };
  },
  methods: {
    clickButton: function(data) {
      this.$socket.emit("emit_method", data);
    },
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
      clist(data).then(res => {
        // let total = 0;
        res.data.data.list.map(item => {
          item.created = new Date(item.created).toLocaleString();
          item.list.map(it => {
            it.total = it.menuDetail.price * it.count;
            // total += it.total;
          });
          // item.total = total;
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
    handleFinish(status, row) {
      let data = {
        orderId: row._id,
        status
      };
      update(data).then(res => {
        if (res.data.code == 1) {
          this.getList();
        }
      });
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
          index === 5 ||
          index === 7
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
  sockets: {
    NEW_ORDER: function(data) {
      this.getList();
      if (this.$refs.audio) {
        this.$refs.audio.pause();
        this.$refs.audio.play();
      }
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
.main-order {
  & > audio {
    position: absolute;
    height: 40px;
    right: 0;
    top: 0;
    z-index: 1000;
  }
  .el-pagination {
    margin: 20px auto;
    text-align: center;
  }
}
</style>
