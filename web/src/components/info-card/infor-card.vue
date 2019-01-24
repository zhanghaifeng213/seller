<template>
  <el-card :shadow="shadow" class="info-card-wrapper" :padding="0">
    <div class="content-con">
      <div class="left-area" :style="{background: color, width: leftWidth}">
        <icons class="icon" :type="icon" :size="iconSize" color="#fff"/>
        <!-- <icons :is="iconType" :type="iconName" :color="iconColor" :size="iconSize"></icons> -->
      </div>
      <div class="right-area" :style="{width: rightWidth}">
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import Icons from '_c/icons'
export default {
  name: 'InforCard',
  components: {
    Icons
  },
  props: {
    left: {
      type: Number,
      default: 36
    },
    color: {
      type: String,
      default: '#2d8cf0'
    },
    icon: {
      type: String,
      default: ''
    },
    iconSize: {
      type: Number,
      default: 20
    },
    shadow: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    leftWidth() {
      return `${this.left}%`
    },
    rightWidth() {
      return `${100 - this.left}%`
    }
  }
}
</script>

<style lang="less">
.common {
  float: left;
  height: 100%;
  display: table;
  text-align: center;
}
.size {
  width: 100%;
  height: 100%;
}
.middle-center {
  display: table-cell;
  vertical-align: middle;
}
.info-card-wrapper {
  .size;
  overflow: hidden;
  .ivu-card-body {
    .size;
  }
  .content-con {
    .size;
    position: relative;
    .left-area {
      .common;
      & > .icon {
        .middle-center;
      }
    }
    .right-area {
      .common;
      & > div {
        .middle-center;
      }
    }
  }
}
</style>
