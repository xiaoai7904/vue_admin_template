<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { httpUrl } from '@/module/systemConfig/SystemConfig.module.js';
import { debounce } from 'lodash';
import { add } from '@/module/routerStack/RouterStack.module'

export default {
  name: 'App',

  watch: {
    '$route': {
      handler(newValue) {
        if (!~['/', '/login'].indexOf(newValue.path)) {
          add(newValue)
        }
      }
    },
  },

  mounted() {
    this.bindEvent()

    if (!!localStorage.getItem('isLogin')) {
      window.addEventListener('resize',
        debounce(() => {
          this.$customEvent.trigger('resize-table') //控制表格height
        }, 300)
      )

    }
  },

  methods: {
    bindEvent() {
      this.$customEvent.on('login_success', data => {
        this.systemInit(data)
      })
    },
    systemInit(userfront) {}
  }
}
</script>
<style lang="less">
</style>
