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

  const isLoggedIn = computed(() => userRole.isLoggedIn);

  onMounted(() => {
    if (router.currentRoute.value.path === '/atm' && isLoggedIn.value) {
      router.replace({ name: 'atm-accounts' });
    } else if (router.currentRoute.value.path === '/atm' && !isLoggedIn.value) {
      router.replace({ name: 'atm-login' });
    }
  });
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
</style>