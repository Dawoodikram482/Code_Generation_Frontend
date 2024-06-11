<template>
  <div class="table-responsive">
    <div class="table-responsive-sm">
      <h2>Transaction History</h2>
      <div>
        <form @submit.prevent="fetchTransactions">
          <div class="filters-container">
            <div class="filters">
              <div class="filter-group">
                <label for="ibanFrom">Account From:</label>
                <input v-model="filters.ibanFrom" type="text" id="ibanFrom" name="ibanFrom" class="form-control">

                <label for="ibanTo">Account To:</label>
                <input v-model="filters.ibanTo" type="text" id="ibanTo" name="ibanTo" class="form-control">
              </div>

              <div class="filter-group">
                <label for="amountMin">Amount Min:</label>
                <input v-model="filters.amountMin" type="number" id="amountMin" name="amountMin" class="form-control">

                <label for="amountMax">Amount Max:</label>
                <input v-model="filters.amountMax" type="number" id="amountMax" name="amountMax" class="form-control">
              </div>

              <div class="filter-group">
                <label for="dateFrom">Date From:</label>
                <input v-model="filters.dateFrom" type="date" id="dateFrom" name="dateFrom" class="form-control">

                <label for="timestamp">Date To:</label>
                <input v-model="filters.dateTo" type="date" id="dateTo" name="dateTo" class="form-control">
              </div>
            </div>
            <button type="submit">Filter</button>
          </div>
        </form>
      </div>
      <div v-if="loading" class="info alert alert-info">Loading...</div>
      <div v-if="error" class="info alert alert-danger">{{ error }}</div>
      <div id="content">
        <div class="table-and-details">
          <div class="table-container">
            <table>
              <thead>
              <tr>
                <th>Account From</th>
                <th>Account To</th>
                <th>Amount</th>
                <th>Initiator</th>
                <th>Transaction Type</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(transaction, index) in transactions" :key="transaction.id"
                  :class="{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }">
                <td>{{ transaction.accountFrom?.iban}}</td>
                <td>{{transaction.accountTo?.iban}}</td>
                <td>{{ transaction.amount }}</td>
                <td>{{ transaction.initiator }}</td>
                <td>{{ transaction.transactionType }}</td>
                <td>{{ transaction.date }}</td>
                <td>{{ transaction.time }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axiosInstance from '/axios.js';

export default {
  data(){
    return{
      transactions:[],
      loading:true,
      error:null,
      filters: {
        ibanFrom: '',
        ibanTo: '',
        amountMin: null,
        amountMax: null,
        dateFrom: '',
        dateTo: '',
        type: ''
      }
    }
  },
  created() {
    this.fetchTransactions();
  },
  methods:{
    fetchTransactions(){
      this.loading = true;
      const params = {
        limit: 50,
        offset: 0,
        ibanFrom: this.filters.ibanFrom || undefined,
        ibanTo: this.filters.ibanTo || undefined,
        amountMin: this.filters.amountMin || undefined,
        amountMax: this.filters.amountMax || undefined,
        dateFrom: this.filters.dateFrom || undefined,
        dateTo: this.filters.dateTo || undefined,
        type: this.filters.type || undefined
      };

      axiosInstance.get('/transactions', {params})
          .then(response => {
            this.error = null;
            this.transactions = response.data;
            this.loading = false;
          })
          .catch(error => {
            this.transactions = [];
            this.error = error.response.data;
            this.loading = false;
          });
    }
  }
}
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

.filters-container {
  width: fit-content;
}

.filters-container button {
  width: 100%;
  padding: 8px 0;
}

.filters {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group input {
  margin-bottom: 10px;
}

.info {
  margin-top: 15px;
  margin-bottom: 0;
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
  margin-top: 20px;
}

th, td {
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
.even-row {
  background-color: #cce3ef;
}

/* Style for odd rows */
.odd-row {
  background-color: #ffffff;
}
</style>