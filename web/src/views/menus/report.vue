<template>
<div class="mod-report">
  <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
    <el-form-item>
      统计维度
    </el-form-item>
    <el-form-item>
      <!-- <el-input v-model="dataForm.userName" placeholder="用户名" clearable></el-input> -->
      <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="getDataList()">统计</el-button>
      <el-button  type="primary" :loading="exportLoading" @click="exportExcel()">导出</el-button>
      <!-- <el-button  type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button> -->
    </el-form-item>
  </el-form>
  <div class="table-wrap">
    <h2>{{tableName}}</h2>
    <el-table
      ref="table"
      id="table"
      :height="tableHeight"
      :data="tableData3"
      style="width: 100%">
      <el-table-column
        label="医疗机构"
        align="right"
        width="150">
        <el-table-column
          prop="name"
          label="收费项目"
          width="120">
        </el-table-column>
      </el-table-column>
        <el-table-column
          v-for="(item,index) of mechanism"
          :label="item"
          align="center"
          :key="item"
          width="120">
          <el-table-column
            label="次数"
            align="center"
            width="120">
            <template slot-scope="scope">
              {{scope.row.mechanism[index].frequency}}
          </template>
          </el-table-column>
          <el-table-column
            label="费用"
            align="center"
            width="120">
            <template slot-scope="scope">
              {{scope.row.mechanism[index].cost}}
          </template>
          </el-table-column>
        </el-table-column>
    </el-table>
  </div>
  
</div>
</template>

<script>
import excel from '@/utils/excel'
export default {
  data() {
    return {
      exportLoading: false,
      dataForm: {
        userName: ''
      },
      tableName: '2018年11月9日统计报表',
      mechanism: ['医疗机构A', '医疗机构B', '医疗机构C', '医疗机构D'],
      tableData3: [
        {
          name: '项目A',
          mechanism: [
            {
              frequency: 8,
              cost: 1000
            },
            {
              frequency: 9,
              cost: 2000
            },
            {
              frequency: 10,
              cost: 3000
            },
            {
              frequency: 11,
              cost: 4000
            }
          ]
        },
        {
          name: '项目B',
          mechanism: [
            {
              frequency: 3,
              cost: 3001
            },
            {
              frequency: 4,
              cost: 2002
            },
            {
              frequency: 5,
              cost: 2003
            },
            {
              frequency: 6,
              cost: 2004
            }
          ]
        },
        {
          name: '项目A',
          mechanism: [
            {
              frequency: 8,
              cost: 1000
            },
            {
              frequency: 9,
              cost: 2000
            },
            {
              frequency: 10,
              cost: 3000
            },
            {
              frequency: 11,
              cost: 4000
            }
          ]
        },
        {
          name: '项目B',
          mechanism: [
            {
              frequency: 3,
              cost: 3001
            },
            {
              frequency: 4,
              cost: 2002
            },
            {
              frequency: 5,
              cost: 2003
            },
            {
              frequency: 6,
              cost: 2004
            }
          ]
        },
        {
          name: '项目A',
          mechanism: [
            {
              frequency: 8,
              cost: 1000
            },
            {
              frequency: 9,
              cost: 2000
            },
            {
              frequency: 10,
              cost: 3000
            },
            {
              frequency: 11,
              cost: 4000
            }
          ]
        },
        {
          name: '项目B',
          mechanism: [
            {
              frequency: 3,
              cost: 3001
            },
            {
              frequency: 4,
              cost: 2002
            },
            {
              frequency: 5,
              cost: 2003
            },
            {
              frequency: 6,
              cost: 2004
            }
          ]
        },
        {
          name: '项目A',
          mechanism: [
            {
              frequency: 8,
              cost: 1000
            },
            {
              frequency: 9,
              cost: 2000
            },
            {
              frequency: 10,
              cost: 3000
            },
            {
              frequency: 11,
              cost: 4000
            }
          ]
        },
        {
          name: '项目B',
          mechanism: [
            {
              frequency: 3,
              cost: 3001
            },
            {
              frequency: 4,
              cost: 2002
            },
            {
              frequency: 5,
              cost: 2003
            },
            {
              frequency: 6,
              cost: 2004
            }
          ]
        },
        {
          name: '项目A',
          mechanism: [
            {
              frequency: 8,
              cost: 1000
            },
            {
              frequency: 9,
              cost: 2000
            },
            {
              frequency: 10,
              cost: 3000
            },
            {
              frequency: 11,
              cost: 4000
            }
          ]
        },
        {
          name: '项目B',
          mechanism: [
            {
              frequency: 3,
              cost: 3001
            },
            {
              frequency: 4,
              cost: 2002
            },
            {
              frequency: 5,
              cost: 2003
            },
            {
              frequency: 6,
              cost: 2004
            }
          ]
        }
      ],
      options: [
        {
          value: '0',
          label: '当天'
        },
        {
          value: '1',
          label: '当月'
        },
        {
          value: '2',
          label: '当年'
        },
        {
          value: '3',
          label: '总计'
        }
      ],
      value: ''
    }
  },
  computed: {
    tableHeight: {
      get() {
        return this.$store.state.common.documentClientHeight - 260
      }
    }
  },
  methods: {
    exportExcel() {
      // if (this.tableData3.length) {
      //   this.exportLoading = true
      //   const params = {
      //     title: [...this.mechanism],
      //     key: ['category1', 'category2', 'category3'],
      //     data: this.tableData3,
      //     autoWidth: true,
      //     filename: '分类列表'
      //   }
      //   excel.export_array_to_excel(params)
      //   this.exportLoading = false
      // } else {
      //   this.$Message.info('表格数据不能为空！')
      // }
      excel.export_table_to_excel('table', `${this.tableName}.xlsx`)
    },
    getDataList() {}
  }
}
</script>
<style lang="scss">
.mod-report {
  .table-wrap {
    h2 {
      margin: 0 0 10px;
      text-align: center;
    }
    .el-table thead.is-group th {
      background: none;
    }
    .el-table thead.is-group tr:first-of-type th:first-of-type {
      border-bottom: none;
    }
    .el-table thead.is-group tr:first-of-type th:first-of-type:before {
      content: '';
      position: absolute;
      width: 1px;
      height: 75px; /*这里需要自己调整，根据td的宽度和高度*/
      top: 0;
      left: 0;
      background-color: grey;
      opacity: 0.3;
      display: block;
      transform: rotate(-53deg); /*这里需要自己调整，根据线的位置*/
      transform-origin: top;
    }
    .el-table thead.is-group tr:last-of-type th:first-of-type:before {
      content: '';
      position: absolute;
      width: 1px;
      height: 75px; /*这里需要自己调整，根据td的宽度和高度*/
      bottom: 0;
      right: 0;
      background-color: grey;
      opacity: 0.3;
      display: block;
      transform: rotate(-54deg); /*这里需要自己调整，根据线的位置*/
      transform-origin: bottom;
      // background:red;
    }
  }
}
</style>