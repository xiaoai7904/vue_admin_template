const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

function dateFormat(date, format) {
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

const proxy = {
  target: 'http://',
  changeOrigin: true
};

if (process.env.NODE_ENV !== 'production') {
  let processArgv = process.argv;
  let _url = processArgv[processArgv.length - 1].match(/url=(.*)/);
  if (_url && _url.length >= 2) {
    proxy.target = `${_url[1]}`;
  }
}

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'vue admin',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  configureWebpack: {},
  chainWebpack: config => {
    const date = dateFormat(new Date().getTime(), 'yyyyMMddhhmm');
    config.output.filename(`js_${date}/[name].[hash:8].js`).chunkFilename(`js_${date}/[name].[hash:8].js`);
  },
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/sys': proxy
    }
  }
};
