<template>
  <div class="login">
    <PageLoading v-if="pageLoaidng" />
    <Row type="flex" justify="center" align="middle">
      <Col class="login-item" :xs="24" :sm="24" :md="24" :lg="24">
        <div class="login-form">
          <h1 class="login-form-title">{{$t('login_title')}}</h1>
          <Form ref="loginFormRef" :model="loginFormModel" :rules="loginFormRule">
            <FormItem prop="username">
              <Input
                v-model="loginFormModel.username"
                @on-enter="enterEvent"
                size="large"
                :placeholder="$t('common_tips1')"
              ></Input>
              <i class="login-form-user--icon"></i>
            </FormItem>
            <FormItem prop="password">
              <Input
                v-model="loginFormModel.password"
                @on-enter="enterEvent"
                type="password"
                size="large"
                :placeholder="$t('common_tips2')"
              ></Input>
              <i class="login-form-password--icon"></i>
            </FormItem>
            <FormItem>
              <div class="login-remember">
                <Checkbox v-model="remember">{{$t('login_remember')}}</Checkbox>
                <ul class="login-locales">
                  <li @click="changeLocal('zh')">中文</li>
                  <li @click="changeLocal('en')">English</li>
                </ul>
              </div>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="login">{{$t('login_submit')}}</Button>
            </FormItem>
          </Form>
        </div>
      </Col>
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
  &-locales {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
    li {
      margin-right: 10px;
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        color: #3477bd;
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
