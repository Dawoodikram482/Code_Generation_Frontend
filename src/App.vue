<script setup>
// Import necessary modules
import { RouterView } from 'vue-router';
import employeeNavbar from "@/components/EmployeeNavbar.vue";
import customerNavbar from "@/components/Navbar.vue";

import { useUserSessionStore } from '@/stores/UserSession'; // Import useUserSessionStore from your store module
import { computed } from 'vue'; // Import computed from Vue

// Access the userSessionStore from the Vuex store
const userSessionStore = useUserSessionStore();

// Check if the user is logged in
const isLoggedIn = computed(() => {
  return !!userSessionStore.user;
});

// If the user is logged in, get the user role from the store
const userRole = computed(() => {
  return isLoggedIn.value ? userSessionStore.user.role : null;
});

// Compute whether to show the Navbar based on the user's role
const forEmployee = computed(() => {
  return userRole.value === 'ROLE_EMPLOYEE';
});
const forCustomer = computed(() => {
  return userRole.value === 'ROLE_CUSTOMER';
});

</script>

<template>
  <div>
    <!-- Show the Navbar only if the user is logged in -->
    <template v-if="isLoggedIn">
      <!-- Show the Navbar based on user role -->
      <employeeNavbar v-if="forEmployee"/>
      <customerNavbar v-else-if="forCustomer"/>
    </template>

    <!-- Page content -->
    <div class="content">
      <!-- Render the router view -->
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.content {
  margin-left: 100px;
  padding: 20px;
}
</style>
