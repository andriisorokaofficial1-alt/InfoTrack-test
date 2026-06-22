<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue'
import ProductItem from '@/components/ProductItem.vue'
import type { Item, OrderItem } from '@/types/types'
import { useOrderStore } from '@/stores/order'
import { fetchProducts } from '@/services/productService'

const items = shallowRef<Item[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const store = useOrderStore()

const loadProducts = async () => {
  isLoading.value = true
  error.value = null
  try {
    items.value = await fetchProducts()
  } catch {
    error.value = 'Failed to load products'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadProducts)

const addItem = (item: Item | OrderItem) => {
  store.addItemToOrder(item)
}
</script>

<template>
  <section>
    <div v-if="isLoading" class="loading-state">
      <div class="spinner" aria-label="Loading products" />
      <p>Loading products...</p>
    </div>
    <p v-else-if="error" class="error-message">{{ error }}</p>
    <ProductItem
      v-else
      v-for="item in items"
      :key="item.id"
      :item="item"
      :isInOrder="false"
      @onAddItem="addItem"
    />
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.25rem;
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.loading-state {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 0;
  color: var(--color-text-muted);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.error-message {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--color-error);
  padding: 2rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
