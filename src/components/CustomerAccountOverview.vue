<template>

  <h3 class="text-2xl font-bold mb-2">
    <div>First Name: {{ firstName }}</div>
    <div>Last Name: {{ lastName }}</div>
    <div>Date of birth: {{ dateOfBirth }}</div>
    <div>BSN: {{ bsn }}</div>
    <div>Email: {{ email }}</div>
    <div>Phone number: {{ phoneNumber }}</div>
  </h3>

  <div v-for="account in accounts" :key="account.iban" class="flex flex-col items-start justify-center bg-gray-100 rounded-md shadow-md w-full py-2 px-3 mx-auto">
    <div class="flex items-center justify-between w-full py-2">
      <div class="flex flex-col justify-evenly">
        <div>{{ account.accountType }}</div>
        <div>{{ account.iban }}</div>
      </div>
      <div class="text-4xl font-bold mb-4 self-center">
        {{ account.accountBalance }}
      </div>
    </div>
  </div>

  <div class="flex justify-start my-4">
    <button class="bg-yellow-500 text-black font-semibold py-2 px-4 rounded-md w-2/5 hover:bg-yellow-600">
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


