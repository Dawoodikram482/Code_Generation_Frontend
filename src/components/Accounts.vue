<template>
  <div>
    <h1>Accounts</h1>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="accounts.length">
      <table>
        <thead>
        <tr>
          <th>IBAN</th>
          <th>Account Type</th>
          <th>Customer Name</th>
          <th>Customer Email</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="account in accounts" :key="account.iban">
          <td>{{ account.iban }}</td>
          <td>{{ account.accountType }}</td>
          <td>{{ account.customer.firstName }} {{ account.customer.lastName }}</td>
          <td>{{ account.customer.email }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axiosInstance from '/axios.js';

export default {
  data() {
    return {
      accounts: [],
      loading: true,
      error: null
    };
  },
  created() {
    this.fetchAccounts();
  },
  methods: {
    fetchAccounts() {
      axiosInstance.get(`/accounts`, {
        params: {
          limit: 50,
          offset: 0

        }
      })
          .then(response => {
            this.accounts = response.data;
            this.loading = false;
          })
          .catch(error => {
            this.error = error.message;
            this.loading = false;
          });
    }
  }
};
</script>

<style>
/* Add any styles you need here */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>
