<template>
  <div class="atm-container">
    <router-view></router-view>
  </div>
</template>

<script setup>
  import { computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import {useUserRole} from "@/stores/userRole.js";

  const userRole = useUserRole();
  const router = useRouter();

  const isLoggedIn = computed(() => userRole.isLoggedIn.value.value);

  if (router.currentRoute.value.path === '/atm' && isLoggedIn) {
    router.replace({ name: 'atm-accounts' });
  } else if (router.currentRoute.value.path.startsWith('/atm') && !isLoggedIn) {
    router.replace({ name: 'atm-login' });
  }
</script>

<style scoped>
  .atm-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
    max-width: 1000px;
    height: 600px;
    border-radius: 20px;
    border: 10px solid #008773;
    margin: 0 auto;
    padding: 2rem 10rem;
  }

  .back-link {
    background: #008773;
    color: #fff;
    padding: 1rem;
    border-radius: 10px;
    text-decoration: none;
    font-size: 1rem;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 1rem;
  }
</style>