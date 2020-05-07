<template>
  <div class="login">
    <PageLoading v-if="pageLoaidng" />
    <Row type="flex" justify="center" align="middle">
      <Col class="login-item" :xs="24" :sm="24" :md="24" :lg="24">
        <div class="login-form">
          <h1 class="login-form-title">账号登录</h1>
          <Form ref="loginFormRef" :model="loginFormModel" :rules="loginFormRule">
            <FormItem prop="username">
              <Input
                v-model="loginFormModel.username"
                @on-enter="enterEvent"
                size="large"
                placeholder="请输入账号"
              ></Input>
              <i class="login-form-user--icon"></i>
            </FormItem>
            <FormItem prop="password">
              <Input
                v-model="loginFormModel.password"
                @on-enter="enterEvent"
                type="password"
                size="large"
                placeholder="请输入密码"
              ></Input>
              <i class="login-form-password--icon"></i>
            </FormItem>
            <!-- <FormItem prop="safeCode">
              <Input v-model="loginFormModel.safeCode" @on-enter="enterEvent" size="large" placeholder="请输入安全码"></Input>
              <i class="login-form-password--icon"></i>
            </FormItem>-->
            <FormItem>
              <div class="login-remember">
                <Checkbox v-model="remember">记住我的账号</Checkbox>
                <!--                <span class="login-remember-password">忘记密码</span>-->
              </div>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="login">登&nbsp;&nbsp;录</Button>
            </FormItem>
          </Form>
        </div>
      </Col>
      <!-- <Col class="login-item" :xs="0" :sm="0" :md="8" :lg="12"> -->
      <!-- <img class="login-bg" src="../../assets/images/loginbg.png" alt="background-image" /> -->
      <!-- </Col> -->
    </Row>
  </div>
</template>

<script>
import Login from './Login.class';
export default Login
</script>

<style lang="less">
.login {
  position: relative;
  overflow: hidden;
  // background: url("../../assets/images/bg0824b.png") 100% no-repeat;
  background-size: cover;
  &-form {
    width: 500px;
    margin: 0 auto;
    background: hsla(0, 0%, 100%, 0.9);
    -webkit-box-shadow: 0 10px 18px 2px rgba(140, 119, 105, 0.21);
    box-shadow: 0 10px 18px 2px rgba(140, 119, 105, 0.21);
    border-radius: 12px;
    padding: 25px 25px 10px 25px;

    &-title {
      margin-bottom: 20px;
      color: #666;
      font-weight: 400;
      font-size: 22px;
    }
    &-user--icon {
      width: 24px;
      height: 24px;
      display: inline-block;
      background: url("../../assets/images/user.png") no-repeat;
      position: absolute;
      top: 12px;
      left: 8px;
    }
    &-password--icon {
      width: 24px;
      height: 24px;
      display: inline-block;
      background: url("../../assets/images/lock.png") no-repeat;
      position: absolute;
      top: 12px;
      left: 8px;
    }
    .ivu-form-item {
      position: relative;
    }
    .ivu-input-large {
      height: 50px;
      padding-left: 40px;
      font-size: 16px;
    }
    .ivu-btn {
      width: 100%;
      height: 40px;
      background: #3477bd;
      border-color: #3477bd;
      border-radius: 6px;
      font-size: 18px;
      &:hover {
        background: #3477bd;
        border-color: #3477bd;
      }
      &:focus {
        box-shadow: none;
      }
    }
  }
  &-remember {
    display: flex;
    justify-content: space-between;
    .ivu-checkbox-wrapper {
      font-size: 14px;
    }
    .ivu-checkbox-checked .ivu-checkbox-inner {
      border-color: #2d8cf0;
      background-color: #2d8cf0;
    }
    &-password {
      color: #2d8cf0;
      font-size: 14px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  &-bg {
    width: 100%;
  }
  .ivu-row-flex {
    height: 100vh;
  }
  .user-type {
    width: 100%;
    text-align: center;
    .ivu-radio-group-item {
      width: 33%;
    }
    .ivu-radio-wrapper-checked {
      background-color: #1890ff;
      color: white;
    }
  }
}
</style>
