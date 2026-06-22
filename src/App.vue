<script setup lang="ts">
import Basket from './components/BasketItem.vue'
import { useOrderStore } from './stores/order.ts'

const store = useOrderStore()
</script>

<template>
  <header class="app-header">
    <nav>
      <RouterLink to="/">Products</RouterLink>
      <RouterLink to="/order">My order</RouterLink>
    </nav>
    <h1><RouterLink to="/">InfoTrack Shop</RouterLink></h1>
    <RouterLink to="/order" class="basket-link">
      <Basket :items="store.itemsInOrderCount" />
    </RouterLink>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
.app-header {
  background: var(--color-primary);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 72px;
  padding: 0 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

h1 {
  margin: 0;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
}

h1 > a {
  text-decoration: none;
  color: white;
}

nav {
  display: flex;
  gap: 1.5rem;
}

nav > a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.9375rem;
  font-weight: 500;
  padding-bottom: 0.25rem;
  border-bottom: 2px solid transparent;
  transition: color 0.2s, border-color 0.2s;
}

nav > a:hover {
  color: white;
}

nav > a.router-link-active {
  color: white;
  border-bottom-color: white;
}

.basket-link {
  text-decoration: none;
  color: white;
}

main {
  min-height: calc(100vh - 72px);
}
</style>
