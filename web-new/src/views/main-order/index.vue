<template>
  <div class="main-order">
    <audio ref="audio" controls>
      <source src="../../assets/audio/friendship.mp3" type="audio/mp3">
    </audio>
    <el-table :data="orderList" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="tableNum" sortable label="桌号">
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
      <el-table-column sortable prop="status" label="订单状态">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0">未处理</span>
          <span v-if="scope.row.status==1">已通知后厨</span>
          <span v-if="scope.row.status==2">已上菜</span>
          <span v-if="scope.row.status==3">菜以上齐</span>
          <span v-if="scope.row.status==4">已结账</span>
        </template>
      </el-table-column>
      <el-table-column prop="amount" label="订单金额">
      </el-table-column>
      <el-table-column prop="realAmount" label="实付金额">
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button size="mini" @click="view(scope.row)">查看</el-button>
          <el-button v-if="scope.row.status==0" 
            size="mini"
            @click="handleFinish(1,scope.row)"
          >通知后厨</el-button>
          <el-button v-if="scope.row.status==1" 
            size="mini"
            @click="handleFinish(2,scope.row)"
          >已上菜</el-button>
          <el-button v-if="scope.row.status==2" 
            size="mini"
            @click="handleFinish(3,scope.row)"
          >菜以上齐</el-button>
          <el-button v-if="scope.row.status==3" 
            size="mini"
            @click="handleFinish(4,scope.row)"
          >已结账</el-button>
          <el-button v-if="scope.row.status==4" 
            size="mini"
            @click="handleFinish(5,scope.row)"
          >完成</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
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
      pageSize: 10,
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
    }
  },
  mounted() {
    this.sockets.subscribe("NEW_ORDER", data => {
      this.getList();
      this.$refs.audio.pause();
      this.$refs.audio.play();
    });
    this.getList();
  },
  components: {
    OrderDetail
  }
};
</script>

<style lang="less">
.main-order {
  .el-pagination {
    margin: 20px auto;
    text-align: center;
  }
}
</style>
