<template>
  <div class="container">
    <div class="message">
      <h2>Registration <span class="highlight">successful</span></h2>
      <p>Your account is under processed</p>
    </div>
  </div>
</template>

<script>


export default {
  name: 'SuccessMessage'
}

</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.message {
  font-family: Arial, sans-serif;
}

.highlight {
  color: green;
  font-weight: bold;
}
</style>
