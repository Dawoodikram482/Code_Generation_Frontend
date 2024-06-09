<template>
  <div class="atm-dashboard">
    <img src="/src/assets/logo.png" width="200px">
    <h1>Welcome!</h1>
    <h2>Choose an account to proceed</h2>

    <div class="accounts">
      <h3>Current Accounts</h3>
      <div v-if="currentAccounts.length > 0">
        <div
            v-for="account in currentAccounts"
            :key="account.iban"
            class="account"
            @click="goToActions(account.iban)"
        >
          <div>{{ account.iban }}</div>
          <div>€ {{ account.accountBalance.toFixed(2) }}</div>
        </div>
      </div>
      <div v-else>
        <p>You don't have any accounts.</p>
      </div>
    </div>
    <router-link to="/" class="back-link">
      Back to Home Page
    </router-link>
  </div>
</template>

<script>
import { useAccountStore } from "@/stores/account.js";
import { onMounted, computed } from 'vue';
import router from "@/router/index.js";

export default {
  setup() {
    const accountStore = useAccountStore();
    const currentAccounts = computed(() => accountStore.currentAccounts);

    onMounted(async () => {
      await accountStore.getAccounts();
    });

    const goToActions = (iban) => {
      router.push({ name: 'atm-actions', query: { accountNumber: iban } });
    };

    return {
      currentAccounts,
      goToActions
    };
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

.atm-dashboard {
  font-family: "Roboto Mono", serif;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  text-align: center;
}

img {
  display: block;
  margin: 0 auto;
}

h1 {
  color: #000;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

h2 {
  color: #000;
  font-family: "Roboto Mono", serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

h3 {
  color: #000;
  font-family: "Roboto Mono", serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-align: left;
}

.accounts {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.account {
  display: inline-flex;
  width: 100%;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px;
  background: rgba(0, 135, 115, 0.70);
  border: 4px solid #008773;
  color: #FFF;
  font-family: "Roboto Mono", serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  transition: 300ms;
  cursor: pointer;
}

.account:hover {
  background: rgba(0, 135, 115, 0.90);
}

.back-link {
  background: rgba(0, 135, 115, 0.70);
  color: #FFFFFF;
  padding: 1rem;
  border-radius: 10px;
}
</style>