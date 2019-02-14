<template>
  <div>
    <el-button @click="dialogVisible = true">添加菜品</el-button>
    <el-select v-model="dishesCID" placeholder="所属分类">
      <el-option label="全部" value="全部"></el-option>
      <el-option
        v-for="item in typeList"
        :key="item.id"
        :label="item.name"
        :value="item.id">
      </el-option>
    </el-select>
    <DishesEdit
      :dialogVisible="dialogVisible"
      :typeList="typeList"
      :dishesForm="dishesForm"
      :status="status"
      @edit="dealDatas"></DishesEdit>
    <el-table
      :data="dishesDatas"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="菜品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="菜品 ID">
              <span>{{ props.row._id }}</span>
            </el-form-item>
            <el-form-item label="菜品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="所属分类">
              <span>{{ cidStr(props.row.cid) }}</span>
            </el-form-item>
            <el-form-item label="更新日期">
              <span>{{ props.row.updateTime }}</span>
            </el-form-item>
            <el-form-item label="菜品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="img"
        label="菜品图片"
        width="300">
        <template slot-scope="scope">
          <img :src="scope.row.img" :alt="scope.row.name" width="60" height="60">
        </template>
      </el-table-column>
      <el-table-column
        prop="_id"
        label="菜品 ID"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="菜品名称"
        >
      </el-table-column>
      <el-table-column
        prop="price"
        label="菜品价格"
        width="150"
        >
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button plain size="mini" @click="edit(scope.row)">Edit</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row._id, scope.row.name)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pages.currentPage1"
      :page-size="pages.size"
      layout="prev, pager, next"
      :total="pages.total">
    </el-pagination>
  </div>
</template>
<script>
import {
  dishes,
  types,
  disheAdd,
  disheDel,
  disheEdit,
  dishesByCID
} from "@/fetch/dishes";
import DishesEdit from "./dishes-edit";

export default {
  name: "main-dishes",
  components: {
    DishesEdit
  },
  data() {
    return {
      curID: "",
      curCID: "",
      dishesCID: "全部",
      dialogVisible: false,
      status: 0, // 0:添加 1:编辑
      dishesDatas: [], // 菜单列表
      typeList: [], // 分类列表
      // 表单
      dishesForm: {
        name: "",
        img: "",
        price: "",
        cid: "",
        desc: ""
      },
      // 分页信息
      pages: {
        currentPage1: 2,
        total: 7,
        size: 1
      }
    };
  },
  watch: {
    // 分类查询
    dishesCID(curr, old) {
      if (curr === "全部") {
        this.getDishes();
      } else {
        this.getDishesCID(curr);
      }
    }
  },
  mounted: function() {
    this.getTypes();
  },
  computed: {
    // 获取分类名称
    cidStr() {
      return cid => {
        for (let item of this.typeList) {
          if (item.id === cid) {
            return item.name;
          }
        }
      };
    }
  },
  methods: {
    // 获取类别
    getTypes() {
      types()
        .then(res => {
          const { code, data } = res.data;
          if (code === 1) {
            this.typeList = data.list;
            this.$nextTick(() => {
              this.getDishes();
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取全部菜品
    getDishes(number = 1) {
      dishes({ pageNum: number })
        .then(res => {
          const { code, data } = res.data;
          if (code === 1) {
            this.dishesDatas = data.list;
            this.dishesCID = "全部";
            this.pagesChange(number, data.totalPage);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // CID获取菜品
    getDishesCID(cid, number = 1) {
      this.curCID = cid;
      dishesByCID({ cid: cid, pageNum: number }).then(res => {
        const { code, data } = res.data;
        if (code === 1) {
          this.dishesDatas = data.list;
          this.pagesChange(number, data.totalPage);
        }
      });
    },
    // 添加和修改的判断
    dealDatas(e) {
      // 判断是确定还是取消
      if (e) {
        if (this.status) {
          this.editDo();
        } else {
          this.add();
        }
        console.log("确定");
      } else {
        this.dialogVisible = false;
        this.clear();
      }
    },
    // 添加菜品
    add() {
      disheAdd(this.dishesForm)
        .then(res => {
          const { code, msg, errMsg } = res.data;
          switch (code) {
            case 0:
              this.$message({
                message: errMsg,
                type: "warning"
              });
              break;
            case 1:
              this.$message({
                message: msg,
                type: "success"
              });
              this.clear();
              this.dialogVisible = false;
              this.getDishes();
              break;
          }
        })
        .catch(err => {
          this.$message({
            message: "添加失败",
            type: "error"
          });
        });
    },
    // 编辑按钮
    edit(item) {
      for (let val in this.dishesForm) {
        this.dishesForm[val] = item[val];
      }
      this.curID = item._id;
      this.status = 1;
      this.dialogVisible = true;
    },
    // 编辑菜品
    editDo() {
      let data = this.dishesForm;
      data.id = this.curID;
      disheEdit(data).then(res => {
        const { code, msg } = res.data;
        if (code === 1) {
          this.$message({
            message: msg,
            type: "success"
          });
          this.clear();
          this.dialogVisible = false;
          this.getDishes();
        }
      });
    },
    // 删除菜品
    del(id, name) {
      const data = { id: id };
      this.$confirm(`您正在删除菜品，是否确认删除《${name}》？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          disheDel(data).then(res => {
            if (res.data.code === 1) {
              this.$message({ type: "success", message: "菜品删除成功!" });
              this.getDishes();
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 清空表单
    clear() {
      for (let val in this.dishesForm) {
        this.dishesForm[val] = "";
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      if (this.dishesCID === "全部") {
        this.getDishes(val);
      } else {
        this.getDishesCID(this.curCID, val);
      }
      console.log(`当前页: ${val}`);
    },
    pagesChange(val, total) {
      this.pages.currentPage1 = val; // 当前第几页
      this.pages.total = total; // 菜品总条目数
      this.pages.size = 10; // 每页显示条目个数
    }
  }
};
</script>

<style>
.wrap-content {
  overflow: auto;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
