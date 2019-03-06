// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';
import record from 'components/record/record';
import store from './store'
import 'common/stylus/index.styl';
import http from '@/libs/httpRequest'
Vue.http = Vue.prototype.$http = http
Vue.use(VueRouter);
Vue.use(VueResource);
window.eventBus = new Vue()
var router = new VueRouter({
  linkActiveClass: 'active',
  routes: [
    { path: '/', redirect: '/goods' },
    { path: '/goods', component: goods },
    { path: '/ratings', component: ratings },
    { path: '/seller', component: seller },
    { path: '/record', component: record }
  ]
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

