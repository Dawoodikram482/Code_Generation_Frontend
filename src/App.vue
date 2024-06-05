<script>
// Import necessary modules
import { RouterView } from 'vue-router';
import employeeNavbar from "@/components/EmployeeNavbar.vue";
import customerNavbar from "@/components/Navbar.vue";

import { useUserSessionStore } from '@/stores/UserSession'; // Import useUserSessionStore from your store module
import { computed } from 'vue'; // Import computed from Vue

export default {
  name: "App",
  components: {
    employeeNavbar,
    customerNavbar
  },
}

</script>

<template>
  <main>
    <EmployeeNavbar/>
    <RouterView/>
    <CustomerNavbar/>
  </main>
</template>

<style scoped>
.content {
  margin-left: 100px;
  padding: 20px;
}
</style>
