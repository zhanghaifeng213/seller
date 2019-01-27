<template>
  <div class="col-lg-3 login-box">
    <h5 class="title">用户登录</h5>
    <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="70px">
      <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"  @keyup.enter.native="login('loginForm')" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" class="button col-lg-12" @click="login('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  name: 'login',
  data () {
    let checkUser = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }

    let checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { trigger: 'blur', validator: checkUser }
        ],
        password: [
          { trigger: 'blur', validator: checkPass }
        ]
      }
    }
  },
  methods: {
    showLogin () {
      this.showReg = false
    },
    showRegister () {
      this.showReg = true
    },
    login (loginForm) {
      this.$refs[loginForm].validate((vaild) => {
        if (vaild) {
          let param = {
            'username': this.loginForm.username,
            'password': this.loginForm.password
          }
          this.$store.dispatch('login', param).then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: '登录成功',
                type: 'success'
              })
              this.$router.push({path: '/main'})
            }
          }).catch((err) => {
            console.log(err.response)
          })
        } else {
          console.log('验证失败')
          return false
        }
      })
    }
  },
  mounted () {
    if (localStorage.getItem('token')) {
      this.$router.push({path: '/main'})
    } else {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style>
  .login-box{
    margin: 200px auto;
  }
  .title{
    text-align: center;
    margin-bottom: 10px;
  }
  .el-form-item__error{
    padding-top: 0;
  }
  .el-checkbox {
    margin: 0 0 20px 50px;
  }
</style>
