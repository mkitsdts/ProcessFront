import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Account from '../components/Account.vue'
import Balance from '../components/Balance.vue'
import OrderOverview from '../components/OrderOverview.vue'
import OrderDetail from '../components/OrderDetail.vue'
import OrderForm from '../components/OrderForm.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/account', component: Account },
  { path: '/balance', component: Balance },
  { path: '/orders', component: OrderOverview },
  { path: '/order/:id', component: OrderDetail },
  { path: '/create-order', component: OrderForm }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router