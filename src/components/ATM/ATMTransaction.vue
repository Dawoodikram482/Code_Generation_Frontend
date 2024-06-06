<template>
  <div class="atm-dashboard">
    <div>
      <h1>Hey <span>{{ username }}</span>!</h1>
      <h2>How much do you want to {{ transactionType }}?</h2>
    </div>

    <div>
      <div class="accounts">
        <h3>Selected Account</h3>
        <div class="account">
          <div>NL01UNIB0000000002</div>
          <div>€ 1,000.00</div>
        </div>
      </div>
      <div class="accounts">
        <h3>Amount</h3>
        <input type="number" placeholder="Enter amount" />
      </div>
      <div class="buttons">
        <a href="/atm/actions" class="btn-back">Back</a>
        <button>{{ transactionType }}</button>
      </div>
    </div>

  </div>
</template>

<script>
import { useUserSessionStore } from '@/stores/UserSession';

export default {
  props: {
    transactionType: {
      type: String,
      required: true,
      validator: function (value) {
        return ['withdraw', 'deposit'].includes(value);
      }
    },
  },
  setup() {
    const userSessionStore = useUserSessionStore();
    userSessionStore.localLogin();

    const username = userSessionStore.getUserFullName;

    return {
      username
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
