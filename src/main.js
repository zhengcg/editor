// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/store'
import ElementUI from 'element-ui';
import router from './router'
import axios from './server'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/style.scss';//全局修改mint-UI样式 
import 'babel-polyfill';

Vue.prototype.axios = axios;
Vue.config.productionTip = false
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  router,
  store,
  template: '<App/>',
  components: { App }
})
