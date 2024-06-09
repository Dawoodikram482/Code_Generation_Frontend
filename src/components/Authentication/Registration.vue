<template>
  <section class="vh-100 gradient-custom">
    <div class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>
    <div class="registration-container">
                <img src="/src/assets/logo.png" alt="Logo" class="w-24 items-end justify-end mx-auto d-block" />
                <h2 class="text-center"> Register as a new client</h2>
              </div>
    <br>
              <form class="registration-form">
                <label class="form-field" for="inputFirstName">First Name</label>
                <input id="inputFirstName" v-model="firstName" type="text" class="form-control bg-white border border-black rounded-sm focus:outline-none focus:ring-0 focus:border-black h-10 w-full" />

                <label class="form-field" for="inputLastName">Last Name</label>
                <input id="inputLastName" v-model="lastName" type="text" class="form-control bg-white border border-black rounded-sm focus:outline-none focus:ring-0 focus:border-black h-10 w-full" />

                <label class="form-field" for="inputEmail">Email</label>
                <input id="inputEmail" v-model="email" type="text" class="form-control bg-white border border-black rounded-sm focus:outline-none focus:ring-0 focus:border-black h-10 w-full" />

                <label class="form-field" for="inputPhoneNumber">Phone Number</label>
                <input id="inputPhoneNumber" v-model="phoneNumber" type="text" class="form-control bg-white border border-black rounded-sm focus:outline-none focus:ring-0 focus:border-black h-10 w-full" />

                <label class="form-field" for="inputBSN">BSN</label>
                <input id="inputBSN" v-model="bsn" type="text" class="form-control bg-white border border-black rounded-sm focus:outline-none focus:ring-0 focus:border-black h-10 w-full" />

                <label for="inputPassword" class="form-field">Create a password</label>
                <div class="input-group w-full">
                  <input type="password" v-model="password" class="form-control bg-white border border-black rounded-sm focus:outline-none focus:ring-0 focus:border-black h-10 w-full" id="inputPassword" />
                  <div class="input-group-append">
                  </div>
                </div>
              </form>
                <div class="button-container">
                  <button class="registerButton" name="registerButton" id="registerButton" @click="register" type="submit">Register
                  </button>
                  <br>
                  <p href="/login">Already have an account? <a @click="login" class="text-white-50 items-center fw-bold">Log In</a></p>
                </div>

  </section>
  <popup v-if="showPopup" :show="showPopup" @close="showPopup = false" />
</template>

<script>
import axios from 'axios';
import Popup from '@/components/UserAlreadyExist.vue';
import router from '@/router';
import axiosInstance from "../../../axios.js";
export default {
  name: 'Register',
  components: {
    Popup
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      bsn: '',
      phoneNumber: '',
      errorMessage: '',
      loading: false,
      showPopup: false
    };
  },
  methods: {
    async register() {
      this.loading = true;
      this.errorMessage = '';
      try {
        const response = await axiosInstance.post('/users/register', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          bsn: this.bsn,
          phoneNumber: this.phoneNumber
        });
        console.log('Response:', response);
        if (response.data.status === 'success') {
          this.showPopup = false;
          router.push('/RegistrationSuccessful');
        }
        else {
          this.errorMessage = 'An unexpected error occurred.';
        }
      } catch (error) {
        console.error('Error:', error);

        if (error.response && error.response.status === 409) {
          this.errorMessage = error.response.data.message;
          this.showPopup = true;
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      } finally {
        this.loading = false;
      }
    },
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  }
};
</script>

<style>

.registration-container {
  display: contents;
  flex-direction: column;
  align-items: center;
  margin-left: 50%;
}

.button-container {
  margin: 0 auto;
}
.registration-form {
  max-width: 400px; /* Set the maximum width for the form */
  margin: 0 auto; /* Center the form horizontally */
  padding: 20px; /* Add padding for better appearance */
  border: 1px solid #ccc; /* Optional: Add a border for better visibility */
  border-radius: 8px; /* Optional: Rounded corners */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow for better appearance */
}
.form-field {
  margin-bottom: 15px;
}

body, #app {
  display: block;
}

.registerButton {
  background-color: #f59e0b;
  font-weight: 600;
  margin: 0 auto;
}


.form-control {
  background-color: #f3f3f3;
  border: none;

  padding: 0.75rem;
  font-size: 1rem;
}

.form-label {
  color: #000;
  font-size: 0.875rem;
}


.alert-danger {
  background-color: #ffebee;
  color: #b71c1c;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.text-uppercase {
  text-transform: uppercase;
}

.text-white-50 {
  color: rgba(255, 255, 255, 0.5);
}

.mb-0 {
  margin-bottom: 0;
}

.mt-md-4 {
  margin-top: 1.5rem;
}

.pb-5 {
  padding-bottom: 3rem;
}

.px-5 {
  padding-left: 3rem;
  padding-right: 3rem;
}

.custom-select {
  appearance: none;
  background-image: url('../../../../../IdeaProjects/Code_Generation_Frontend/src/assets/icons8-sort-down-25.png');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px 16px;
  padding-right: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
}

.custom-select:focus {
  outline: none;
  box-shadow: none;
}

.custom-select option[disabled][hidden] {
  display: none;
}

.custom-select option[value=""] {
  color: #999;
}
.text-center {
  font-weight: bolder;
}


</style>
