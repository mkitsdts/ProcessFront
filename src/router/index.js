import { createRouter, createWebHistory } from 'vue-router'
//import Login from '../components/Login.vue'
//import Register from '../components/Register.vue'
import Wallet from '../components/Wallet.vue'
import Home from '../components/Home.vue'
import OrderForm from '../components/OrderForm.vue'

const routes = [
  { path: '/', component: Home },
  //{ path: '/login', component: Login },
  //{ path: '/register', component: Register },
  { path: '/wallet', component: Wallet },
  { path: '/home', component: Home },
  { path: '/create-order', component: OrderForm }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router