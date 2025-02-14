import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Wallet from '../components/Wallet.vue'
import Home from '../components/Home.vue'
import OrderForm from '../components/OrderForm.vue'
import Profile from '../components/Profile.vue'
import Setting from '../components/Setting.vue'
import OrderDetail from '../components/OrderDetail.vue'
import OrderOperation from '../components/OrderOperation.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/wallet', component: Wallet },
  { path: '/home', component: Home },
  { path: '/order/create', component: OrderForm },
  { path: '/profile', component: Profile },
  { path: '/setting', component: Setting },
  { path: '/order/detail', component: OrderDetail },
  { path: '/order/operation', component: OrderOperation }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router