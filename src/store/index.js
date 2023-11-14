import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
export default new Vuex.Store({
    state: {
      leftbar_show: true,
      summary_show: false,
      ismobile: false,
      login_form: false,
    },
    mutations: {
      showloginform(state) {
        state.login_form = true
      },
      hideloginform(state) {
          state.login_form = false
      },
      showleftbar(state) {
        state.leftbar_show = true
      },
      hideleftbar(state) {
          state.leftbar_show = false
      },
      showsummary(state) {
        state.summary_show = true
      },
      hidesummary(state) {
          state.summary_show = false
      },
      mobile(state) {
          state.ismobile = true
      },
      desktop(state) {
          state.ismobile = false
      },
    },
})


