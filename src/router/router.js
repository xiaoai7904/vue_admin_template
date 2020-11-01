import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/store';
import CreateSystemMenu from './createSystemMenu.class';
import { defaultRouterConfig } from './router.config';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: defaultRouterConfig
});

const CreateSystemMenuIns = new CreateSystemMenu();

router.beforeEach((to, from, next) => {
  if(to.path === '/test') {
    next()
    return;
  }

  if (localStorage.getItem('isLogin') === 'true') {
    initRouter(to, from, next);
    return;
  }
  // 如果未登录并且没有在登录页 直接跳转到登录页
  to.path !== '/login' ? next('/login') : next();
});

function initRouter(to, from, next) {
  if (!store.state.routerList.length) {
    store.dispatch('requestUserInfo').then(
      data => {
        let systemMenu = CreateSystemMenuIns.create(data.data.userinfo.menuList);
        store.commit('setRouterList', systemMenu.getRouterList());
        store.commit('setMenuList', systemMenu.getMenuList());

        router.addRoutes(systemMenu.getRouterList());
        // 如果登录成功,页面在登录页直接跳转到主页
        to.path === '/login' ? next('/') : next({ ...to, replace: true });
      },
      err => {
        next('/login');
      }
    );
    return false;
  }

  next();
}
export default router;
