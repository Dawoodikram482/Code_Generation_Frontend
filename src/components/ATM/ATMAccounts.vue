<template>
  <div class="atm-dashboard">
    <h1>Welcome!</h1>
    <h2>Choose an account to proceed</h2>

    <div class="accounts">
      <h3>Current Accounts</h3>
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

    <div class="accounts">
      <h3>Saving Accounts</h3>
      <div
          v-for="account in savingsAccounts"
          :key="account.iban"
          class="account"
          @click="goToActions(account.iban)"
      >
        <div>{{ account.iban }}</div>
        <div>€ {{ account.accountBalance.toFixed(2) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "../../../axios.js";

export default {
  data() {
    return {
      currentAccounts: [],
      savingsAccounts: []
    };
  },
  created() {
    this.getAccounts();
  },
  methods: {
    getAccounts() {
      axiosInstance.get("/users/myAccountOverview")
          .then(response => {
            console.log(response.data)
            const accounts = response.data.accounts;
            this.currentAccounts = accounts.filter(account => account.accountType === 'CURRENT');
            this.savingsAccounts = accounts.filter(account => account.accountType === 'SAVINGS');
          })
          .catch(error => {
            console.error(error);
          });
    },
    goToActions(iban) {
      this.$router.push({ path: '/atm/actions', query: { accountNumber: iban } });
    }
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
</style>