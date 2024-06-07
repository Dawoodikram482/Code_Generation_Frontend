<template>
  <div class="atm-dashboard">
    <h1>Welcome <span>{{ username }}</span>!</h1>
    <h2>Choose an account to proceed</h2>

    <div class="accounts">
      <h3>Current Accounts</h3>
      <div class="account">
        <div>NL01UNIB0000000002</div>
        <div>€ 1,000.00</div>
      </div>
    </div>

    <div class="accounts">
      <h3>Saving Accounts</h3>
      <div class="account">
        <div>NL01UNIB0000000003</div>
        <div>€ 800.00</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useUserSessionStore } from '@/stores/UserSession';

  export default {
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
    font-family: "Roboto Mono",serif;
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