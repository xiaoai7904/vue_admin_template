<template>
  <Layout class="home">
    <Header>
      <HomeHeader />
    </Header>
    <Layout>
      <Sider width="200">
        <HomeSiderLeft />
      </Sider>
      <Content>
        <HomeContent />
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import Home from './Home.class';
export default Home
</script>

<style lang="less">
@import "../../styles/var.less";
@import "../../styles/mixins.less";
.home {
  &-content {
    &--nav {
      height: 36px;
      background-color: #fff;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
    }
    &--container {
      height: calc(100vh - 100px);
      padding: 15px;
      overflow: hidden;
      position: relative;
    }
    &--container > div:first-child {
      padding: 5px;
      background: #fff;
      border: 1px solid #e8e8e8;
    }
  }
  .ivu-layout-header {
    padding: 0 20px;
  }
}
</style>