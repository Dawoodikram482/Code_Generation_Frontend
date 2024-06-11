<template>
  <div class="transfer-funds">
    <div class="transfer-funds-form">
      <h2>Transfer Funds</h2>
      <form @submit.prevent="handleTransfer">
        <!-- Source Account -->
        <div class="form-group">
          <label for="source-account">Source Account:</label>
          <select id="source-account" v-model="selectedSourceAccount" class="form-control">
            <option value="" disabled>Select source account</option>
            <option v-for="account in sourceAccount" :key="account.iban" :value="account.iban">
              {{ account.customer?.firstName }} {{ account.customer?.lastName }} - {{ account.iban }} - €{{account.accountBalance}}
            </option>
          </select>
        </div>

        <!-- Destination Account -->
        <div class="form-group">
          <label for="destination-account">Destination Account:</label>
          <select id="destination-account" v-model="selectedDestinationAccount" class="form-control">
            <option value="" disabled>Select destination account</option>
            <option v-for="account in destinationAccount" :key="account.iban" :value="account.iban">
              {{ account.customer?.firstName }} {{ account.customer?.lastName }} - {{ account.iban }} - €{{account.accountBalance}}
            </option>
          </select>
        </div>

        <!-- Transfer Amount -->
        <div class="form-group">
          <label for="transfer-amount">Transfer Amount:</label>
          <input type="number" id="transfer-amount" v-model="transferAmount" class="form-control" :min="0" :max="500"
                 step="1">
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
import { Notify } from "quasar";
import { useAccountsStore, useTransactionsStore } from "@/stores/storeForEmployee.js";
import { computed, onMounted, ref } from "vue";
import router from "@/router/index.js";

export default {
  setup() {
    const accountsStore = useAccountsStore();
    const transactionStore = useTransactionsStore();
    const sourceAccount = computed(() => accountsStore.accounts);
    const destinationAccount = computed(() => accountsStore.accounts);

    const selectedSourceAccount = ref('');
    const selectedDestinationAccount = ref('');
    const transferAmount = ref('');
    const loading = ref(false);
    const errorMessage = ref('');

    onMounted(async () => {
      await accountsStore.fetchAccounts();
    });

    const handleTransfer = async () => {
      loading.value = true;
      errorMessage.value = '';

      try {
        const result = await transactionStore.submitTransfer({
          selectedSourceAccount: selectedSourceAccount.value,
          selectedDestinationAccount: selectedDestinationAccount.value,
          transferAmount: transferAmount.value
        });

        if (result.success) {
          // Reset form fields
          selectedSourceAccount.value = '';
          selectedDestinationAccount.value = '';
          transferAmount.value = '';
        }
      } catch (error) {
        errorMessage.value = error.response?.data?.message || 'An error occurred while processing your request.';
      } finally {
        loading.value = false;
      }
    };

    return {
      sourceAccount,
      destinationAccount,
      selectedSourceAccount,
      selectedDestinationAccount,
      transferAmount,
      loading,
      errorMessage,
      handleTransfer
    };
  }
}
</script>


<style scoped>
h2 {
  color: #008773;
  font-family: serif;
}

.transfer-funds-form {
  padding-top: 50px;
  width: 700px;
}

.form-group {
  padding: 20px 0 20px 20px;
}
</style>
