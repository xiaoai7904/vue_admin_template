<template>
  <div class="page-loading">
    <Spin fix>
      <div class="sk-fade-in sk-spinner line-scale-pulse-out" style="color: rgb(222, 139, 73)">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </Spin>
  </div>
</template>

<script>
import PageLoading from './PageLoading.class';
export default PageLoading;
</script>

<style lang="less">
.sk-spinner {
  color: #333;
}
.ivu-spin-fix {
  background-color: transparent !important;
}
.sk-spinner > div {
  background-color: currentColor;
}
.line-scale-pulse-out > div {
  width: 4px;
  height: 35px;
  border-radius: 2px;
  margin: 2px;
  animation-fill-mode: both;
  display: inline-block;
  animation: line-scale-pulse-out 0.9s -0.6s infinite cubic-bezier(0.85, 0.25, 0.37, 0.85);
}
.line-scale-pulse-out > div:first-child,
.line-scale-pulse-out > div:nth-child(5) {
  animation-delay: -0.2s !important;
}
.line-scale-pulse-out > div:nth-child(2),
.line-scale-pulse-out > div:nth-child(4) {
  animation-delay: -0.4s !important;
}

@keyframes sk-fade-in {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes line-scale-pulse-out {
  0% {
    transform: scaley(1);
  }
  50% {
    transform: scaley(0.4);
  }
  100% {
    transform: scaley(1);
  }
}
.sk-fade-in {
  animation: sk-fade-in;
}

.sk-fade-in-half-second {
  animation: sk-fade-in;
}

.sk-fade-in-quarter-second {
  animation: sk-fade-in;
}
</style>
