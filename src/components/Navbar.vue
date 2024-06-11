<script setup>
  import { RouterLink } from "vue-router";
</script>

<template>
  <div>
    <!-- Sidebar -->
    <div class="sidebar">
      <a href="/"><img class="logo" src="/src/assets/logo.png"></a>
      <ul class="nav flex-column">
        <li class="nav-item" v-for="(item, index) in sidebarItems" :key="index">
          <router-link :to="item.route" v-if="item.label !== 'Logout'" class="nav-link">
            <div class="sidebar-icon" v-html="item.icon"></div>
            {{ item.label }}
          </router-link>
          <router-link :to="item.route" v-else href="#" @click.prevent="logout" class="nav-link">
            <div class="sidebar-icon" v-html="item.icon"></div>
            {{ item.label }}
          </router-link>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
  import {useUserSessionStore} from "@/stores/UserSession.js";

  export default {
    data() {
      return {
        sidebarItems: [
          { icon: '<i class="fa-solid fa-house-chimney"></i>', label: 'Overview', route: '/CustomerAccountOverview' },
          { icon: '<i class="fa-solid fa-arrow-right-arrow-left"></i>', label: 'Transfer', route: '/transfer' },
          { icon: '<i class="fa-solid fa-clock-rotate-left"></i>', label: 'Transaction History', route: '/transactions' },
          { icon: '<i class="fa-solid fa-sign-out-alt"></i>', label: 'Logout', route: '/logout'}
        ]
      };
    },
    methods: {
      logout() {
        const userSessionStore = useUserSessionStore();
        userSessionStore.logout();
        this.$router.push('/login'); // Redirect to the login page after logout
      }
    }
  };
</script>

<style scoped>
  .nav {
    gap: 5px;
  }

  .sidebar {
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

  .nav-link:hover, .router-link-exact-active {
    background-color: #008773;
    color: #FFF;
  }

  a:hover {
    background: unset;
  }
</style>