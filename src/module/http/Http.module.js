/**
 * 请求工具
 */
import Vue from 'vue';
import axios from 'axios';
import mock from '@/module/mock/mock.module';

class Http {
  constructor() {
    this.local = localStorage.getItem('i18n') || 'zh-Hans-CN';
    this.$http = axios.create({});
    this.init();
  }
  init() {
    this._defaultsConfig();
    this._interceptRequest();
    this._interceptResponse();
  }
  _defaultsConfig() {
    this.$http.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
    this.$http.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
    this.$http.defaults.responseType = 'json';
    this.$http.defaults.validateStatus = function(status) {
      return true;
    };
  }
  _interceptRequest() {
    this.$http.interceptors.request.use(request => request, error => Promise.reject(error));
  }
  _interceptResponse() {
    this.$http.interceptors.response.use(
      response => {
        if (response.status === 200 && response.data && response.data.code === 0) {
          return Promise.resolve(response);
        }
        if (response.data && response.data.code === 1401) {
          return Promise.reject(response);
        }
        if (response.data && blackCode.indexOf(response.data.code) > -1) {
          return Promise.reject(response);
        }
        if (response.data && response.data.code) {
          Vue.prototype.$Message.error(response.data.msg);
          return Promise.reject(response);
        }
        if (response.data && response.data.status) {
          Vue.prototype.$Message.error('服务器异常');
        }
        if (!response.data) {
          Vue.prototype.$Message.error('连接超时');
        }
        return Promise.reject(response);
      },
      error => {
        Vue.prototype.$Message.error('数据拉取失败,请检查您的网络');
        return Promise.reject(error);
      }
    );
  }
  get(url, params) {
    if(window.environment === 'dev') {
      return mock(url)
    }
    
    return this.$http.get(url, params);
  }
  post(url, params) {
    if(window.environment === 'dev') {
      return mock(url)
    }
    
    return this.$http.post(url, params);
  }
}

Http.of = function() {
  return new Http();
};

export default Http;
