<template>
  <div v-if="show" class="popup-overlay">
    <div class="popup">
      <p>User with similar data already exists</p>
      <button class="ok-button" @click="closePopup">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['show'],
  methods: {
    closePopup() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.popup p {
  margin: 20px 0;
  font-family: Arial, sans-serif;
  font-size: 18px;
}

.ok-button {
  padding: 10px 20px;
  background-color: #204E37;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.ok-button:hover {
  background-color: #1A3E2D;
}
</style>
