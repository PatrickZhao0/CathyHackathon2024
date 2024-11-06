<template>
  <header>
  </header>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import { requestGet } from '../request/axios'
import { onMounted, ref } from 'vue'
</script>