<template>
  <div class="col-lg-3 login-box">
    <h5 class="title">用户登录</h5>
    <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="70px">
      <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"  @keyup.enter.native="login" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
          <el-button type="primary" class="button col-lg-12" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login () {
      this.$http.post('/login', this.loginForm).then(res => {
        console.log(res)
      })
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
</style>
