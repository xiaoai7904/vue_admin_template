<script>
import PageTable from './PageTable.class';
export default PageTable;
</script>

<style lang="less">
.table-container {
  padding: 10px;
  position: relative;
  // margin-top: 15px;
  .ivu-table-wrapper {
    overflow: inherit !important;

    .table-footer-page {
      float: right;
      margin-right: 10px;
    }
  }

  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
  .ivu-spin-show-text .ivu-spin-text {
    width: 100px;
  }
  .loading-text {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
  }
  .dot {
    display: inline-grid;
    height: 1em;
    line-height: 1;
    text-align: left;
    vertical-align: -0.25em;
    overflow: hidden;
  }
  .dot::before {
    display: inline-block;
    content: '...\A..\A.';
    white-space: pre-wrap; /* 也可以是white-space: pre */
    animation: dot 1s infinite step-start both;
  }
  @keyframes dot {
    33% {
      transform: translateY(-2em);
    }
    66% {
      transform: translateY(-1em);
    }
  }
  .ivu-table-body {
    overflow: auto;
  }
}
</style>
