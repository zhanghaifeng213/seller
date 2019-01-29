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
          <router-link :to="{ path: '/seller' }">商家</router-link>
        </div>
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
    eventBus.$on("passCode", () => {
      console.log(this.startRecognize);
      this.startRecognize();
    });
  },
  methods: {
    // 创建扫描控件
    startRecognize() {
      this.show = false;
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
        result = result.replace(/\n/g, "");
        // alert(result);
        if (parseInt(result) > 0 && parseInt(result) < 100) {
          that.seller.number = parseInt(result);
          that.scan.cancel();
          that.scan.close();
          alert(parseInt(result) + "号桌");
          that.show = true;
        } else {
          alert("二维码错误");
          that.scan.cancel();
          that.scan.close();
          that.scan.start();
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
