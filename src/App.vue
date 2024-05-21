<script setup>
  import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <!-- Sidebar -->
    <Navbar />
    <!-- Page content -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/EmployeeNavbar.vue";

  export default {
    components: {
      Navbar
    }
  }
</script>

<style scoped>
  .content {
    margin-left: 100px;
    padding: 20px;
  }
</style>
