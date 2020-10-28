import Vue from 'vue';
import Vuex from 'vuex';
import {httpUrl} from '@/module/systemConfig/SystemConfig.module.js';
import Http from '@/module/http/Http.module';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {}, // 用户信息
    routerList: [],
    menuList: [],
    openRouterStack: [], // 当前打开的菜单所有列表
  },
  mutations: {
    setUserInfo(state, options) {
      state.userInfo = options;
    },
    setRouterList(state, data) {
      state.routerList = data;
    },
    setMenuList(state, data) {
      state.menuList = data;
    },
    setOpenRouterStack(state, data) {
      state.openRouterStack = data
    },
  },
  actions: {
    requestUserInfo({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        Http.of()
          .post(httpUrl.getUserInfo, {})
          .then(
            data => {
              if (data.data.code === 0) {
                commit('setUserInfo', data.data);
                resolve(data);
              } else {
                localStorage.removeItem('isLogin');
                reject(data);
              }
            },
            err => {
              localStorage.removeItem('isLogin');
              reject(err);
            }
          );
      });
    }
  },
  modules: {
    // TODO 页面级数据全部放在对应的模块里面，并且需要添加命名空间(namespaced: true)
  }
});
