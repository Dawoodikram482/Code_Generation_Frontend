<template>
  <div class="table-responsive">
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
          <tr v-for="(person, index) in people" :key="index" :class="{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }">
            <td style="width: 200px">{{ person.name }}</td>
            <td>{{ person.iban }}</td>
            <td>{{ person.registrationDate }}</td>
            <td>
              <div class="dropdown-menu">
                <a href="#" @click.prevent="showUserDetails(person)">User Details</a>
                <a href="#">View Transactions</a>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    people: Array,
  },
  methods: {
    showUserDetails(user) {
      this.$emit('show-user-details', user);
    },
  },
};
</script>

<style scoped>
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

.dropdown-menu {
  display: none;
  position: absolute;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1;
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
</style>
