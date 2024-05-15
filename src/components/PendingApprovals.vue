<template>
  <div>
    <h2>Approve Pending Accounts</h2>
    <div>
      <label for="checkingAccount">Checking Account:</label>
      <input type="text" id="checkingAccount" v-model="checkingAccount" />
    </div>
    <div>
      <label for="savingsAccount">Savings Account:</label>
      <input type="text" id="savingsAccount" v-model="savingsAccount" />
    </div>
    <button @click="approveAccounts">Approve Accounts</button>
    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkingAccount: '',
      savingsAccount: '',
      error: ''
    };
  },
  methods: {
    approveAccounts() {
      // Validate IBAN format
      if (!this.validateIBAN(this.checkingAccount) || !this.validateIBAN(this.savingsAccount)) {
        this.error = 'Invalid IBAN format';
        return;
      }

      // Check if both IBANs are unique
      if (this.checkingAccount === this.savingsAccount) {
        this.error = 'Checking and Savings Account must have different IBANs';
        return;
      }

      // Add logic to approve accounts or make API calls here
      // Example:
      // this.approveAccountsAPI(this.checkingAccount, this.savingsAccount);

      // Reset error message
      this.error = '';
    },
    validateIBAN(iban) {
      // Add validation logic for IBAN format here
      // Example:
      // Regular expression to validate IBAN format
      // const ibanPattern = /^NL\d{2}INHO0\d{9}$/;
      // return ibanPattern.test(iban);
      return true; // Placeholder, replace with actual validation logic
    },
    // Example function to approve accounts via API
    // approveAccountsAPI(checkingAccount, savingsAccount) {
    //   // Implement logic to approve accounts via API
    //   console.log('Approving accounts:', checkingAccount, savingsAccount);
    // }
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
