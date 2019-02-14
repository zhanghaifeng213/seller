<template>
    <nav class="wrap-navbar">
        <div class="wrap-navbar-title">
          <img class="logo" :src="systemInfo.logo" alt="logo">
          <div class="logo-box">
            <div class="slogon" :title="systemInfo.version">{{systemInfo.slogon}}</div>
          </div>
        </div>
        <div class="wrap-navbar-content"></div>
    </nav>
</template>
<script>
import { getSystemInfo } from '@/fetch/system';
export default {
  data() {
    return {
      systemInfo: {}
    }
  },
  created() {
    getSystemInfo().then(res => {
      this.systemInfo = res.data.data;
    })
  },
  methods: {},
}
</script>
<style lang="less" scoped>
    .wrap-navbar{
        position: fixed;
        top:0px;
        left:0px;
        right:0px;
        height:50px;
        -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
        background-color: #17B3A3;
        z-index:1000;
        .wrap-navbar-title{
          width: 230px;
          height: 50px;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          .logo {
            display: inline-block;
            height: 100%;
            width: auto;
          }
          .logo-box {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            .slogon {
              margin: 0;
              font-size: 20px;
            }
          }
        }
    }
</style>

