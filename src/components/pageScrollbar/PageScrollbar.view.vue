<template>
  <div
    class="page-scrollbar"
    :class="customClassName"
    :style="getStyle"
    ref="pageScrollbar"
    @mouseenter="showScrollBar"
    @mouseleave="hideScrollBar"
  >
    <slot></slot>
  </div>
</template>

<script>
import PageScrollbar from './PageScrollbar.class';
export default PageScrollbar;
</script>

<style lang="less">
.page-scrollbar {
  position: relative;
  transform: translate3d(0, 0, 0);
  // overflow-y: hidden;
  // overflow-x: auto;
  // height: 100%;
  // .iScrollIndicator {
  //   background: rgba(144, 147, 153, 0.5) !important;
  //   border: 1px solid transparent !important;
  // }
  &:hover .iScrollVerticalScrollbar {
    opacity: 1;
  }
}
</style>
