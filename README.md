# vue_admin_template
vue中台系统模版

[在线预览](https://xiaoai7904.github.io/vue_admin_template/)

### 介绍

项目基于`Vue`,`view-design`进行开发,项目根据中台系统页面公用特性封装了很多公用组件,使用公用组件可以通过堆积木的形式快速开发页面,解决基础页面开发效率

```
npm run serve // 启动开发环境
npm run build // 打包生产环境包
```
可以通过配置`package.json`中的`scripts`对象进行配置开发环境代理服务器地址

具体配置如下:

```json
"scripts": {
    "serve_custom": "vue-cli-service serve --url=http://192.168.1.188:8080", // 配置代理服务器地址
    "build": "vue-cli-service build"
},
``` 

```javascript
// vue.config.js部分代码
const proxy = {
  target: 'http://192.168.1.188:8080',
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
  devServer: {
    proxy: {
      '/sys': proxy // 配置代理服务器地址
    }
  }
};
```

```
npm run serve_custom // 开发环境服务器代理到http://192.168.1.188:8080
```
### 项目目录结构
``` bash
│
├── README.md                           <=  项目介绍
├── src                                 <=  项目主目录
│   ├── assets                          <=  静态资源
│   ├── components                      <=  公共组件
│   │   ├── collapseTransition          <=  折叠组件  
│   │   ├── pageEditorView              <=  富文本编辑器
│   │   ├── pageForm                    <=  搜索表单组件
│   │   ├── pageLoading                 <=  页面loading组件
│   │   ├── pageModal                   <=  弹窗组件
│   │   ├── pageNavTag                  <=  打开页面tag标签组件
│   │   ├── pageResetPassword           <=  重置密码组件
│   │   ├── pageScrollbar               <=  页面滚动条组件
│   │   ├── pageTable                   <=  表格组件 
│   │   ├── pageTitle                   <=  页面标题组件
│   ├── lib                             <=  三方库
│   ├── mixins                          <=  页面公共逻辑    
│   ├── modules                         <=  系统模块
│   │   ├── export2excel                <=  导出excel
│   │   ├── historyRecord               <=  历史堆栈
│   │   ├── http                        <=  请求模块
│   │   ├── mock                        <=  mock数据模拟
│   │   ├── observer                    <=  事件监听模块
│   │   ├── routerStack                 <=  浏览页面路由堆栈
│   │   ├── rule                        <=  页面表单验证
│   │   ├── systemConfig                <=  系统全局配置
│   │   ├── systemLoader                <=  系统加载器
│   │   ├── utils                       <=  工具类
│   ├── router                          <=  路由配置
│   ├── store                           <=  数据存储器
│   ├── styles                          <=  系统样式
│   ├── views                           <=  页面
│   ├── App.vue                         <=  页面组件文件
│   ├── main.js                         <=  系统主入口文件
├── publilc                             <=  项目静态文件目录
├── vue.config.js                       <=  vue打包,启动等配置(详细参数 https://cli.vuejs.org/zh/config/)  
├── package.js                          <=  项目跟踪依赖关系和元数据配置文件
│
```

### 快速生成页面

通过使用公用title组件([PageTitle](src/components/pageTitle/PageTitle.class.js)),表单搜索组件([PageForm](src/components/pageForm/PageForm.class.js)),数据表格组件([PageTable](src/components/pageTable/PageTable.class.js)),进行快速生成基本通用数据展示过滤页面

### 组件使用介绍
##### PageTitle

```javascript
<template>
    <PageTitle :options="pageTitleOptions"/>
</template>

<script>
    export default {
        data() {
            return {
                pageTitleOptions: {
                    name: '',// 如果没有配置值默认组件内部会使用左侧菜单名字
                    render(h) {} // 可以自定义标题
                } 
            }
        }
    }
</script>  
```
##### PageForm

```javascript
<template>
    <PageForm ref="pageFormRefs" :options="pageFormOptions"/>
</template>

<script>
    // 部分代码
    export default {
        data() {
            const _this = this;
            return {
                pageFormOptions: {
                    inline: true,
                    config: [
                        {
                            id: 'userName', // 对应后台查询字段
                            type: 'input', // 表单类型(input,select,cascader,button,datePicker,switch,radio,slider,customRender) 详情配置可参考pageForm组件
                            name: '账号', // 表单lable
                            options: { // 对应类型表单单独配置
                                value: '' // 表单值
                            }
                        },
                        {
                            id: 'submit', // 查询id固定为submit
                            type: 'button',
                            name: '查询',
                            options: {
                                // 查询回调函数必须返回promise对象
                                click: () => _this.pageFormSearchBtnCallback() 
                            }
                        },
                        {
                            id: 'reset', // 重置id固定为reset
                            type: 'button',
                            name: '重置',
                            options: {
                                type: 'default',
                                // 重置回调函数必须返回promise对象
                                click: () => _this.pageFormResetBtnCallback() 
                            }
                        }
                    ]
                }
            }
        },
        methods: {
            requestList() {
                // 请求后台数据
            },
            /**
             * 页面表单筛选搜索按钮回调
             */
            pageFormSearchBtnCallback() {
                return new Promise((resolve, reject) => {
                    this.requestList().finally(() => resolve());
                });
            },
            /**
             * 页面表单筛选重置按钮回调
             */
            pageFormResetBtnCallback() {
                return new Promise((resolve, reject) => {
                    this.$refs.pageFormRefs.resetData();
                    this.requestList().finally(() => resolve());
                });
            },
        }
    }
</script>  
```

##### PageTable

```javascript
<template>
    <PageTable :options="pageTableOptions" @change-table-pagination="changeTablePagination"/>
</template>

<script>
    // 部分代码
    export default {
        data() {
            const _this = this;
            return {
                pageTableOptions: {
                    loading: false, // 表格loading标示
                    requestList: this.requestList, // 表格请求数据函数
                    // 详情配置可以参数(https://www.iviewui.com/components/table)
                    header: [
                        {
                            title: '用户名', // 表头名称
                            key: 'userName', // 对应表头key
                            align: 'center' // 居中显示
                        }
                    ],
                    data: [], // 表格数据
                    pagination: { // 配置表格分页,如果不支持分页可以不配置该对象
                        pageSize: 20,
                        total: 0,
                        page: 1
                    }
                }
            }
        },
        methods: {
            requestList() {
                // 请求后台数据
            },
            // 更新分页数据
            changeTablePagination() {
                this.pageTableOptions && this.pageTableOptions.pagination && (this.pageTableOptions.pagination = Object.assign({}, this.pageTableOptions.pagination, page));
            }
        }
    }
</script>  
```
##### PageModal

```javascript
<template>
    <PageModal :options="pageModalOptions" @ok="okPageModal" @cancel="cancelPageModal"><!--弹窗内容dom--></PageModal>
</template>

<script>
    // 部分代码
    export default {
        data() {
            return {
                 pageModalOptions: {
                    show: false, // 控制显示隐藏弹窗
                    btnLoading: false, // 确定按钮loadig(请求保存数据会有使用)
                    title: '新增' // 弹窗标题
                }
            }
        },
        methods: {
            okPageModal() {
              this.pageModalOptions.show = false
            },
            cancelPageModal() {
               this.pageModalOptions.show = false
            }
        }
    }
</script>  
```

### Mock数据

系统内置`Mock`数据,详情查看源码[mock](src/module/mock/mock.module.js),通过配置[mock.json](src/module/mock/mock.json.js)数据,数据key对应[SystemConfig.js](src/module/systemConfig/SystemConfig.module.js)配置的`httpUrl`

项目默认使用Mock数据,如果需要修改可以在项目路径[config.js](public/config.js)`public/config.js`修改`window.environment = 'dev'`变量值,`dev`为使用mock数据,对应判断逻辑在[Http](src/module/http/Http.module.js),`src/module/http/Http.module.js`

```javascript
 get(url, params) {
    // config.js配置变量值 
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
```

### 路由配置

路由数据根据后台返回菜单(目前项目内置接口地址为:`/sys/menu/nav`)列表进行了动态生成,默认配置如下:

```javascript
// router.config.js
export const requestRouterConfig = {
    // 首页, key值对应后台菜单url
    '/home/home': {
        component: () => import('@/views/dashboard/Home.view'),
    }
}

// createSystemMenu.class.js

// 根据后台返回的菜单数据匹配router.config配置路由信息动态生成
create(menuList) {
    // 具体逻辑请查看 src/router/createSystemMenu.class.js
}
```

>Tips: 系统默认使用了`hash 模式`如果需要更换`history 模式`请修改`router.js`文件配置

### 权限管理

###### 1.菜单权限

系统内置菜单权限通过后台返回的菜单数据和路由配置匹配动态生成菜单列表

###### 2.页面操作权限

页面操作权限通过当前用户登录信息接口地址('/sys/menu/nav')返回字段`permissions`进行判断,该字段是一个数组结构,里面存储每个页面操作项权限唯一标示


### 国际化

系统内置国际化`vue-i18n`,具体api请查看官方文档[vue-i18n文档](https://kazupon.github.io/vue-i18n/zh/api/)

###### 配置
通过`src/i18n`文件进行国际化配置,中文环境配置[zh.js](src/i18n/zh.js),英文环境配置[en.js](src/i18n/en.js)
```javascript
// zh.js
export default {
    login_title: '账号登录'
}
// en.js
export default {
    login_title: 'Account login'
}
// 国际化配置入口文件 src/i18n/index.js
import zh from './zh'
import en from './en'

// 引入三方库国际化文件
import viewEn from 'view-design/dist/locale/en-US'
import viewZh from 'view-design/dist/locale/zh-CN'

const messages = {
    en: Object.assign({}, en, viewEn),
    zh: Object.assign({}, zh, viewZh)
}

// 挂载国际化
const i18n = new VueI18n({
    locale: localStorage.getItem('i18n') || 'en',  
    messages
});

new Vue({
    i18n,
    render: h => h(App)
}).$mount('#app');
```


###### 使用
具体使用方式请参考[登录页面代码](src/views/login/Login.view.vue)

```javascript
// 模版文件使用方式
<h1>{{$t('login_title')}}</h1>
// js使用方式
this.$t('login_title')
```
`vue-i18n`会在Vue原型上面挂载`$t`函数

>Tips: 系统目前只有登录页面使用国际化,其他页面暂时没有添加国际化配置

### 后期版本计划

* 页面自适应支持
* 通用页面封装

**项目持续更新中...**