<template>
  <div class="user-details">
    <div>
      <h2>User Details</h2>
      <p>Name: {{ user.name }}</p>
      <p>IBAN: {{ user.iban }}</p>
      <p>Registration Date: {{ user.registrationDate }}</p>
      <p>Age: {{ user.age }}</p>
    </div>
    <div class="edit-and-close-user">
      <button class="btn btn-primary" @click="editUser">Edit</button>
      <button class="btn btn-danger" @click="closeAccount">Close Account</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      people: [
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

      selectedUser: null
    };
  },
  methods: {
    showUserDetails(user) {
      this.selectedUser = user;
      // Scroll to the top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};
</script>

<style scoped>
.user-details {
  width: 650px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgb(0, 0, 0);
  background-color: #deeef6;
}

.edit-and-close-user {
  margin-top: 20px;
}

.edit-and-close-user button {
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
