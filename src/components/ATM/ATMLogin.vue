<template>
  <img src="/src/assets/atm-logo.png">
  <div class="atm-login">
    <label>Enter Your E-Mail</label>
    <input type="text" class="email-input" v-model="email">
    <label>Enter Your Password</label>
    <input type="password" class="pin-input" v-model="password">
    <button class="btn-login" @click="login">Log in</button>
  </div>
</template>

<script>
  import { ref } from 'vue';
  import {useUserSessionStore} from "@/stores/UserSession.js";
  import {useRouter} from "vue-router";
  export default {
    setup() {
      const userSessionStore = useUserSessionStore();
      const email = ref('');
      const password = ref('');
      const router = useRouter();

      const login = async () => {
        await userSessionStore.login(email.value, password.value);
        await router.replace({name: 'atm-accounts'});
      };

      return {
        email,
        password,
        login
      };
    }
  };
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

  .atm-login {
    font-family: "Roboto Mono", serif;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    text-align: center;
  }

  img {
    display: block;
    margin: 2rem auto;
    width: 200px;
  }

  label {
    color: #000;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  input {
    height: 50px;
    border-radius: 10px;
    border: 4px solid #E3E3E3;
    background: rgba(255, 255, 255, 0.70);
    transition: 300ms;
    padding: 0 1rem;
    margin: 0 auto 1rem;
  }

  input:focus-visible {
    outline: none;
    border: 4px solid rgba(0, 135, 115, 0.59);
  }

  .email-input {
    width: 80%;
    max-width: 350px;
  }

  .pin-input {
    width: 60%;
    max-width: 200px;
  }

  .btn-login {
    width: 120px;
    height: 50px;
    font-size: 16px;
    border-radius: 10px;
    border: 4px solid #008773;
    background: rgba(0, 135, 115, 0.70);
    margin: 0 auto;
    transition: 300ms;
  }

  .btn-login:hover {
    background: rgba(0, 135, 115, 0.90);
    color: #fff;
  }
</style>