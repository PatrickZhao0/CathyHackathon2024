<template>
  <header>
    <div class="wrapper">
    <Nav />
    </div>
  </header>

  <p>{{ JSON.stringify(data) }}</p>
  <RouterView />
</template>

<script setup>
import {RouterView } from 'vue-router'
import Nav from './components/nav.vue'
import { requestGet } from '../request/axios'
import { onMounted, ref } from 'vue'
const data = ref(null)

onMounted(async () => {
  data.value = await requestGet({url: '/getUserInfo', errfn: (error) => {console.log(error)}})
})
</script>