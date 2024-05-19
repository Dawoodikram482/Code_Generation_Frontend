<template>
  <div class="table-responsive">
  <div class="table-responsive-sm">
    <h2>Accounts Overview</h2>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="accounts.length"></div>
    <div id="content">
      <div class="table-container">
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
          <tr v-for="account in accounts" :key="account.iban"
              :class="{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }">
            <td>{{ account.iban }}</td>
            <td>{{ account.accountType }}</td>
            <td>{{ account.customer.firstName }} {{ account.customer.lastName }}</td>
            <td>{{ account.customer.email }}</td>
            <div class="dropdown-menu">
              <a href="#" @click.prevent="showUserDetails(account)">User Details</a>
              <a href="#" @click.prevent="viewTransactions(account)">View Transactions</a>
            </div>
          </tr>
          </tbody>
        </table>
      </div>

      <!-- User Details Form -->
      <div v-if="selectedUser && !transactionData" class="user-details">
        <div>
          <h2>User Details</h2>
          <p>Name: {{ selectedUser.customer.firstName }} {{ selectedUser.customer.lastName }} </p>
          <p>IBAN: {{ selectedUser.iban }}</p>
          <p>DOB: {{selectedUser.customer.dateOfBirth }}</p>
        </div>
        <div class="editAndCloseUser">
          <a class="btn btn-primary" href="#">Edit</a>
          <a class="btn btn-danger" href="#">Close Account</a>
        </div>
      </div>

      <!-- Transaction History -->
      <div v-if="transactionData" class="transaction-history">
        <h2>Transaction History Of {{selectedUser.name}}</h2>
        <ul class="list-unstyled">
          <li v-for="(transaction, index) in selectedUser.transactions" :key="index">
            <template v-if="index === 0 || transaction.date !== selectedUser.transactions[index - 1].date">
              <div class="transaction-item">
                <div class="transaction-firstrow" style="font-weight: bold; color: #008773;">
                  <div class="transaction-date">{{ transaction.date }}</div>
                  <div class="euro-symbol">€</div>
                </div>
              </div>
            </template>
            <div class="transaction-item">
              <div class="transaction-secondrow">
                <div class="transaction-description">{{ transaction.description }}</div>
                <div class="transaction-amount">{{ transaction.amount }}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      people: [-->
<!--        {name: 'John Doe', iban: 'NL02ABNA0123456789', registrationDate: '2023-01-15', age: 10, transactions: [-->
<!--            { date: '2024-05-01', description: 'Salary Deposit', amount: 2500},-->
<!--            { date: '2024-05-01', description: 'Deposit', amount: 2500 },-->
<!--            { date: '2024-04-28', description: 'Grocery Shopping', amount: -150 },-->
<!--            { date: '2024-04-20', description: 'Utility Bill Payment', amount: -100 },-->
<!--          ],-->
<!--        },-->


<!--      selectedUser: null,-->
<!--      transactionData: null,-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    showUserDetails(user) {-->
<!--      this.selectedUser = user;-->
<!--      this.transactionData = false;-->
<!--      // Scroll to the top of the page-->
<!--      window.scrollTo({ top: 0, behavior: 'smooth' });-->
<!--    },-->
<!--    viewTransactions(user) {-->
<!--      // Assuming transactions are stored in the user object-->
<!--      this.selectedUser = user;-->
<!--      this.transactionData = user.transactions;-->
<!--      window.scrollTo({ top: 0, behavior: 'smooth' });-->
<!--    },-->
<!--  }-->
<!--};-->
<!--</script>-->
<script>
import axiosInstance from '/axios.js';

export default {
  data() {
    return {
      accounts: [],
          selectedUser: null,
        transactionData: null,
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
    },
    showUserDetails(account) {
      this.selectedUser = account;
      this.transactionData = false;
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    viewTransactions(account) {
      // Assuming transactions are stored in the user object
      this.selectedUser = account;
      this.transactionData = account.transactions;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
};
</script>

<style scoped>

h2{
  color: #008773;
  font-family: serif;
}
#content {
  flex: 1;
  padding: 10px;
  display: flex;
  margin-left: 0;
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

.dropdown-menu {
  display: none;
  position: absolute;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
/* Style for even rows */
.even-row {
  background-color: #cadde8;
}

/* Style for odd rows */
.odd-row {
  background-color: #ffffff;
}

/* Remove border between rows */
table {
  border-collapse: separate;
  border-spacing: 0;
}

table th,
table td {
  border: none;
}
tr:hover .dropdown-menu {
  display: block;
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

.table-container {
  margin-left: 0;
  width: 100%;
}

.user-details, .transaction-history{
  width: 650px;
  height: 50%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgb(0, 0, 0);
  background-color: #deeef6;
  margin-left: 60px; /* Adjust the margin as needed */
}

.editAndCloseUser {
  margin: 5px;
}

.editAndCloseUser a {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.transaction-secondrow, .transaction-firstrow {
  padding: 12px;
  display: flex;
  justify-content: space-between;
}

.transaction-secondrow{
  transition: 0.3s ease; /* Add transition for smooth effect */
}

.transaction-secondrow:hover {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgb(9, 0, 0); /* Shadow effect on hover */
}
</style>
