<script>
import PageNavTag from './PageNavTag.class';
export default PageNavTag;
</script>

<style lang="less">
.page-nav-tag {
  height: 100%;
  &--item {
    width: 80px;
    height: 30px;
    padding: 0 5px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    background-color: #515a6e;
    color: rgba(255,255,255,.7);
    border-radius: 2px;
    position: relative;
    &:hover {
      cursor: pointer;
      color: rgba(255,255,255,1);
    }
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .ivu-icon-md-add {
      position: absolute;
      top: 0;
      right: 0;
      transform: rotate(45deg);
      &:hover {
        color: #b0d658;
      }
    }
  }
  &-item--check {
      color: rgba(255,255,255,1);
      background-color: #2d8cf0;
  }
  .swiper-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    padding: 0 5px;
  }
}
</style>