<template>
  <div class="container login-container">
    <img src="/logo.png" class="text-left"/>
    <h2 class="text-center">Login</h2>
    <div class="alert alert-danger" role="alert" v-if="invalidLogin">
      Invalid Email or Password
    </div>
    <form v-on:submit.prevent="login" class="login-form">
      <div class="form-group mt-2">
        <label>Email:</label>
        <input class="form-control" type="email" v-model="email"/>
      </div>
      <div class="form-group mt-2">
        <label>Password:</label>
        <input class="form-control" type="password" v-model="password"/>
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
import {useUserSessionStore} from "@/stores/UserSession.js";

export default {
  name: "Login",
  setup() {
    return {
      userSessionStore: useUserSessionStore(),
    };
  },
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    login(){
      this.userSessionStore.login(this.email, this.password)
          .then(() => {
            this.$q.notify({
              color: 'positive',
              position: 'top',
              message: 'Login successful',
              icon: 'check'
            });
            this.$router.push("/accountsOverview");
          })
          .catch((error) => {
            if(error.response){
              this.$q.notify({
                color: 'negative',
                position: 'top',
                message: error.response.data.message,
                icon: 'warning'
              });
            }
            else {
              this.$q.notify({
                color: 'negative',
                position: 'top',
                message: 'An error occurred',
                icon: 'warning'
              });
            }
            console.log(error);
          });
    }
  }
};
</script>

<style scoped>

.container.login-container {
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
