<template>
    <aside class="wrap-sidebar">
      <ul>
        <li class="link"><router-link :to="{name: 'types'}"><i class="el-icon-menu"></i> 菜品分类</router-link></li>
        <li class="link"><router-link :to="{name: 'dishes'}"><i class="el-icon-tickets"></i> 菜品列表</router-link></li>
        <li class="link"><router-link :to="{name: 'tables'}"><i class="el-icon-news"></i> 桌号管理</router-link></li>
        <li class="link" @click="clear">
          <router-link :to="{name: 'order'}">
            <i class="el-icon-document"></i> 订单管理<el-badge v-if="newOrderCount>0" :value="newOrderCount"></el-badge>
          </router-link>
        </li>
        <li class="link"><router-link :to="{name: 'income'}" ><i class="el-icon-download"></i> 收入管理</router-link></li>
        <li class="link"><router-link :to="{name: 'records'}"><i class="el-icon-date"></i> 历史订单</router-link></li>
        <li class="link" v-if="role==0" >
          <router-link :to="{name: 'info'}"><i class="el-icon-setting"></i> 用户管理</router-link>
        </li>
        <li class="link"><router-link :to="{name: 'meterial'}"><i class="el-icon-picture"></i> 素材管理</router-link></li>
      </ul>
    </aside>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      newOrderCount: 0,
      currentIndex: 0
    };
  },
  computed: {
    ...mapState({
      role: state => state.role
    })
  },
  sockets: {
    NEW_ORDER: function(data) {
      this.newOrderCount++;
    }
  },
  methods: {
    clear() {
      this.currentIndex = 3;
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
  width: 200px;
  background: #002244;
  padding-top: 30px;
  & > ul {
    padding: 0;
    .link {
      a {
        color: #dedede;
        display: block;
        font-size: 15px;
        padding: 14px 22px;
        text-decoration: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        transition: all .2s;
        display: flex;
        align-items: center;
        &:hover {
          color: #4279ec;
          background: #f3f6f6;
          text-decoration: none;
        }

        i {
          font-size: 20px;
          padding-right: 6px;
        }
      }
      .router-link-active {
        color: #4279ec;
        background: #f3f6f6;
      }
    }
  }
}


</style>

