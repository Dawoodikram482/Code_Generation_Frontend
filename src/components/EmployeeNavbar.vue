<template>
  <div>
    <!-- Sidebar -->
    <div class="sidebar">
      <img class="logo" src="/src/assets/logo.png">
      <ul class="nav flex-column">
        <li class="nav-item" v-for="(item, index) in sidebarItems" :key="index">
          <router-link :to="item.route" class="nav-link">
            <div class="sidebar-icon" v-html="item.icon"></div>
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="table-responsive">
      <div class="table-responsive-sm">
        <div id="content">
          <div class="table-container">
            <table>
              <thead>
              <tr>
                <th>Name</th>
                <th>IBAN</th>
                <th>Registration Date</th>

              </tr>
              </thead>
              <tbody>
              <tr v-for="(person, index) in people" :key="index"
                  :class="{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }">
                <td style="width: 200px">{{ person.name }}</td>
                <td>{{ person.iban }}</td>
                <td>{{ person.registrationDate }}</td>

                  <div class="dropdown-menu">
                    <a href="#" @click.prevent="showUserDetails(person)">User Details</a>
                    <a href="#" @click.prevent="viewTransactions(person)">View Transactions</a>
                  </div>

              </tr>
              </tbody>
            </table>
          </div>

          <!-- User Details Form -->
          <div v-if="selectedUser" class="user-details">
            <div>
            <h2>User Details</h2>
            <p>Name: {{ selectedUser.name }}</p>
            <p>IBAN: {{ selectedUser.iban }}</p>
            <p>Registration Date: {{ selectedUser.registrationDate }}</p>
            <p>Age: {{ selectedUser.age }}</p>
            </div>
            <div class="editAndCloseUser">
              <a class="btn btn-primary" href="#">Edit</a>
              <a class="btn btn-danger" href="#">Close Account</a>
            </div>
          </div>

          <!-- Transaction History -->
          <div v-if="transactionData" class="transaction-history">
            <h2>Transaction History</h2>
            <ul>
              <li v-for="(transaction, index) in selectedUser.transactions" :key="index">
                <strong>Date:</strong> {{ transaction.date }} |
                <strong>Description:</strong> {{ transaction.description }} |
                <strong>Amount:</strong> {{ transaction.amount }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarItems: [
        {icon: '<i class="fa-solid fa-house-chimney"></i>', label: 'Accounts Overview', route: '/'},
        {icon: '<i class="fa-solid fa-clock-rotate-left"></i>', label: 'Pending Approvals', route: '/approval'},
      ],

      people: [
        {name: 'John Doe', iban: 'NL02ABNA0123456789', registrationDate: '2023-01-15', age: 10, transactions: [
            { date: '2024-05-01', description: 'Salary Deposit', amount: 2500 },
            { date: '2024-04-28', description: 'Grocery Shopping', amount: -150 },
            { date: '2024-04-20', description: 'Utility Bill Payment', amount: -100 },
          ],
        },
        {name: 'Jane Smith', iban: 'NL91ABNA0417164300', registrationDate: '2022-09-28'},
        {name: 'Bob Johnson', iban: 'NL59RABO0123456789', registrationDate: '2023-03-10'},
        {name: 'Alice Brown', iban: 'NL86INGB0002445588', registrationDate: '2022-11-05'},
        {name: 'Michael Lee', iban: 'NL22SNSB0123456789', registrationDate: '2023-05-20'},
        {name: 'John Doe', iban: 'NL02ABNA0123456789', registrationDate: '2023-01-15', age: 10},
        {name: 'Jane Smith', iban: 'NL91ABNA0417164300', registrationDate: '2022-09-28'},
        {name: 'Bob Johnson', iban: 'NL59RABO0123456789', registrationDate: '2023-03-10', transactions: [
            { date: '2024-05-03', description: 'Transfer from John Doe', amount: 200 },
            { date: '2024-04-30', description: 'Restaurant Dinner', amount: -50 },
            { date: '2024-04-25', description: 'Online Shopping', amount: -120 },
          ],
        },
        {name: 'Alice Brown', iban: 'NL86INGB0002445588', registrationDate: '2022-11-05'},
        {name: 'Michael Lee', iban: 'NL22SNSB0123456789', registrationDate: '2023-05-20'},
        {name: 'John Doe', iban: 'NL02ABNA0123456789', registrationDate: '2023-01-15', age: 10},
        {name: 'Jane Smith', iban: 'NL91ABNA0417164300', registrationDate: '2022-09-28'},
        {name: 'Bob Johnson', iban: 'NL59RABO0123456789', registrationDate: '2023-03-10'},
        {name: 'Alice Brown', iban: 'NL86INGB0002445588', registrationDate: '2022-11-05'},
        {name: 'Michael Lee', iban: 'NL22SNSB0123456789', registrationDate: '2023-05-20'},
        {name: 'John Doe', iban: 'NL02ABNA0123456789', registrationDate: '2023-01-15', age: 10},
        {name: 'Jane Smith', iban: 'NL91ABNA0417164300', registrationDate: '2022-09-28'},
        {name: 'Bob Johnson', iban: 'NL59RABO0123456789', registrationDate: '2023-03-10'},
        {name: 'Alice Brown', iban: 'NL86INGB0002445588', registrationDate: '2022-11-05'},
        {name: 'Michael Lee', iban: 'NL22SNSB0123456789', registrationDate: '2023-05-20'},
        {name: 'John Doe', iban: 'NL02ABNA0123456789', registrationDate: '2023-01-15', age: 10},
        {name: 'Jane Smith', iban: 'NL91ABNA0417164300', registrationDate: '2022-09-28'},
        {name: 'Bob Johnson', iban: 'NL59RABO0123456789', registrationDate: '2023-03-10'},
        {name: 'Alice Brown', iban: 'NL86INGB0002445588', registrationDate: '2022-11-05'},
        {name: 'Michael Lee', iban: 'NL22SNSB0123456789', registrationDate: '2023-05-20'}
      ],

      selectedUser: null,
      transactionData: null,
    };
  },
  methods: {
    showUserDetails(user) {
      this.selectedUser = user;
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    viewTransactions(user) {
      // Assuming transactions are stored in the user object
      this.transactionData = user.transactions;
    },
  }
};
</script>

<style scoped>
.nav {
  gap: 5px;
}

.sidebar {
  position: fixed;
  background-color: #008773;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  padding: 20px;
}

.logo {
  width: 120px;
  margin-bottom: 20px;
}

.nav-link {
  display: flex;
  gap: 10px;
  color: #2f2f2f;
  border-radius: 10px;
  padding: 0.8rem 1rem;
}

.sidebar-icon {
  width: 18px;
}

.nav-link:hover, .router-link-exact-active {
  color: #008773;
  background-color: #FFF;
}

#content {
  flex: 1;
  padding: 30px;
  display: flex;
  margin-left: 100px;

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
  width: 500px;
}

.user-details {
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

</style>
