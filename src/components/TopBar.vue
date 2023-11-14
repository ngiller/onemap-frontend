<template>
  <div class="topbar" :class="{ 'topbar-sidebar-enable': sidebar_show }">
    <div class="header-left">
      <div class="topnav">
        <div class="menutoggle" @click="showleftbar">
          <span class="menu__handle">
            <span>Menu</span>
          </span>
        </div>
        <a href="#" v-on:click="summaryClick" style="text-decoration:none">
          <div class="resumetoggle">
            SUMMARY 
            <i :class="{ 'icon-arrow-up': summary_show, 'icon-arrow-down': !summary_show, }" style="padding-left: 5px;"></i>
          </div>
        </a>
        <!--<div class="menu-space"> | </div>
        <div class="top-menu">
          Desa Bambu
        </div>
        <div class="menu-space"> | </div>
        <div class="top-menu">
          E-Library
        </div>-->
      </div>
    </div>
    
    <!--<div class="header-right">
        <ul class="header-menu nav navbar-nav">
            <li class="dropdown" id="user-header">
              <a href="#" class="user-login" v-on:click="signinClick">
                    <i class="icon-user"></i>&nbsp;
                    <span class="username">Signin</span>
              </a>
            </li>
        </ul>
    </div>
    <loginForm/>-->
  </div>
  
</template>

<script>
import store from '@/store'
import LoginForm from './LoginForm.vue'

export default {
  name: "TopBar",
   data() {
    return {
      user_name: null,
      user_passwd: null,
    }
   },
  components: {
    loginForm: LoginForm
},
  computed: {
      sidebar_show() {
          return store.state.leftbar_show;
      },
      summary_show() {
        return store.state.summary_show;
      },
  },
  created() {
      window.addEventListener("resize", this.resizeBrowserHandler);
      if (window.innerWidth < 530) {
          store.commit('hideleftbar')
          store.commit('mobile')
      } else {
          store.commit('showleftbar');
          store.commit('desktop')
      }
      store.commit('hidesummary');
  },
  methods: {
    showleftbar() {
        if (store.state.leftbar_show) {
            store.commit('hideleftbar')
        } else {
            store.commit('showleftbar');
        }
    },
    resizeBrowserHandler (e) {
        if (e.target.innerWidth < 530) {
            store.commit('hideleftbar')
            store.commit('mobile')
        } else {
            store.commit('showleftbar')
            store.commit('desktop')
        }
    },
    summaryClick() {
        if (store.state.summary_show) {
          store.commit('hidesummary')
        } else {
          store.commit('showsummary');
        }
    },
    signinClick() {
      if (store.state.login_form) {
          store.commit('hideloginform')
        } else {
          store.commit('showloginform');
        }
    }
  }
};
</script>