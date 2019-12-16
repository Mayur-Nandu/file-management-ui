// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
import App from './App'
import router from './router'
import install from '../plugins/authenticate'
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(install)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
