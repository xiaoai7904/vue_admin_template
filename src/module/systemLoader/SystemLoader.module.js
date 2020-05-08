import Vue from 'vue';
import router from '@/router/router';
import store from '@/store/store';
import VueI18n from 'vue-i18n';
import ViewUI from 'view-design';

import Observer from '@/module/observer/Observer.module';
import Http from '@/module/http/Http.module';

import PageScrollbar from '@/components/pageScrollbar/PageScrollbar.view';
import PageLoading from '@/components/pageLoading/PageLoading.view';
import PageTable from '@/components/pageTable/PageTable.view';
import PageForm from '@/components/pageForm/PageForm.view';
import PageTitle from '@/components/pageTitle/PageTitle.view';
import PageTableTool from '@/components/pageTableTool/PageTableTool.view';
import PageModal from '@/components/pageModal/PageModal.view'
import PageMenuItem from '@/components/menu/menu-item'
import Viewer from 'v-viewer'
import { messages } from '@/i18n'
import FastClick from 'fastclick';

import 'viewerjs/dist/viewer.css'
import 'view-design/dist/styles/iview.css';
import '@/styles/index.less';
import 'element-ui/lib/theme-chalk/index.css';

// 解决click 300ms延迟问题
FastClick.attach(document.body);

const ObserverClass = Observer.of();

let i18n 

/**
 * 系统初始化加载器
 * 全局对象 全局组件可以在这里进行初始化
 */
class SystemLoader {
  mountGlobalVariable() {
    window.xa = {};
    window.xa.vue = Vue;
    window.xa.router = router;
    window.xa.store = store;
    window.xa.systemEvent = ObserverClass;
    return this;
  }
  mountGlobalComponents() {
    const componentsMap = {
      PageScrollbar,
      PageLoading,
      PageTable,
      PageForm,
      PageTitle,
      PageTableTool,
      PageModal,
      PageMenuItem,
    };
    Object.keys(componentsMap).map(item => Vue.component(item, componentsMap[item]));
    return this;
  }
  mountGlobalVueConfig() {
    Vue.config.productionTip = false;
    return this;
  }
  mountGlobalVuePrototype() {
    Vue.prototype.$http = Http.of();
    Vue.prototype.$customEvent = ObserverClass;
    return this;
  }
  mountGlobalPlugin() {
    Vue.use(VueI18n);
    Vue.use(ViewUI);
    Vue.use(Viewer);
    i18n = new VueI18n({
      locale: localStorage.getItem('i18n') || 'en',  
      messages
    });
    return this;
  }
  bootstrap() {
    return new Promise((resolve, reject) => {
      this.mountGlobalVariable()
        .mountGlobalComponents()
        .mountGlobalVueConfig()
        .mountGlobalVuePrototype()
        .mountGlobalPlugin();

      resolve({ router, store, i18n });
    });
  }
}

SystemLoader.of = function() {
  return new SystemLoader();
};

export default SystemLoader;
