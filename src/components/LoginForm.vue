<template>
    <div class="login-page" v-if="login_show">
        <div class="login-close" @click="loginFormClick"><i class="icon-close" style="margin-top: 3px; font-size: 22px; cursor: pointer;"></i></div>
        <div class="login-form">
            <h2>Signin</h2>
            <div class="input-icons">
                <i class="fa-solid fa-envelope icon"></i>
                <input class="input-field" placeholder="Email address" aria-label="Username" name="username" v-model="emailLogin" type="email"  required>
                <i class="fa-solid fa-lock icon"></i>
                <input type="password" class="input-field" placeholder="Password" aria-label="Password" name="password" v-model="passwordLogin" required>
            </div>
            <div class="button-right">
                <button type="submit" @click="doLogin">Login</button>
            </div>
        </div>
    </div>
</template>

<script>

import store from '@/store'

export default ({
    name: "loginForm",
    data: function () {
        return {
            emailLogin: "",
            passwordLogin: "",
        }
   },
   computed: {
    login_show() {
          return store.state.login_form;
      },
   },
   methods: {
      doLogin() {
         if (this.emailLogin === "" || this.passwordLogin === "") {
            this.emptyFields = true;
         } else {
            alert("You are now logged in");
         }
      },
      loginFormClick() {
        if (store.state.login_form) {
            store.commit('hideloginform')
        } else {
            store.commit('showloginform')
        }
      }
   }
})

</script>
