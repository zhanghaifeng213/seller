<template>
  <div class="mod-home">
    <el-row :gutter="20">
      <el-col :xs="12" :md="8" :lg="6" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p class="count-title">{{ infor.title }}</p>
        </infor-card>
      </el-col>
    </el-row>
    <div class="mod-demo-echarts">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card>
            <div id="J_chartBarBox" class="chart-box" ></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
export default {
  data() {
    return {
      chartBar: null,
      inforCardData: [
        {
          title: '机构数',
          icon: 'organization',
          count: 803,
          color: '#2d8cf0'
        },
        {
          title: '项目数',
          icon: 'xiangmu',
          count: 232,
          color: '#19be6b'
        },
        {
          title: '累计收费次数',
          icon: 'chakancishu',
          count: 142,
          color: '#ff9900'
        },
        {
          title: '累计收费（万元）',
          icon: 'menzhenshoufei',
          count: 657,
          color: '#ed3f14'
        }
      ]
    }
  },
  computed: {
    tableHeight: {
      get() {
        return this.$store.state.common.documentClientHeight - 280
      }
    }
  },
  components: {
    InforCard,
    CountTo
  },
  mounted() {
    this.initChartBar()
  },
  activated() {
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug

    if (this.chartBar) {
      this.chartBar.resize()
    }
  },
  methods: {
    // 柱状图
    initChartBar() {
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          show: true,
          right: '16%',
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            // restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['收费次数', '收费金额']
        },
        xAxis: [
          {
            type: 'category',
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月'
            ],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '收费次数',
            min: 0,
            max: 10000,
            interval: 1000,
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '收费金额(万元)',
            min: 0,
            max: 1000,
            interval: 50,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '收费次数',
            type: 'bar',
            data: [
              200.0,
              400.9,
              700.0,
              2300.2,
              2500.6,
              7600.7,
              1350.6,
              1620.2,
              3200.6,
              200.0,
              600.4,
              300.3
            ]
          },
          {
            name: '收费金额',
            type: 'bar',
            yAxisIndex: 1,
            data: [
              200.6,
              500.9,
              900.0,
              260.4,
              280.7,
              700.7,
              175.6,
              182.2,
              480.7,
              180.8,
              600.0,
              200.3
            ]
          }
        ]
      }
      this.chartBar = echarts.init(document.getElementById('J_chartBarBox'))
      this.chartBar.setOption(option)
      window.addEventListener('resize', () => {
        this.chartBar.resize()
      })
    }
  }
}
</script>

<style lang="scss">
.mod-home {
  /* line-height: 1.5; */
  .el-card__body {
    padding: 0;
    height: 100%;
  }
  .count-style {
    font-size: 50px;
  }
  .count-title {
    margin: 0;
  }
  .mod-demo-echarts {
    > .el-alert {
      margin-bottom: 10px;
    }
    > .el-row {
      margin-top: -10px;
      margin-bottom: -10px;
      .el-col {
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
    .chart-box {
      // min-height: 400px;
      height: calc(100vh - 240px);
    }
  }
}
</style>


