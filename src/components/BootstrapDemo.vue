<template>
    <div class="container mt-4">
      <b-button variant="primary" @click="showAlert">A Demo Button</b-button>
      <b-alert v-if="alertVisible" variant="success" dismissible @dismissed="alertVisible = false">
        You clicked the button!
      </b-alert>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const alertVisible = ref(false);
  
      function showAlert() {
        alertVisible.value = true;
      }
  
      return { alertVisible, showAlert };
    },
  };
  </script>
  
  <style scoped>
  /* 可以在此处添加自定义样式 */
  </style>
  