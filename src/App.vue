<template>
  <div>
    <Nav />
  </div>

  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import Nav from './components/Nav.vue'
</script>