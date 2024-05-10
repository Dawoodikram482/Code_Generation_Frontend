<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="sidebar">
    <img class="logo" src="/src/assets/logo.png">
    <ul class="nav flex-column">
      <li v-for="(item, index) in sidebarItems" :key="index" class="nav-item">
        <router-link :to="item.route" class="nav-link">
          <div class="sidebar-icon" v-html="item.icon"></div>
          {{ item.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarItems: [
        {icon: '<i class="fa-solid fa-house-chimney"></i>', label: 'Accounts Overview', route: '/'},
        {icon: '<i class="fa-solid fa-clock-rotate-left"></i>', label: 'Pending Approvals', route: '/approval'},
      ],
    };
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  background-color: #008773;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  padding: 20px;
}

.logo {
  width: 120px;
  margin-bottom: 20px;
}

.nav-link {
  display: flex;
  gap: 10px;
  color: #2f2f2f;
  border-radius: 10px;
  padding: 0.8rem 1rem;
}

.sidebar-icon {
  width: 18px;
}

.nav-link:hover,
.router-link-exact-active {
  color: #008773;
  background-color: #FFF;
}
</style>
