<template>
  <div class="table-responsive">
    <div class="table-responsive-sm">
      <h2>Transaction History</h2>
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>
      <div v-if="transactions.length">
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
    }
  },
  created() {
    this.fetchTransactions();
  },
  methods:{
    fetchTransactions(){
      axiosInstance.get('/transactions', {params:{limit:50, offset:0}})
        .then(response => {
          this.transactions = response.data;
          console.log(response.data);
          this.loading = false;
        })
        .catch(error => {
          this.error = error;
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