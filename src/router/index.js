import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PaymentSuccess from '../views/PaymentSuccess.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home 
    },
    {
      path: '/paymentSuccess',
      name: 'paymentSuccess',
      component: PaymentSuccess
    }
  ]
})

export default router
