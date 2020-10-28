<template>
  <div class="home-header">
    <h2 class="home-header--left">后台管理系统</h2>
    <div class="home-header--right">
      <Dropdown trigger="click">
        <div class="home-header--right-content">
          <span>
            {{userInfo.username}}
            <Icon type="ios-arrow-down"></Icon>
          </span>
          <img src="../../../assets/images/userHeader.png" alt class="home-header--right-user" />
        </div>
        <DropdownMenu slot="list">
          <DropdownItem @click.native="editPwd">修改密码</DropdownItem>
          <DropdownItem @click.native="logout">退出登录</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <PageResetPassword ref="resetPasswordRef" :userId="userInfo.id" :url="resetPasswordUrl"/>
    </div>

  </div>
</template>
<script>
import HomeHeader from './HomeHeader.class';
export default HomeHeader
</script>

<style lang="less">
@import "../../../styles/var.less";
.home-header {
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  .ivu-breadcrumb-item-link {
    color: #fff;
  }
  &--left {
    color: #fff;
  }
  &--right {
    &-content {
      display: flex;
      justify-content: space-between;
      align-content: center;
      align-items: center;
      color: #fff;
      font-size: 16px;
      &:hover {
        cursor: pointer;
      }
    }
    &-user {
      width: 36px;
      height: 36px;
      margin-left: 10px;
    }
  }
}

</style>
