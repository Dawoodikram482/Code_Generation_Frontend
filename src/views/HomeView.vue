<script setup>
  import {useUserRole} from "@/stores/userRole.js";
  import {useUserSessionStore} from "@/stores/UserSession.js";

  const { isLoggedIn, forEmployee, forCustomer } = useUserRole();

  const logout = () => {
    const userSessionStore = useUserSessionStore();
    userSessionStore.logout();
    this.$router.push('/login'); // Redirect to the login page after logout
  }
</script>

<template>
  <div class="home">
    <img src="/src/assets/logo.png" width="300px">
    <h1>Welcome to Meow Bank!</h1>
    <h2>How can we help you today?</h2>
      <div class="buttons" v-if="isLoggedIn">
        <router-link to="/atm" class="btn-atm">ATM</router-link>
        <router-link to="/accountOverview">Dashboard</router-link>
        <a @click="logout">Logout</a>
      </div>
      <div class="buttons" v-else>
        <router-link to="/login" class="btn-login">Login</router-link>
        <router-link to="/Registration" class="btn-login">Register</router-link>
      </div>
  </div>
</template>

<style scoped>
  .home {
    margin-top: 5rem;
    text-align: center;
  }

  h1 {
    font-size: 3rem;
    font-weight: 500;
    line-height: 1rem;
  }

  h2 {
    font-size: 2rem;
    font-weight: 400;
  }

  .buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
    margin: 0 auto;
  }

  .buttons a {
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    background: #008773;
    color: #fff;
    font-size: 1.2rem;
  }
</style>