import Vue from 'vue';
import App from './App.vue';
import SystemLoader from '@/module/systemLoader/SystemLoader.module';

SystemLoader.of()
  .bootstrap()
  .then(({ router, store }) => {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  });
