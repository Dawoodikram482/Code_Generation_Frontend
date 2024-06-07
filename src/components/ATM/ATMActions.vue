<template>
  <div class="atm-dashboard">
    <div>
      <h1>Hey <span>{{ username }}</span>!</h1>
      <h2>What would you like to do?</h2>
    </div>

    <div v-if="selectedAccount">
      <div class="accounts">
        <h3>Selected Account</h3>
        <div class="account">
          <div>{{ selectedAccount.iban }}</div>
          <div>€ {{ selectedAccount.accountBalance.toFixed(2) }}</div>
        </div>
      </div>
      <div class="buttons">
        <a href="/atm/accounts" class="btn-back">Back</a>
        <a :href="`/atm/transaction/withdraw?accountNumber=${selectedAccount.iban}`">Withdraw</a>
        <a :href="`/atm/transaction/deposit?accountNumber=${selectedAccount.iban}`">Deposit</a>
      </div>
    </div>

    <div v-else>
      <p>Account not found.</p>
      <a href="/atm/accounts" class="btn-back">Back</a>
    </div>
  </div>
</template>

<script>
import axiosInstance from "../../../axios.js";

export default {
  props: {
    accountNumber: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      currentAccounts: [],
      selectedAccount: null,
      username: ""
    };
  },
  created() {
    this.getAccounts();
  },
  methods: {
    getAccounts() {
      axiosInstance.get("/users/myAccountOverview")
          .then(response => {
            this.username = response.data.firstName + " " + response.data.lastName;
            const accounts = response.data.accounts;
            this.currentAccounts = accounts;
            this.selectedAccount = accounts.find(account => account.iban === this.accountNumber);
          })
          .catch(error => {
            console.error(error);
          });
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
  gap: 30px;
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
  font-family: "Roboto Mono",serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.buttons button, .buttons a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  background: rgba(0, 135, 115, 1);
  color: #FFFFFF;
  transition: 300ms;
}

.buttons .btn-back {
  background: rgba(0, 135, 115, 0.70);
  color: #FFFFFF;
}

.buttons button:hover, .buttons .btn-back:hover {
  background: rgba(0, 135, 115, 0.85);
}
</style>