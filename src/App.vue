<script setup>
  import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <!-- Sidebar -->
    <Navbar />
    <AccountsOverview />

    <!-- Page content -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/EmployeeNavbar.vue";
import AccountsOverview from "@/components/AccountsOverview.vue";

  export default {
    components: {
      Navbar,
      AccountsOverview
    }
  }
</script>

<style scoped>
  .content {
    margin-left: 250px;
    padding: 20px;
  }
</style>
