<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">登 录</h3>
      </div>

      <el-form-item prop="username">
        <img src="~@/assets/username.svg" alt="" class="svg-container">
        <el-input ref="username" v-model="loginForm.username" placeholder="请输入账号" name="username" type="text" tabindex="1" autocomplete="on" />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <img src="~@/assets/password.svg" alt="" class="svg-container">

          <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="请输入密码" name="password" tabindex="2" autocomplete="on" @keyup.native="checkCapslock" @blur="capsTooltip = false" @keyup.enter.native="handleLogin" />

          <span class="show-pwd" @click="showPwd">
            <img v-if="passwordType === 'password'" src="~@/assets/eyeclose.svg" alt="" class="svg-eye">
            <img v-else src="~@/assets/eyeopen.svg" alt="" class="svg-eye">
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">{{logointext}}</el-button>

    </el-form>


  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      // validUsername(value)返回布尔值
      if (value == '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length == 0) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        // username: 'admin',
        // password: '123qwe'

        username: '',
        password: ''
      },
      // 验证规则
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      logointext:'确 定'
    }
  },
  mounted() {
    // 验证账号和密码非空,并获得焦点
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    // 密码checkCapslock事件
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    // 密码可见和不可见
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    // 登录事件
    handleLogin() {
      let _this = this;
      let username = _this.loginForm.username;
      let password = _this.loginForm.password;

      var params = {
        userNameOrEmailAddress: username,
        password: password
      };

      _this.$refs.loginForm.validate(valid => {
        if (valid) {
          _this.loading = true
          _this.logointext = '正在登录...'
          _this.$store.dispatch('user/Login', params)
            .then(() => {
              // return
              this.$router.push({ path: '/monitor/dashboardmonitor' })
              // _this.loading = false
              _this.logointext = '登录成功,正在跳转...'
            })
            .catch(() => {

              _this.logointext = '登录失败'
              _this.logointext = '重新登录'
              _this.loading = false
            })
        } else {
          console.log('登录失败')
          return false
        }
      })
    }

  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px white inset !important;
      }
      &:-webkit-autofill:focus {
        box-shadow: 0 0 0px 1000px white inset !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url('~@/assets/bg.png') no-repeat center/100% 100%;
  overflow: hidden;
  position:relative;

  .login-form {
    position: absolute;
    width: 20%;
    height: 50%;
    padding: 0;
    margin: 0 auto;
    overflow: hidden;
    left:51%;
    top:30%;

    // 登录文字内容
    .title-container{
      .title{
        font: bold 20px MicrosoftYaHei;
        color: #0066FF;
        text-align:left;
        margin: 0px auto 10%;
      }
    }

    // 图标样式
    .svg-container {
      padding: 1% 1% 3% 4%;
      color: $dark_gray;
      vertical-align: middle;
      display: inline-block;
    }

    // 密码
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }


  }


}

.login-container{
  ::v-deep {
      .el-form-item{
        background-color:rgba(255,255,255,0);
        border-bottom:1px solid #BECAD7;
        .el-form-item__content{
          .el-input--medium{
            .el-input__inner{
              opacity: 0.6;
              font-family: MicrosoftYaHei;
              font-size: 16px;
              color: #BECAD7;
            }

          }

        }
      }
  }
}



.login-container{
  ::v-deep {
      .el-button--medium{
        width:100%;
        margin-top:10%;
        height:13%;
        // border:1px solid #000;
        background: #0066FF;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        color: #FFFFFF;
        border-radius:0;
        padding:0;
      }
  }
}



</style>
