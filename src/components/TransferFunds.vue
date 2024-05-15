<template>
  <div class="transfer-funds">
  <div class="transfer-funds-form">
    <h2>Transfer Funds</h2>
    <form @submit.prevent="submitTransfer">
      <!-- Source Account -->
      <div class="form-group">
        <label for="source-account">Source Account:</label>
        <select id="source-account" v-model="sourceAccount" class="form-control">
          <option value="" disabled>Select source account</option>
          <option v-for="account in accounts" :key="account.id" :value="account.id">
            {{ account.name }} - {{ account.accountNumber }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="destination-account">Destination Account:</label>
        <select id="destination-account" v-model="destinationAccount" class="form-control">
          <option value="" disabled>Select destination account</option>
          <option v-for="account in accounts" :key="account.id" :value="account.id">
            {{ account.name }} - {{ account.accountNumber }}
          </option>
        </select>
      </div>


      <!-- Transfer Amount -->
      <div class="form-group">
        <label for="transfer-amount">Transfer Amount:</label>
        <input type="number" id="transfer-amount" v-model="transferAmount" class="form-control" :min="0" :max="500" step="1">
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

      <!-- Submit Button -->
      <button type="submit" class="btn btn-primary">Transfer</button>
    </form>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accounts: [
        { id: '1', name: 'John Doe', accountNumber: '123456789', balance: 5000 },
        { id: '2', name: 'Jane Smith', accountNumber: '987654321', balance: 3000 },
        { id: '3', name: 'Alice Brown', accountNumber: '567890123', balance: 8000 }
      ],
    }
  },
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