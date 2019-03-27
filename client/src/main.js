import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import InfiniteLoading from 'vue-infinite-loading';

Vue.config.productionTip = false
Vue.use(InfiniteLoading, { /* options */ });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
