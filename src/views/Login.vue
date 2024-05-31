<template>
  <div class="container login-container" >
      <img src="/logo.png" class="text-left"/>
      <h2 class="text-center">Login</h2>
      <div class="alert alert-danger" role="alert" v-if="invalidLogin">
          Invalid Email or Password
      </div>
      <form v-on:submit.prevent="login" class="login-form">
  <div class="form-group mt-2">
    <label>Email:</label>
    <input class="form-control" type="email" v-model="email" />
  </div>
  <div class="form-group mt-2">
    <label>Password:</label>
    <input class="form-control" type="password" v-model="password" />
  </div>
  <div class="form-group mt-2">
    <button class="btn btn-primary w-100" disabled type="button" v-if="loading">
      <span aria-hidden="true" class="spinner-grow spinner-grow-sm" role="status"></span>
      Login
    </button>
    <button class="btn btn-primary w-100 mt-2" type="submit" v-else>Login</button>
  </div>
</form>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      invalidLogin: false, // Added invalidLogin data property
      loading: false
    };
  },
  methods: {
    validateForm() {
      if (this.email === "" || this.password === "") {
        this.invalidLogin = true;
      } else {
        this.invalidLogin = false;
        this.login();
      }
    },
    login() {
      this.loading = true;
      axios
        .post("http://localhost:8080/login", {
          email: this.email,
          password: this.password
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("There was a problem with the Axios request:", error);
          this.invalidLogin = true;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style scoped>

.container.login-container{
  height: 100%;
  width: 100%;
  background-color: aquamarine;
}


.login-form {
  max-width: 400px; /* Set the maximum width for the form */
  margin: 0 auto; /* Center the form horizontally */
  padding: 20px; /* Add padding for better appearance */
  border: 1px solid #ccc; /* Optional: Add a border for better visibility */
  border-radius: 8px; /* Optional: Rounded corners */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow for better appearance */
}

.login-form .form-group {
  margin-bottom: 15px; /* Space between form groups */
}

.login-form .form-control {
  width: 100%; /* Make inputs take full width of the form */
}

.login-form .btn {
  width: 100%; /* Make buttons take full width of the form */
}

.login-container {
  display: contents;
  flex-direction: column;
  align-items: center;
  margin-left: 50%;
}

.login-container img {
  display: block;
  width: 20%;
  margin: 0 auto;
  position: right;
}
</style>
