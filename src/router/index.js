import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PaymentSuccess from '../views/PaymentSuccess.vue'
import Info1 from '../views/Info1.vue'
 
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
    },
    {
      path: '/info1',
      name: 'info1',
      component: Info1
    }
  ]
})

export default router
