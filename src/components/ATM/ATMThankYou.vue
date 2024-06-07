<template>
  <div class="atm-dashboard">
    <i class="fa-regular fa-circle-check"></i>
    <h1>
      Thank You {{ username }}!
    </h1>

    <div class="buttons">
      <a href="/atm" class="btn-back">
        Back to Home
      </a>
    </div>

  </div>
</template>

<script>
import axiosInstance from "../../../axios.js";

export default {
  data() {
    return {
      username: ""
    };
  },
  created() {
    this.getAccounts();
  },
  methods: {
    getAccounts() {
      axiosInstance.get("/users/myAccountOverview")
          .then(response => {
            console.log(response.data)
            this.username = response.data.firstName + " " + response.data.lastName;
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap');

.atm-dashboard {
  font-family: "Roboto Mono", serif;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 20px;
  text-align: center;
}

h1 {
  color: #000;
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.fa-circle-check {
  color: rgba(0, 135, 115, 1);
  font-size: 100px;
}

.buttons {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.buttons button, .buttons a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  background: rgba(0, 135, 115, 1);
  color: #FFFFFF;
  transition: 300ms;
  text-transform: capitalize;
}

.buttons .btn-back {
  background: rgba(0, 135, 115, 0.70);
  color: #FFFFFF;
}

.buttons button:hover, .buttons .btn-back:hover {
  background: rgba(0, 135, 115, 0.85);
}
</style>
