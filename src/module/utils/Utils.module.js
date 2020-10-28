import numeral from 'numeral';
import CircularJSON from 'circular-json-es6';
import NP from 'number-precision';
import CryptoJS from 'crypto-js';
import MD5 from 'js-md5';

let instance = null;
/**
 * 系统工具函数
 */
class Utils {
  constructor() {
    if (instance) {
      return instance;
    }
    this.locale = localStorage.getItem('i18n') || 'zh-Hans-CN';
    NP.enableBoundaryChecking(false);
    this.NP = NP;
    instance = this;
    return instance;
  }
  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  types(data) {
    return Object.prototype.toString.call(data);
  }
  extend(data) {
    return CircularJSON.parse(CircularJSON.stringify(data));
  }
  $extend(...arg) {
    let [target, deep, i, clone, src, option, length, copy, isArray] = [];

    target = arg[0] || {};
    i = 1;
    deep = false;
    length = arg.length;

    if (typeof target === 'boolean') {
      deep = target;
      target = arg[i] || {};
      i++;
    }

    for (; i < length; i++) {
      if ((option = arg[i]) !== null) {
        for (let name in option) {
          copy = option[name];

          if (name === '__proto__' || target === copy) {
            continue;
          }

          if (deep && copy !== void 0 && ((isArray = this.types(copy) === '[object Array]') || this.types(copy) === '[object Object]')) {
            src = target[name];
            if (isArray && this.types(src) !== '[object Array]') {
              clone = [];
            } else if (!isArray && this.types(src) !== '[object Object]') {
              clone = {};
            } else {
              clone = src;
            }
            isArray = false;

            target[name] = this.extend(deep, clone, copy);
          } else if (this.types(copy) !== void 0) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  }
  formatNumber(value, fixed = 2) {
    return numeral(value).format(`0,${(0).toFixed(fixed)}`);
  }
  debounce(fn, wait, options) {
    wait = wait || 0;
    var timerId;

    var debounced = (...arg) => {
      if (timerId) {
        clearTimeout(timerId);

        timerId = null;
      }
      timerId = setTimeout(() => {
        fn(...arg);
      }, wait);
    };
    return debounced;
  }
  throttle(fn, wait) {
    let _lastTime = null;

    return function() {
      let _nowTime = +new Date();
      if (_nowTime - _lastTime > wait || !_lastTime) {
        fn(...arguments);
        _lastTime = _nowTime;
      }
    };
  }
  // 日期格式化
  dateFormat(date, format) {
    var dateTime = new Date(date);
    var o = {
      'M+': dateTime.getMonth() + 1, //month
      'd+': dateTime.getDate(), //day
      'h+': dateTime.getHours(), //hour
      'm+': dateTime.getMinutes(), //minute
      's+': dateTime.getSeconds(), //second
      'q+': Math.floor((dateTime.getMonth() + 3) / 3), //quarter
      S: dateTime.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (dateTime.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
      }
    }
    return format;
  }
  // 判断浏览器系统
  getUserAgent = () => {
    let u = window.navigator.userAgent;
    if (u.indexOf('MicroMessenger') > -1) {
      return 'weixin';
    } else if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
      return 'android';
    } else if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      return 'ios';
    } else if (u.match(/\sQQ/i) === 'qq') {
      return 'qq';
    } else {
      return '';
    }
  };
  // aes cbc 解密方式
  decrypt(word, keys = '', ivs) {
    try {
      if (!keys) throw new Error('aes key is required!');
      // if(!ivs) throw new Error('aes iv is required!')
      let key = CryptoJS.enc.Utf8.parse(keys); //十六位十六进制数作为密钥
      let iv = CryptoJS.enc.Utf8.parse(keys); //十六位十六进制数作为密钥偏移量

      let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
      let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
      let decrypt = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      // 解密时decrypt.toString(CryptoJS.enc.Utf8)这句代码可能会遇到报错 --> Error: Malformed UTF-8 data，如果解密报错直接返回空字符串，防止程序错误
      let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
      // 如果无法解密或者解密失败都返回原始值
      if (decryptedStr.toString() === '') {
        return word;
      }
      return decryptedStr.toString();
    } catch (error) {
      return word;
    }
  }

  // aes cbc 加密方式
  encrypt(word, keys = '', ivs) {
    if (!keys) throw new Error('aes key is required!');
    // if(!ivs) throw new Error('aes iv is required!')
    let key = CryptoJS.enc.Utf8.parse(keys); //十六位十六进制数作为密钥
    let iv = CryptoJS.enc.Utf8.parse(keys); //十六位十六进制数作为密钥偏移量

    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString();
  }
  // md5 加密方式
  md5(word) {
    if (!word) throw new Error('word is required!');
    //
    return MD5(word);
  }
  formatDateStr(dateStr) {
    return !dateStr ? '--' : dateStr.replace(/T/g, ' ')
  }
}

Utils.of = function() {
  if (instance) {
    return instance;
  }
  return new Utils();
};

export default Utils;
