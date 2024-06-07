<template>


  <div class="account-details">
    <div>First Name: {{ firstName }}</div>
    <div>Last Name: {{ lastName }}</div>
    <div>Date of birth: {{ dateOfBirth }}</div>
    <div>BSN: {{ bsn }}</div>
    <div>Email: {{ email }}</div>
    <div>Phone number: {{ phoneNumber }}</div>
  </div>


  <div v-for="account in accounts" :key="account.iban" class="account-container">
    <div class="account-info">
      <div class="account-type">{{ account.accountType }}</div>
      <div class="account-iban">{{ account.iban }}</div>
    </div>
    <div class="account-balance">EUR {{ account.accountBalance }}</div>
  </div>


  <div class="flex justify-start my-4">
    <button class="transfer-button">
      Transfer
    </button>
  </div>

</template>

<script>

  import axios from 'axios';
  import axiosInstance from "../../axios.js";

  export default {
  data() {
  return {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  bsn: '',
  accounts: []
};
},
  mounted() {
  this.fetchAccountOverview();
},
  methods: {
    fetchAccountOverview() {
      axiosInstance.get("/users/myAccountOverview")
          .then(response => {
            const data = response.data;
            this.firstName = data.firstName;
            this.lastName = data.lastName;
            this.email = data.email;
            this.phoneNumber = data.phoneNumber;
            this.dateOfBirth = data.dateOfBirth;
            this.bsn = data.bsn;
            this.accounts = data.accounts;
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
};
</script>

<style scoped>
.account-container {
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 16px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.account-details {
  display: flex;
  flex-direction: column;
}

.account-type {
  font-weight: bold;
}

.account-iban {
  color: #888;
}

.account-balance {
  font-size: 24px;
  font-weight: bold;
}

.transfer-button {
  background-color: #f59e0b;
  color: #000000;
  font-weight: 600;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.375rem;
  width: 40%;
  transition: background-color 0.3s;
}
</style>