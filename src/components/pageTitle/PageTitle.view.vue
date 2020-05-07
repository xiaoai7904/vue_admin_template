<script>
import PageTitle from './PageTitle.class';
export default PageTitle;
</script>

<style lang="less">
.page-title-view-item {
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  min-height: 26px;
}
.page-title-view-wrap {
  padding: 10px;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
  &-name {
    font-size: 15px;
  }
  &-content {
    display: inline-block;
    margin-left: 5px;
    .page-title-view-wrap-render:nth-of-type(1) {
      margin-left: 0;
    }
  }
  &-render {
    font-size: 13px;
    margin-left: 10px;
    i {
      color: #ef6289;
      font-style: normal;
    }
  }
  &-des {
    padding: 5px 0;
    margin-top: 10px;
    border-top: 1px solid #c3c3c3;
    .page-title-view-wrap-render:nth-of-type(1) {
      margin-left: 0;
    }
  }
  &-hostory {
    padding: 5px 0 0 0;
    margin-top: 5px;
    border-top: 1px solid #c3c3c3;
    .el-breadcrumb {
      height: 14px;
    }
    .el-breadcrumb__separator {
      margin: 0 3px;
    }
    .el-breadcrumb__inner {
      a {
        color: #598eff;
        text-decoration: underline !important;
      }
    }
    .el-breadcrumb__item:last-child {
      a {
        text-decoration: none !important;
      }
    }
  }
  &-setting {
    .ivu-btn {
      margin-right: 10px;
    }
  }
  .el-button {
    padding: 5px !important;
  }
  p {
    display: inline-block;
    font-size: 13px;
    margin: 0 10px;
    i {
      font-style: normal;
      color: rgb(239, 98, 137);
    }
  }
  .page-title-info {
    display: inline-block;
    margin-left: 10px;
    span {
      font-size: 12px;
      font-weight: normal;
    }
  }
}
</style>