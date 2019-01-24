<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-table :data="gridData">
      <el-table-column property="name" label="操作" width="50" align="center">
        <template slot-scope="scope">
          <el-button  type="text" @click="deleteRow(scope.$index, gridData)">
            <i class="el-icon-remove"></i>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column property="name" label="机构名称" >
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" placeholder="请输入机构名称"></el-input>
        </template>
      </el-table-column>
      <el-table-column property="per" label="权重(%)" align="center" width="250">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.per" @change="handleChange" :min="0" :max="100" label="权重"></el-input-number>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" icon="el-icon-plus" circle size="mini" style="float:left;" @click="addRow"></el-button>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { isEmail, isMobile } from '@/utils/validate'
  export default {
    data () {
      var validatePassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('密码不能为空'))
        } else {
          callback()
        }
      }
      var validateComfirmPassword = (rule, value, callback) => {
        if (!this.dataForm.id && !/\S/.test(value)) {
          callback(new Error('确认密码不能为空'))
        } else if (this.dataForm.password !== value) {
          callback(new Error('确认密码与密码输入不一致'))
        } else {
          callback()
        }
      }
      var validateEmail = (rule, value, callback) => {
        if (!isEmail(value)) {
          callback(new Error('邮箱格式错误'))
        } else {
          callback()
        }
      }
      var validateMobile = (rule, value, callback) => {
        if (!isMobile(value)) {
          callback(new Error('手机号格式错误'))
        } else {
          callback()
        }
      }
      return {
        visible: false,
        gridData:[
          {
            name:'大连医科大学附属第一医院',
            per:50
          },
          {
            name:'大连大学附属中山医院',
            per:70
          }
        ],
        roleList: [],
        dataForm: {
          id: 0,
          userName: '',
          password: '',
          comfirmPassword: '',
          salt: '',
          email: '',
          mobile: '',
          roleIdList: [],
          status: 1
        },
        dataRule: {
          userName: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          comfirmPassword: [
            { validator: validateComfirmPassword, trigger: 'blur' }
          ],
          email: [
            { required: true, message: '邮箱不能为空', trigger: 'blur' },
            { validator: validateEmail, trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        // this.dataForm.id = id || 0
        // this.$http({
        //   url: this.$http.adornUrl('/sys/role/select'),
        //   method: 'get',
        //   params: this.$http.adornParams()
        // }).then(({data}) => {
        //   this.roleList = data && data.code === 0 ? data.list : []
        // }).then(() => {
          this.visible = true
        //   this.$nextTick(() => {
        //     this.$refs['dataForm'].resetFields()
        //   })
        // }).then(() => {
        //   if (this.dataForm.id) {
        //     this.$http({
        //       url: this.$http.adornUrl(`/sys/user/info/${this.dataForm.id}`),
        //       method: 'get',
        //       params: this.$http.adornParams()
        //     }).then(({data}) => {
        //       if (data && data.code === 0) {
        //         this.dataForm.userName = data.user.username
        //         this.dataForm.salt = data.user.salt
        //         this.dataForm.email = data.user.email
        //         this.dataForm.mobile = data.user.mobile
        //         this.dataForm.roleIdList = data.user.roleIdList
        //         this.dataForm.status = data.user.status
        //       }
        //     })
        //   }
        // })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/sys/user/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'userId': this.dataForm.id || undefined,
                'username': this.dataForm.userName,
                'password': this.dataForm.password,
                'salt': this.dataForm.salt,
                'email': this.dataForm.email,
                'mobile': this.dataForm.mobile,
                'status': this.dataForm.status,
                'roleIdList': this.dataForm.roleIdList
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      },
      addRow(){
        this.gridData.push({
          name:'',
          per:0
        })
      },
      handleChange(value) {
        console.log(value);
      },
      deleteRow(index, rows) {
        console.log(rows)
        this.$confirm(`确定对${rows[index].name}项进行删除操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         rows.splice(index, 1);
        }).catch(() => {})
      }
    }
  }
</script>
<style scoped>
.el-icon-remove{
  color:red;
  font-size:20px;
}
</style>
