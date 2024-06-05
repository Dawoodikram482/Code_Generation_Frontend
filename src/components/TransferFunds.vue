<template>
  <div class="transfer-funds">
    <div class="transfer-funds-form">
      <h2>Transfer Funds</h2>
      <form @submit.prevent="submitTransfer">
        <!-- Source Account -->
        <div class="form-group">
          <label for="source-account">Source Account:</label>
          <select id="source-account" v-model="selectedSourceAccount" class="form-control">
            <option value="" disabled>Select source account</option>
            <option v-for="account in accounts" :key="account.iban" :value="account.iban">
              {{ account.customer?.firstName }} {{ account.customer?.lastName }} - {{ account.iban }}
            </option>
          </select>
        </div>

        <!-- Destination Account -->
        <div class="form-group">
          <label for="destination-account">Destination Account:</label>
          <select id="destination-account" v-model="selectedDestinationAccount" class="form-control">
            <option value="" disabled>Select destination account</option>
            <option v-for="account in accounts" :key="account.iban" :value="account.iban">
              {{ account.customer?.firstName }} {{ account.customer?.lastName }} - {{ account.iban }}
            </option>
          </select>
        </div>

        <!-- Transfer Amount -->
        <div class="form-group">
          <label for="transfer-amount">Transfer Amount:</label>
          <input type="number" id="transfer-amount" v-model="transferAmount" class="form-control" :min="0" :max="500" step="1">
        </div>

        <!-- Loading Indicator -->
        <div v-if="loading" class="alert alert-info">Loading...</div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

        <!-- Submit Button -->
        <button type="submit" class="btn btn-primary" :disabled="loading">Transfer</button>
      </form>
    </div>
  </div>
</template>



<script>
import instance from "../../axios.js";

export default {
  data() {
    return {
      accounts: [],
      selectedSourceAccount: '', // Define selectedSourceAccount
      selectedDestinationAccount: '', // Define selectedDestinationAccount
      transferAmount: null, // Define transferAmount
      loading: false, // Add loading variable
      errorMessage: null // Add errorMessage variable
    };
  },
  created() {
    this.fetchAccounts();
  },
  methods: {
    fetchAccounts() {
      this.loading = true; // Set loading to true before making the request
      instance.get('/accounts', { params: { limit: 50, offset: 0 } })
          .then(response => {
            this.accounts = response.data;
            this.loading = false; // Set loading to false after receiving the response
          })
          .catch(error => {
            this.errorMessage = error.message;
            this.loading = false; // Set loading to false in case of error
          });
    },
    submitTransfer() {
      this.loading = true; // Set loading to true before making the request
      instance.post('/transactions', {
        accountFrom: this.selectedSourceAccount,
        accountTo: this.selectedDestinationAccount,
        amount: this.transferAmount
      }).then(response => {
            // Reset form fields and loading state
            this.selectedSourceAccount = response.data.selectedSourceAccount;
            this.selectedDestinationAccount = response.data.selectedDestinationAccount;
            this.transferAmount = response.data.transferAmount;
            this.loading = false;

            // Show success message or perform any other action
            alert('Transfer successful!');
          }).catch(error => {
            this.errorMessage = error.response.data.message; // Display error message
            this.loading = false; // Set loading to false
          });
    }
  }
}
</script>

<style scoped>
h2{
  color: #008773;
  font-family: serif;
}
.transfer-funds-form{
 padding-top: 50px;
  width: 700px;


}

.form-group{
  padding: 20px 0 20px 20px;
}

</style>