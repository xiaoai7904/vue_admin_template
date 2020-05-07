<script>
import PageForm from './PageForm.class';
export default PageForm;
</script>

<style lang="less">
.page-form {
  &-inline {
    height: 50px;
    padding: 15px 0 0 0;
    overflow: hidden;
    .ivu-form {
      height: 100%;
    }
    .ivu-form-inline {
      .ivu-form-item {
        width: 260px;
        margin-bottom: 0;
      }
    }
    .ivu-select {
      width: 160px;
    }
  }

  &-btn {
    width: auto !important;
    .ivu-form-item-content {
      margin-left: 0 !important;
    }
  }
  &-expand {
    display: inline-block;
    vertical-align: -8px;
    &:hover {
      color: #57a3f3;
      cursor: pointer;
    }
    &--child {
      .ivu-poptip-popper {
        // width: 100%;
        box-sizing: border-box;
      }
      .ivu-poptip-popper[x-placement^="bottom"] {
        padding: 10px 10px 7px 10px;
      }
      .ivu-poptip-inner {
        padding: 10px 0;
        white-space: normal;
      }
      .ivu-poptip-popper[x-placement="bottom"] .ivu-poptip-arrow {
        right: 45px;
        left: inherit;
      }
    }
    &--icon1 {
      transition: all 0.5s;
    }
    &--icon2 {
      transition: all 0.5s;
      transform: rotate(180deg);
    }
  }
  &-show--container {
    white-space: nowrap;
    display: inline-block;
  }
  .ivu-date-picker {
    width: 100%;
  }
  .ivu-select {
    width: 100%;
  }
}
</style>
