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
      <tr v-for="user in pendingUsers" :key="user.id">
        <td>{{ user.bsn }}</td>
        <td>{{ user.firstName }} {{ user.lastName }}</td>
        <td>{{ user.email }}</td>
        <td class="buttons">
          <div>
            <button @click="approveUser(user)">Approve</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { usePendingApprovalsStore } from '@/stores/storeForEmployee.js';
import { computed, onMounted } from "vue";

export default {
  setup() {
    const store = usePendingApprovalsStore();

    const pendingUsers = computed(() => store.users);
    const loading = store.loading;

    onMounted(async () => {
      await fetchPendingApprovals();
    });

    const fetchPendingApprovals = async () => {
      await store.fetchPendingApprovals();
    };

    const approveUser = async (user) => {
      await store.approveUser(user);
      await store.fetchPendingApprovals();
    };

    return {
      pendingUsers,
      loading,
      fetchPendingApprovals,
      approveUser,
    };
  },
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

th, td{
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
td{
  width: 50%;
}
th{
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
.buttons {
  width: 500px;
}
button:hover {
  background-color: #0056b3;
}
</style>
