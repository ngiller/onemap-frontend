import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import vuescroll from 'vuescroll'
import KTabs from '@kevindesousa/vue-k-tabs'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(vuescroll, {
  name: 'myScroll' 
});
Vue.prototype.$vuescrollConfig = {
  bar: {
    background: '#848484',
    size: '3px',
  },
  scrollPanel: {
    scrollingX: false,
  }
};
Vue.use(KTabs)

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')
