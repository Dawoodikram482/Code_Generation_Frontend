<template>
  <div class="pending-approvals">
    <h2>Pending Approvals</h2>

    <table>
      <thead>
      <tr>
        <th>BSN</th>
        <th>Name</th>
        <th>Email</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.bsn }}</td>
        <td>{{ user.firstName }} {{ user.lastName }}</td>
        <td>{{ user.email }}</td>
        <td class="buttons">
          <div>
          <button @click="approveUser(user)">Approve</button>
          </div>
          <div>
          <button @click="rejectUser(user)">Reject</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axiosInstance from '/axios.js';

export default {
  data() {
    return {
      users: [],
      loading: true,
      error: null
    };
  },
  created() {
    this.fetchPendingApprovals();
  },
  methods: {
    fetchPendingApprovals() {
      axiosInstance
          .get('/users/pending-approvals', {
            params: {
              limit: 50,
              offset: 0,

            }
          })
          .then(response => {
            this.users = response.data;
            this.loading = false;
          })
          .catch(error => {
            this.error = error.message;
            this.loading = false;
          });
    },
    approveUser(user) {
      // Implement approve user functionality
    },
    rejectUser(user) {
      // Implement reject user functionality
    }
  }
};
</script>

<style>
h2 {
  color: #008773;
  font-family: serif;
}
.pending-approvals {
  max-width: 100%;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
td{
  width: 50%;
}
th {
  background-color: #f2f2f2;
  text-align: left;
}

button {
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 3px;
}
.buttons{
  width: 500px;
}
button:hover {
  background-color: #0056b3;
}
</style>
