<template>
    <aside class="wrap-sidebar">
        <ul>
            <li class="link"><router-link :to="{name: 'types'}">菜品分类管理</router-link></li>
            <li class="link"><router-link :to="{name: 'dishes'}">菜单管理</router-link></li>
            <li class="link"><router-link :to="{name: 'tables'}">桌号管理</router-link></li>
            <li class="link" @click="clear">
                <router-link :to="{name: 'order'}">
                    <el-badge v-if="newOrderCount>0" :value="newOrderCount" class="item">
                                订单管理
                    </el-badge>
                    <span v-else>订单管理</span>
                </router-link>
            </li>
            <li class="link"><router-link :to="{name: 'income'}" >收入管理</router-link></li>
            <li class="link"><router-link :to="{name: 'records'}">历史订单</router-link></li>
            <li v-if="role==0" class="link"><router-link :to="{name: 'info'}">用户管理</router-link></li>
            <li class="link"><router-link :to="{name: 'meterial'}">素材管理</router-link></li>
        </ul>
    </aside>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      newOrderCount: 0
    };
  },
  computed: {
    ...mapState({
      role: state => state.role
    })
  },
  mounted() {
    this.sockets.subscribe("NEW_ORDER", data => {
      this.newOrderCount++;
      console.log(data);
      // this.msg = data.message;
    });
  },
  methods: {
    clear() {
      this.newOrderCount = 0;
    }
  }
};
</script>
<style lang="less" scoped>
.wrap-sidebar {
  position: fixed;
  left: 0px;
  top: 50px;
  bottom: 0px;
  width: 230px;
  background: #002244;
  .link {
    padding: 10px 0;
    a {
      color: #fff;
    }
  }
}
</style>

