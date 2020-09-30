/* eslint-disable no-empty-function */
import Vue from 'vue';
import SockJS from 'sockjs-client';
import Utils from '@/module/utils/Utils.module.js';
import TimerManager from '@/module/timerManager/TimerManager.module.js';
const Stomp = require('stompjs');
let try2ConnectCount = 5;
let webscoketIns = null

class WebScoket {
  isConnectSuccess = false;
  constructor() {
    if (webscoketIns) {
      return webscoketIns
    }
    this.vuePro = Vue.prototype;
    webscoketIns = this
  }

  /**
   * 设置连接锁
   */
  setConnectLock(value) {
    this.isConnectSuccess = value
  }

  /**
   * 初始化websocket
   */
  initWebSocket(params, url = '', subscribes = ['subscribeSendNotice']) {
    this.params = params;
    this.subscribes = subscribes;
    this.handelrUrl(url);
    !this.isConnectSuccess && this.connection();
  }

  /**
   * 处理websocket地址
   */
  handelrUrl(url) {
    if (url) {
      this.url = url;
    } else {
      // window.SOCKET_URL = ''
      url = window.SOCKET_URL ? window.SOCKET_URL : 'http://192.168.1.9:10053';
      let socketUrl = Utils.of().getSplitUrl(url);
      url = socketUrl.prefix + socketUrl.suffix.replace(/\/+/g, '');
      this.url = `${url}/live-websocket?token="fjkdsjfad"`;
    }
  }

  /**
   * 建立链接
   */
  connection() {
    try {
      // 连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
      this.socket = new SockJS(this.url);
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.debug = () => {};
      // 向服务器发起链接
      this.connectServer();
      this.isConnectSuccess = true;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 连接服务
   */
  connectServer() {
    this.stompClient.connect(
      {},
      () => {
        console.log('websocket连接成功');
        TimerManager.of().stopSetTimeout('websocket');
        this.subscribes.forEach(item => {
          typeof this[item] === 'function' && this[item]();
        });
      },
      err => {
        console.error(err);

        if (try2ConnectCount <= 0) {
          TimerManager.of().stopSetTimeout('websocket');
        } else {
          TimerManager.of()
            .addSetTimeout('websocket', () => {
              console.log('连接中断,尝试重新连接...');
              this.connection();
              try2ConnectCount--;
            })
            .startSetTimout('websocket', 3 * 1000);
        }
      }
    );
  }
  subscribeSendNotice() {
    try {
      this.stompClient.subscribe('/topic/sendNotice', msg => {
        this.vuePro.$customEvent.trigger('update_announcement', true)
      });
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 断开链接
   */
  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
      TimerManager.of().stopSetTimeout('websocket');
    }
  }
}

WebScoket.of = function () {
  return new WebScoket();
};
export default WebScoket;
