import Vue from 'vue';
import App from './App.vue';
import SystemLoader from '@/module/systemLoader/SystemLoader.module';

SystemLoader.of()
  .bootstrap()
  .then(({ router, store, i18n }) => {
    new Vue({
      router,
      store,
      i18n,
      render: h => h(App)
    }).$mount('#app');
  });
