import Order from '../views/order/OrderComponent.vue'
import Products from '../views/product/ProductsComponent.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: Products },
  { path: '/order', component: Order },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router
