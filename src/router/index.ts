import router from './router';
import store from '../store';

// 添加路由钩子对每个页面进行登录判断
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {
    if ((<any>store).state.user.auth) {
      next()
    } else {
      next({ path: '/login', query: { redirect: JSON.stringify({ path: to.path, query: to.query }) } })
    }
  } else {
    next()
  }
});



export default router;