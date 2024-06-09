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
            <option v-for="account in sourceAccounts" :key="account.iban" :value="account.iban">
              {{ account.accountType }} - {{ account.iban }} - €{{ account.accountBalance }}
            </option>
          </select>
        </div>

        <!-- Destination Account -->
        <div class="form-group">
          <label for="destination-account">Recipient Account:</label>

          <div class="recipient-search-type">
            <input type="radio" id="enter-name" value="name" v-model="searchType">
            <label for="enter-name">Search IBAN By Customer Name</label>
          </div>

          <div class="recipient-search-type">
            <input type="radio" id="enter-iban" value="iban" v-model="searchType">
            <label for="enter-iban">I have the IBAN</label>
          </div>


          <div class="recipient-search-type">
            <input type="radio" id="my-accounts" value="my-accounts" v-model="searchType">
            <label for="my-accounts">Between my accounts</label>
          </div>

          <div class="iban-container iban-search-container" v-if="searchType === 'name'">
            <div class="search">
              <input type="text" v-model="firstName" class="form-control" placeholder="First Name">
              <input type="text" v-model="lastName" class="form-control" placeholder="Last Name">
              <button type="button" class="btn btn-primary" @click="searchIBANByCustomerName">Search</button>
            </div>

            <select id="destination-account" v-model="selectedDestinationAccount" class="form-control">
              <option value="" disabled>Select destination account ({{ ibanSearchResults.length }})</option>
              <option v-for="account in ibanSearchResults" :key="account.iban" :value="account.iban">
                {{ account.user }} - {{ account.iban }} - {{ account.accountType }}
              </option>
            </select>
          </div>

          <div class="iban-container" v-if="searchType === 'iban'">
            <input type="text" v-model="enteredIBAN" id="destination-account" class="form-control" placeholder="Destination IBAN">
          </div>

          <div class="iban-container" v-if="searchType === 'my-accounts'">
            <select id="destination-account" v-model="selectedMyAccount" class="form-control">
              <option value="" disabled>Select destination account</option>
              <option v-for="account in sourceAccounts" :key="account.iban" :value="account.iban">
                {{ account.accountType }} - {{ account.iban }} - €{{ account.accountBalance }}
              </option>
            </select>
          </div>
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
        <button type="submit" class="btn btn-primary btn-transfer" :disabled="loading">Transfer</button>
      </form>
    </div>
  </div>
</template>

<script>
import instance from "../../../axios.js";
import { Notify } from "quasar";
import { useAccountStore } from "@/stores/account.js";
import { computed, onMounted, ref, watch } from "vue";
import router from "@/router/index.js";

export default {
  setup() {
    const accountStore = useAccountStore();
    const sourceAccounts = computed(() => accountStore.accounts);
    const ibanSearchResults = ref([]);

    const searchType = ref('name');
    const firstName = ref('');
    const lastName = ref('');

    const selectedSourceAccount = ref('');

    const selectedDestinationAccount = ref('');
    const enteredIBAN = ref('');
    const selectedMyAccount = ref('');

    const transferAmount = ref(0);
    const loading = ref(false);
    const errorMessage = ref('');

    onMounted(async () => {
      await accountStore.getAccounts();
    });

    watch(ibanSearchResults, (newValue) => {
      if (newValue.length === 0) {
        Notify.create({
          color: 'negative',
          position: 'top',
          message: 'No accounts found for the given name',
          icon: ''
        });
      }
    });

    const goToActions = (iban) => {
      router.push({ name: 'atm-actions', query: { accountNumber: iban } });
    };

    const searchIBANByCustomerName = async () => {
      ibanSearchResults.value = await accountStore.searchIBANByCustomerName(firstName.value, lastName.value);
    };

    const destinationIBAN = computed(() => {
      if (searchType.value === 'my-accounts') {
        return selectedMyAccount.value;
      } else if (searchType.value === 'iban') {
        return enteredIBAN.value;
      } else {
        return selectedDestinationAccount.value;
      }
    });

    const handleTransfer = async () => {
      const result = await accountStore.transfer(selectedSourceAccount.value, destinationIBAN.value, transferAmount.value);

      if (result.success) {
        Notify.create({
          color: 'positive',
          position: 'top',
          message: result.message,
          icon: ''
        });
      } else {
        Notify.create({
          color: 'negative',
          position: 'top',
          message: result.message,
          icon: ''
        });
      }
    };

    return {
      searchType,
      firstName,
      lastName,
      sourceAccounts,
      ibanSearchResults,
      selectedSourceAccount,
      selectedDestinationAccount,
      selectedMyAccount,
      enteredIBAN,
      transferAmount,
      loading,
      errorMessage,
      goToActions,
      searchIBANByCustomerName,
      handleTransfer,
      destinationIBAN
    };
  },
}
</script>

<style scoped>
h2 {
  color: #008773;
  font-family: serif;
}

.transfer-funds-form {
  max-width: 700px;
}

.recipient-search-type input {
  margin-right: 10px;
}

.iban-container {
  margin-top: 20px;
}

.iban-search-container .search {
  display: flex;
}

.iban-search-container input {
  display: inline-block;
}

.form-group {
  padding: 20px 0 20px 0px;
}

.btn-transfer {
  width: 100%;
  padding: 10px 0;
}

button {
  color: #000000;
  background-color: #f59e0b;
  border: none;
  transition: 300ms;
}

button:hover {
  color: #000000;
  background-color: #ff9c00;

}

</style>