<template>
  <div id="app">
    
    <div v-if="show">
      <vHeader :seller="seller"></vHeader>
      <div class="tab border-1px">
        <div class="tab-item">
          <router-link :to="{ path: '/goods' }">商品</router-link>
        </div>
        <!-- <div class="tab-item">
          <router-link :to="{ path: '/ratings' }">评论</router-link>
        </div> -->
        <div class="tab-item">
          <router-link :to="{ path: '/record' }">下单记录</router-link>
        </div>
        <!-- <div class="tab-item">
          <router-link :to="{ path: '/seller' }">商家</router-link>
        </div> -->
      </div>
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
    <div class="scan" v-else>
      <div id="bcid" v-if="!show">
        <button @click="cancelScan">返回</button>
      </div>
      <!-- <footer v-if="!show">
        <img :src="avatar" width="170" height="128">
        
        <div class="title" v-show="!show">
          欢迎使用惠工小串点餐APP!</div>
        <div class="desc" v-show="!show">
          点击扫码点餐按钮
        </div>
        <div class="desc" v-show="!show">
          扫描桌上二维码进行点餐
        </div>
        <button @click="startRecognize" v-show="!show">扫码点餐</button>
        <button @click="startScan">2.开始扫描</button>
        <button @click="cancelScan">3.结束扫描</button>
        <button @click="closeScan">4.关闭控件</button>
      </footer> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { urlParse } from "common/js/util";
import { data } from "common/js/data";
import vHeader from "./components/header/header.vue";
import { addOrder } from "@/api/order.js";
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      avatar: require("./common/images/logo.png"),
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })(),
        number: ""
      },
      codeUrl: "",
      scan: null,
      show: true
    };
  },
  created() {
    this.seller = Object.assign({}, this.seller, data().seller);
    eventBus.$on("passCode", val => {
      if (this.startRecognize) {
        this.startRecognize(val);
      }
    });
  },
  methods: {
    ...mapMutations(["auth_success"]),
    // 创建扫描控件
    startRecognize(val) {
      this.show = false;
      let list = [];
      val.forEach(item => {
        list.push({
          menuItem: item.id,
          count: item.count
        });
      });
      this.$nextTick(() => {
        if (!window.plus) return;
        // eslint-disable-next-line
        this.scan = new plus.barcode.Barcode("bcid");
        this.scan.onmarked = onmarked;
        this.scan.start();
      });
      let that = this;
      function onmarked(type, result, file) {
        switch (type) {
          // eslint-disable-next-line
          case plus.barcode.QR:
            type = "QR";
            break;
          // eslint-disable-next-line
          case plus.barcode.EAN13:
            type = "EAN13";
            break;
          // eslint-disable-next-line
          case plus.barcode.EAN8:
            type = "EAN8";
            break;
          default:
            type = "其它" + type;
            break;
        }
        // 获得code
        result = JSON.parse(result);
        this.auth_success(result);
        // alert(result);
        if (parseInt(result.number) > 0) {
          that.seller.number = parseInt(result.number);
          that.scan.cancel();
          that.scan.close();
          let obj = {
            tableNum: result.id,
            list
          };
          addOrder(obj).then(res => {
            if (res.data.code == 1) {
              let orderNum = res.data.data;
              if (localStorage.getItem("orderNum")) {
                let arra = JSON.parse(localStorage.getItem("orderNum"));
                arra.push(orderNum);
                localStorage.setItem("orderNum", JSON.stringify(arra));
              } else {
                let arra = [orderNum];
                localStorage.setItem("orderNum", JSON.stringify(arra));
              }
              eventBus.$emit("suc-ordered");
              alert(parseInt(result.number) + "号桌 点单成功");
            }
          });

          that.show = true;
        } else {
          alert("二维码错误");
          that.scan.cancel();
          that.scan.close();
          // that.scan.start();
        }
      }
    },
    // 开始扫描
    // startScan() {
    //   if (!window.plus) return;
    //   this.scan.start();
    // },
    // 关闭扫描
    cancelScan() {
      if (!window.plus) return;
      this.scan.cancel();
      this.scan.close();
      this.show = true;
    },
    // 关闭条码识别控件
    closeScan() {
      if (!window.plus) return;
      this.scan.close();
    }
  },
  components: {
    vHeader
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/base.styl';
@import './common/stylus/mixin.styl';

.tab {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  // border-bottom:1px solid rgba(7,17,27,0.1)
  border-1px(rgba(7, 17, 27, 0.1));
}

.tab-item {
  flex: 1;
  text-align: center;

  & > a {
    font-size: 14px;
    color: rgb(77, 85, 93);

    &.active {
      color: rgb(240, 20, 20);
    }
  }
}
</style>
<style>
.scan {
  height: 100%;
}
#bcid {
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  text-align: center;
  color: #fff;
  background: #fff;
  z-index: -10;
}
#bcid > button {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  padding: 5px 20px;
  background: #17b3a3;
  border-radius: 5px;
  font-weight: bold;
  font-size: 14px;
}
footer {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translateX(-50%) translateY(-50%);
  /* height: 2rem;
  line-height: 2rem; */
  z-index: 2;
  text-align: center;
  color: #f60;
}
footer .title {
  text-align: center;
  font-size: 20px;
  height: 32px;
  line-height: 32px;
  margin-bottom: 20px;
}
footer .desc {
  text-align: center;
  font-size: 16px;
  height: 24px;
  line-height: 24px;
  margin-bottom: 10px;
}
footer button {
  color: #fff;
  padding: 20px;
  background: yellowgreen;
  border-radius: 20px;
  font-weight: bold;
  font-size: 16px;
}
</style>
