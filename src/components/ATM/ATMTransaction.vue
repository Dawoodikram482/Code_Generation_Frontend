<template>
  <div class="atm-dashboard">
    <div>
      <h1>Hey {{ firstName }}!</h1>
      <h2>How much do you want to {{ transactionType }}?</h2>
    </div>

    <div v-if="selectedAccount">
      <div class="accounts">
        <h3>Selected Account</h3>
        <div class="account">
          <div>{{ selectedAccount.iban }}</div>
          <div>€ {{ selectedAccount.accountBalance.toFixed(2) }}</div>
        </div>
      </div>
      <div class="accounts">
        <h3>Amount</h3>
        <input v-model.number="amount" type="number" placeholder="Enter amount" />
      </div>
      <div class="buttons">
        <router-link :to="{ path: '/atm/actions', query: { accountNumber: selectedAccount.iban } }">Back</router-link>
        <button @click="handleTransaction">{{ transactionType }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useAccountStore } from '@/stores/account.js';
import router from "@/router/index.js";
import {Notify} from "quasar";

export default {
  props: {
    transactionType: {
      type: String,
      required: true,
      validator: function (value) {
        return ['withdraw', 'deposit'].includes(value);
      }
    },
    accountNumber: {
      type: String,
      required: true
    }
  },
  setup(props, { root }) {
    const accountStore = useAccountStore();
    const firstName = computed(() => accountStore.firstName);
    const currentAccounts = computed(() => accountStore.currentAccounts);
    const selectedAccount = computed(() => currentAccounts.value.find(account => account.iban === props.accountNumber));
    const amount = ref(0);

    onMounted(async () => {
      await accountStore.getAccounts();
    });

    const handleTransaction = async () => {
      try {
        await accountStore.handleTransaction(props.transactionType, props.accountNumber, amount.value);
        alert(`${props.transactionType.charAt(0).toUpperCase() + props.transactionType.slice(1)} successful!`);
        router.push({ path: '/atm/thank-you' });
      } catch (error) {
        console.error(error);
        Notify.create({
          color: 'negative',
          position: 'top',
          message: `Failed to ${props.transactionType}. ${error.response.data}`,
          icon: ''
        });
      }
    };

    return {
      firstName,
      currentAccounts,
      selectedAccount,
      amount,
      handleTransaction
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
  text-transform: capitalize;
}

.buttons .btn-back {
  background: rgba(0, 135, 115, 0.70);
  color: #FFFFFF;
}

.buttons button:hover, .buttons .btn-back:hover {
  background: rgba(0, 135, 115, 0.85);
}

input {
  height: 50px;
  border-radius: 10px;
  border: 4px solid #E3E3E3;
  background: rgba(255, 255, 255, 0.70);
  transition: 300ms;
  padding: 0 1rem;
}

input:focus-visible {
  outline: none;
  border: 4px solid rgba(0, 135, 115, 0.59);
}
</style>