<template>
  <section class="vh-100 gradient-custom">
    <div class="alert alert-danger" v-if="errorMessage">{{ errorMessage }}</div>
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card-body p-5 text-center">
            <div class="mb-md-5 mt-md-4 pb-5">
              <h2 class="fw-bold mb-4 text-uppercase">Register</h2>

              <div class="form-outline form-white mb-4">
                <input id="inputFirstName" v-model="firstName" type="text" class="form-control" />
                <label class="form-label" for="inputFirstName">First Name</label>
              </div>

              <div class="form-outline form-white mb-4">
                <input id="inputLastName" v-model="lastName" type="text" class="form-control" />
                <label class="form-label" for="inputLastName">Last Name</label>
              </div>

              <div class="form-outline form-white mb-4">
                <input id="inputEmail" v-model="email" type="text" class="form-control" />
                <label class="form-label" for="inputEmail">Email</label>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <input type="password" v-model="password" class="form-control" id="inputPassword" />
                  <div class="input-group-append">
                    <button type="button" class="btn btn-secondary ml-2" @click="togglePassword"
                      id="passwordToggleButton">
                      Show password
                    </button>
                  </div>
                </div>
                <label for="inputPassword" class="form-control-label">Password</label>
              </div>

              <div class="form-group">
                <div class="input-group">
                  <input type="password" v-model="confirmPassword" class="form-control" id="inputConfirmPassword" />
                </div>
                <label for="inputConfirmPassword" class="form-control-label">Confirm Password</label>
              </div>

              <div class="form-outline form-white mb-4">
                <input id="inputBSN" v-model="bsn" type="text" class="form-control" />
                <label class="form-label" for="inputBSN">BSN Number</label>
              </div>

              <div class="form-outline form-white mb-4">
                <input id="inputAddress" v-model="address" type="text" class="form-control" />
                <label class="form-label" for="inputAddress">Address</label>
              </div>

              <div class="form-outline form-white mb-4">
                <input id="inputPhoneNumber" v-model="phoneNumber" type="text" class="form-control" />
                <label class="form-label" for="inputPhoneNumber">Phone Number</label>
              </div>

              <button class="btn btn-dark btn-lg px-5" name="registerButton" id="registerButton" @click="register"
                type="submit">Register</button>
            </div>

            <div>
              <p class="mb-0">Already have an account? <a @click="login" class="text-white-50 fw-bold">Log In</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
  
<script>
export default {
  name: 'Register',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      bsn: '',
      address: '',
      phoneNumber: '',
      errorMessage: ''
    };
  },
  methods: {
    register() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      if (!this.validateEmail(this.email)) {
        this.errorMessage = 'Invalid email format';
        return;
      }

      this.errorMessage = '';
      console.log('Registering user with details:', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        bsn: this.bsn,
        address: this.address,
        phoneNumber: this.phoneNumber
      });
      // Implement actual registration logic here
    },
    login() {
      this.$router.push('/login');
    },
    togglePassword() {
      const passwordField = document.getElementById('inputPassword');
      const confirmPasswordField = document.getElementById('inputConfirmPassword');
      const passwordToggleButton = document.getElementById('passwordToggleButton');

      if (passwordField.type === 'password') {
        passwordField.type = 'text';
        confirmPasswordField.type = 'text';
        passwordToggleButton.textContent = 'Hide password';
      } else {
        passwordField.type = 'password';
        confirmPasswordField.type = 'password';
        passwordToggleButton.textContent = 'Show password';
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
body, #app {
  display: block;
}

.card-body {
  background-color: #fff;
  border-radius: 1rem;
}

.form-control {
  background-color: #f3f3f3;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 1rem;
}

.form-label {
  color: #000;
  font-size: 0.875rem;
}

.btn-dark {
  background-color: #424242;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.75rem 2rem;
  font-size: 1rem;
}

.btn-dark:hover {
  background-color: #303030;
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
</style>
