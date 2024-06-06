<script setup>
import { RouterView } from 'vue-router';
import employeeNavbar from "@/components/EmployeeNavbar.vue";
import customerNavbar from "@/components/Navbar.vue";
import { useUserRole } from '@/stores/userRole'; // Update the import path if necessary

const { isLoggedIn, forEmployee, forCustomer } = useUserRole();
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
