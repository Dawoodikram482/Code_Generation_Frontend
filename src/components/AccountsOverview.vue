<template>
  <div class="table-responsive">
    <div class="table-responsive-sm">
      <h2>Accounts Overview</h2>
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>
      <div v-if="accounts.length">
        <div id="content">
          <div class="table-and-details">
            <div class="table-container">
              <table>
                <thead>
                <tr>
                  <th>IBAN</th>
                  <th>Account Type</th>
                  <th>Account Status</th>
                  <th>Customer Name</th>
                  <th>Customer Email</th>
                  <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(account, index) in filteredAccounts" :key="account.iban"
                    :class="{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }">
                  <td>{{ account.iban }}</td>
                  <td>{{ account.accountType }}</td>
                  <td>{{account.isActive}}</td>
                  <td>{{ account.customer?.firstName }} {{ account.customer?.lastName }}</td>
                  <td>{{ account.customer?.email }}</td>
                  <td>
                    <div class="dropdown-menu">
                      <a href="#" @click.prevent="showUserDetails(account)">User Details</a>
                      <a href="#" @click.prevent="viewTransactions(account)">View Transactions</a>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <div v-if="selectedUser && !transactionData" class="user-details">
              <h2>User Details</h2>
              <form @submit.prevent="updateUserDetails">
                <div class="form-group">
                  <label for="firstName">First Name:</label>
                  <input type="text" v-model="selectedUser.customer.firstName" id="firstName" class="form-control" readonly>
                </div>
                <div class="form-group">
                  <label for="lastName">Last Name:</label>
                  <input type="text" v-model="selectedUser.customer.lastName" id="lastName" class="form-control" readonly>
                </div>
                <div class="form-group">
                  <label for="iban">IBAN:</label>
                  <input type="text" v-model="selectedUser.iban" id="iban" class="form-control" readonly>
                </div>
                <div class="form-group">
                  <label for="dateOfBirth">Date of Birth:</label>
                  <input type="date" v-model="selectedUser.customer.dateOfBirth" id="dateOfBirth" class="form-control" readonly>
                </div>
                <div class="form-group">
                  <label for="accountBalance">Account Balance:</label>
                  <input type="number" v-model="selectedUser.accountBalance" id="accountBalance" class="form-control" readonly>
                </div>
                <div class="form-group">
                  <label for="transactionLimit">Transaction Limit:</label>
                  <input type="number" v-model="selectedUser.customer.transactionLimit" id="transactionLimit" class="form-control" readonly>
                </div>
                <div class="form-group">
                  <label for="dayLimit">Day Limit:</label>
                  <input type="number" v-model="selectedUser.customer.dayLimit" id="dayLimit" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="absoluteLimit">Absolute Limit:</label>
                  <input type="number" v-model="selectedUser.absoluteLimit" id="absoluteLimit" class="form-control" required>
                </div>
                <div class="editAndCloseUser">
                  <button type="submit" class="btn btn-primary">Update</button>
                  <button type="button" class="btn btn-danger" @click.prevent="closeAccount(selectedUser.iban)">Close Account</button>
                </div>
              </form>
            </div>

            <div v-if="transactionData" class="transaction-history">
              <h2>Transaction History Of {{ selectedUser.customer?.firstName }} {{ selectedUser.customer?.lastName }}</h2>
              <ul class="list-unstyled">
                <li v-for="(transaction, index) in transactionData" :key="index">
                  <template v-if="index === 0 || transaction.date !== transactionData[index - 1].date">
                    <div class="transaction-item">
                      <div class="transaction-firstrow" style="font-weight: bold; color: #008773;">
                        <div class="transaction-date">{{ transaction.date }}</div>
                        <div class="euro-symbol">€</div>
                      </div>
                    </div>
                  </template>
                  <div class="transaction-item">
                    <div class="transaction-secondrow">
                      <div class="transaction-description">
                        From: {{ transaction.accountFrom.user }} ({{ transaction.accountFrom.iban }})
                        To: {{ transaction.accountTo.user }} ({{ transaction.accountTo.iban }})
                      </div>
                      <div class="transaction-amount">{{ transaction.amount }}</div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAccountsOverviewStore } from '../stores/accoountsOverview.js';
import { computed } from 'vue';

export default {
  data() {
    return {
      selectedUser: null,
      transactionData: null,
      selectedRole: ''
    };
  },
  setup() {
    const store = useAccountsOverviewStore();
    store.fetchAccountsAndTransactions();

    return {
      store,
      accounts: computed(() => store.accounts),
      transactions: computed(() => store.transactions),
      loading: computed(() => store.loading),
      error: computed(() => store.error)
    };
  },
  computed: {
    filteredAccounts() {
      if (!this.selectedRole) {
        return this.accounts;
      } else {
        return this.accounts.filter(account => account.customer?.role.includes(this.selectedRole));
      }
    }
  },
  methods: {
    closeAccount(iban) {
      if (confirm("Are you sure you want to close this account?")) {
        this.store.closeAccount(iban);
        this.selectedUser = null;
        this.store.fetchAccountsAndTransactions();
      }
    },
    updateUserDetails() {
      this.store.updateUserDetails(this.selectedUser);
    },
    showUserDetails(account) {
      this.selectedUser = account;
      this.transactionData = null;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    viewTransactions(account) {
      this.selectedUser = account;
      this.transactionData = this.transactions.filter(transaction =>
          transaction.accountFrom.iban === account.iban || transaction.accountTo.iban === account.iban
      );
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    filterAccounts() {
      this.store.fetchAccountsAndTransactions();
    }
  }
};
</script>



<style scoped>
h2 {
  color: #008773;
  font-family: serif;
}

.table-responsive {
  max-width: 1200px;
  margin: 0 auto;
}

#content {
  display: flex;
  flex-direction: row;
}

.table-and-details {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}

.table-container {
  flex: 1;
  margin-right: 120px;
}

.table-container:has(+ *) {
  margin-right: 0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

/* Style for even rows */
.even-row {
  background-color: #cce3ef;
}

/* Style for odd rows */
.odd-row {
  background-color: #ffffff;
}

tr:hover .dropdown-menu {
  display: block;
}

.dropdown-menu {
  display: none;
  position: absolute;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-menu a {
  display: block;
  padding: 8px 12px;
  text-decoration: none;
  color: #333;
}

.dropdown-menu a:hover {
  background-color: #f0f0f0;
}

.user-details, .transaction-history {
  width: 500px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgb(0, 0, 0);
  background-color: #deeef6;
  margin-left: 20px;
}

.editAndCloseUser {
  margin-top: 10px;
}

.editAndCloseUser a {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.transaction-firstrow, .transaction-secondrow {
  padding: 12px;
  display: flex;
  justify-content: space-between;
}

.transaction-secondrow {
  transition: 0.3s ease; /* Add transition for smooth effect */
}

.transaction-secondrow:hover {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgb(9, 0, 0); /* Shadow effect on hover */
}
</style>