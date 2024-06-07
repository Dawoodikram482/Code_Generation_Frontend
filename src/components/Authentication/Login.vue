<template>
  <div v-if="!userSessionStore.user" class="container login-container">
    <img src="/logo.png" class="text-left"/>
    <div class="welcome-message">
      <h2 class="text-center">Welcome to Our Bank</h2>
    </div>
    <div class="login-prompt">
      <h4 class="text-center">Please log in to access your account.</h4>
    </div>
    <div class="alert alert-danger" role="alert" v-if="invalidLogin">
      Invalid Email or Password
    </div>
    <form @submit.prevent="login" class="login-form">
      <div class="form-group mt-2">
        <label>Email:</label>
        <input class="form-control" type="email" v-model="email"/>
      </div>
      <div class="form-group mt-2">
        <label>Password:</label>
        <input class="form-control" type="password" v-model="password"/>
      </div>
      <div class="form-group mt-2">
        <button class="btn btn-primary w-100" :disabled="loading" type="submit">
          <span v-if="loading" class="spinner-grow spinner-grow-sm" role="status"></span>
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </div>
    </form>
  </div>
  <div v-else class="container login-container">
    <div class="logged-in-message">
      <p>You are already logged in.</p>
    </div>
  </div>
</template>

<script>
import { useUserSessionStore } from "@/stores/UserSession";
import { Notify } from 'quasar';

export default {
  name: "Login",
  setup() {
    const userSessionStore = useUserSessionStore();

    return {
      userSessionStore,
      email: "",
      password: "",
      loading: false,
      invalidLogin: false
    };
  },
  methods: {
    async login() {
      this.loading = true;
      try {
        await this.userSessionStore.login(this.email, this.password);
        this.invalidLogin = false; // Reset invalid login state
        Notify.create({
          color: 'positive',
          position: 'top',
          message: 'Login successful'
        });
        await this.userSessionStore.checkUserRole();
        // Determine the route based on user role
        let route = "/";
        switch (this.userSessionStore.user.role) {
          case 'ROLE_EMPLOYEE':
            route = "/accountsOverview";
            break;
          case 'ROLE_CUSTOMER':
            route = "/CustomerAccountOverview";
            break;
            // Add more cases for other roles if needed
          default:
            route = "/";
        }
        // Redirect to the determined route
        this.$router.push(route);
      } catch (error) {
        this.invalidLogin = true;
        if (error.response) {
          Notify.create({
            color: 'negative',
            position: 'top',
            message: error.response.data.message,
            icon: 'warning'
          });
        } else {
          Notify.create({
            color: 'negative',
            position: 'top',
            message: 'An error occurred',
            icon: 'warning'
          });
        }
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
h4{
color: darkolivegreen;
}
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
.welcome-message {
  margin-bottom: 30px;
}

.login-prompt {
  margin-bottom: 10px;
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

.logged-in-message {
  text-align: center;
  font-size: 30px;
  color: #008773;
  padding: 40px;
  background-color: #f3f3f3;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
