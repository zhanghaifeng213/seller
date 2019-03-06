<template>
  <div class="record">
    <div v-for="item in lists" :key="item.orderNum" class="lists-wrap">
      <div class="table-line1">
        <span>
          订单号 :
          <span class="val">{{item.orderNum}}</span>
        </span>
        <span>
          金额 :
          <span class="val">{{item.amount}}</span>
        </span>
      </div>
      <div class="table-line2">
        <span>时间 : {{format(item.created)}}</span>
        <span>状态 : {{getStatus(item.status)}}</span>
      </div>
      <div class="list-detail">
        <table border="2" cellpadding="2" cellspacing="1">
          <tr>
            <th>图片</th>
            <th>名称</th>
            <th>单价</th>
            <th>数量</th>
            <th>金额</th>
          </tr>
          <tr v-for="(it,index) in item.list" :key="index">
            <td>
              <img :src="it.menuDetail.img" width="20" height="20">
            </td>
            <td>{{it.menuDetail.name}}</td>
            <td>{{it.menuDetail.price}}</td>
            <td>{{it.count}}</td>
            <td>{{it.count*it.menuDetail.price}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { getLists } from "@/api/order.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      lists: [],
      orderNumbers: []
    };
  },
  mounted() {
    this.getList();
  },
  computed: {},
  methods: {
    getList() {
      this.orderNumbers = JSON.parse(localStorage.getItem("orderNum"));
      getLists({ orderNumbers: this.orderNumbers }).then(res => {
        if (res.data.code == 1) {
          this.lists = res.data.data;
          this.lists.forEach(el => {
            if (el.status == 5) {
              console.log(el.orderNum);
              let index = this.orderNumbers.indexOf(el.orderNum + "");
              console.log(index);
              console.log(this.orderNumbers);
              this.orderNumbers.splice(index, 1);
              console.log(this.orderNumbers);
              localStorage.setItem(
                "orderNum",
                JSON.stringify(this.orderNumbers)
              );
              // this.getList();
            }
          });
        } else {
          this.lists = [];
        }
      });
    },
    format(time) {
      return new Date(time).toLocaleString();
    },
    getStatus(status) {
      switch (status) {
        case 0:
          return "已下单";
          break;
        case 1:
          return "加工中";
          break;
        case 2:
          return "上菜中";
          break;
        case 3:
          return "菜已上齐";
          break;
        case 4:
          return "已买单";
          break;
        case 5:
          return "已完成";
          break;
      }
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.record {
  position: absolute;
  width: 100%;
  top: 174px;
  bottom: 0;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;

  .lists-wrap {
    margin-bottom: 20px;

    .table-line1 {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      height: 40px;
      line-height: 40px;

      .val {
        color: #0094ff;
      }
    }

    .table-line2 {
      display: flex;
      justify-content: space-between;
    }

    .list-detail {
      margin-top: 10px;

      table {
        width: 100%;
        text-align: center;
        border-collapse: collapse;
        border: 1px solid #0094ff;

        tr {
          height: 30px;
          line-height: 30px;

          td {
            img {
              transform: translateY(5px);
            }
          }
        }
      }
    }
  }
}
</style>
