import router from './router';
import store from './store';
import { Message } from 'element-ui';// element的消息提示框

import NProgress from 'nprogress'; // 进度条
import 'nprogress/nprogress.css' ;// 进度条css样式

import { getToken } from '@/utils/auth' ;//auth文件主要依赖js-cookie模块，把getToken，setToken，removeToken设置在这里
import getPageTitle from '@/utils/get-page-title';//get-page-title文件主要是网站的标题，get-page-title通过依赖setting.js里的title变量修改网站标题 //如果需要更改网站的标题，可以直接到setting.js修改title属性

NProgress.configure({ showSpinner: false }) ;//NProgress是封装的进度条，基本不用动

const whiteList = ['/login', '/auth-redirect'] ;//路由白名单列表，把路由添加到这个数组，不用登陆也可以访问


// 全局前置守卫
router.beforeEach( async(to, from, next) => {

  NProgress.start();// 请求路由时进度条开始
  document.title = getPageTitle(to.meta.title);// 设置标题
  const hasToken = getToken();// 这里的getToken()就是在上面导入的auth.js里的getToken()方法

  //如果存在token，即存在已登陆的令牌
  if (hasToken) {

    //如果用户存在令牌的情况请求登录页面，就让用户直接跳转到首页，避免存在重复登录的情况
    if (to.path === '/login') {
      next({ path: '/monitor/dashboardmonitor' });// 直接跳转到首页，当然取决于你的路由重定向到哪里
      NProgress.done();//一定要关闭进度条
    } else {
      //如果已经有令牌的用户请求的不是登录页，是其他页面
      const hasInfo = store.getters.emailAddress; //就从Vuex里拿到用户的信息，这里也证明用户不是第一次登录了
      if (hasInfo) {
        // 刷新浏览器后，重新请求动态路由
        if(store.state.permission.addRoutes.length == 0){
          const accessRoutes = await store.dispatch('permission/generateRoutes',  store.getters.roles);
          await router.addRoutes(accessRoutes);
          next({ ...to, replace: true });
        }

        next();

      }else{
        try {
          // 如果有令牌，但是没有用户信息，向后台获取用户信息，并存到内存中去
          await store.dispatch('user/getInfo');
          const accessRoutes = await store.dispatch('permission/generateRoutes',  store.getters.roles);
          await router.addRoutes(accessRoutes);
          next({ ...to, replace: true });
        } catch (error) {
          // 如果出错了，把令牌去掉，并让用户重新去到登录页面
          await store.dispatch('user/resetToken');
          Message.error(error || 'Has Error');
          next(`/login`);
          NProgress.done();
        }
      }

    }


  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 是白名单列表的话，通行
      next();
    } else {
      // 不是白名单列表的话，重定向到登录页面
      next(`/login`);
      NProgress.done();
    }
  }


});


// 全局后置守卫
router.afterEach(() => {
  // 结束进度条
  NProgress.done();
});
