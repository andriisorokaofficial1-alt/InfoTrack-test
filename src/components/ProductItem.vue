<script setup lang="ts">
import type { Item, OrderItem } from '@/types/types'

defineProps<{
  item: Item | OrderItem
  isInOrder: boolean
}>()
</script>

<template>
  <div v-if="!isInOrder" class="product-card">
    <span class="category">{{ item.category }}</span>
    <div class="product-image">
      <img alt="" src="../assets/logo.png" />
    </div>
    <div class="product-details">
      <h3 class="product-name">{{ item.name }}</h3>
      <p class="product-price">${{ item.price.toFixed(2) }}</p>
    </div>
    <button type="button" class="btn btn-primary add-btn" @click="$emit('onAddItem', item)">
      Add to cart
    </button>
  </div>

  <div v-else class="product-card product-card--order">
    <button
      type="button"
      class="btn btn-ghost remove-btn"
      @click="$emit('onRemoveProductItem', item.id)"
    >
      Remove
    </button>
    <div class="product-image">
      <img alt="" src="../assets/logo.png" />
    </div>
    <h3 class="product-name">{{ item.name }}</h3>
    <p class="product-price">${{ item.price.toFixed(2) }}</p>
    <div class="quantity-controls">
      <button type="button" class="btn btn-secondary btn-sm" @click="$emit('onRemoveItem', item.id)">
        −
      </button>
      <span class="quantity">{{ (<OrderItem>item).itemsInOrder }}</span>
      <button type="button" class="btn btn-secondary btn-sm" @click="$emit('onAddItem', item.id)">
        +
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
  transition: box-shadow 0.2s;
}

.product-card:hover {
  box-shadow: var(--shadow-md);
}

.product-card--order {
  align-items: center;
  text-align: center;
}

.category {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-accent);
}

.product-image {
  background: var(--color-bg);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  min-height: 120px;
}

.product-image > img {
  width: 50%;
  max-width: 100px;
}

.product-details {
  flex: 1;
}

.product-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.3;
}

.product-price {
  margin: 0.25rem 0 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-primary);
}

.add-btn {
  width: 100%;
}

.remove-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity {
  font-size: 1.125rem;
  font-weight: 600;
  min-width: 1.5rem;
  text-align: center;
}
</style>
