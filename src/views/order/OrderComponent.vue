<script setup lang="ts">
import { useOrderStore } from '@/stores/order'
import { computed, ref, useTemplateRef } from 'vue'
import ProductItem from '@/components/ProductItem.vue'
import OrderForm from './OrderForm.vue'
import type { OrderFormData } from '@/types/types'
import { useRouter } from 'vue-router'

const store = useOrderStore()
const router = useRouter()
const isVisible = ref(false)
const dialogRef = useTemplateRef<HTMLDialogElement>('orderDialog')
const orderItems = computed(() => store.orderItems)
const dialogKey = ref(0)

const removeItem = (id: number) => {
  store.removeItemFromOrder(id)
}

const addItemCount = (id: number) => {
  store.addToItemCount(id)
}

const minusItemCount = (id: number) => {
  store.minusToItemCount(id)
}

const openDialog = () => {
  isVisible.value = true
  dialogRef.value?.showModal()
  dialogKey.value = ++dialogKey.value
}

const closeDialog = () => {
  isVisible.value = false
  dialogRef.value?.close()
}

const submitOrder = (data: OrderFormData) => {
  console.log(data)
  store.clearOrder()
  router.push('/')
  closeDialog()
}
</script>

<template>
  <section>
    <div class="order-list">
      <ProductItem
        v-for="item in orderItems"
        :key="item.id"
        class="item"
        :item="item"
        :isInOrder="true"
        @onRemoveProductItem="removeItem"
        @onAddItem="addItemCount"
        @onRemoveItem="minusItemCount"
      />
      <div v-if="!orderItems.length" class="empty-state">
        <p>Your cart is empty.</p>
        <RouterLink to="/" class="btn btn-primary">Browse products</RouterLink>
      </div>
    </div>

    <aside v-if="orderItems.length" class="checkout-panel">
      <div class="checkout-summary">
        <h2>Order summary</h2>
        <p class="item-count">{{ orderItems.length }} product(s) in cart</p>
        <button type="button" class="btn btn-primary checkout-btn" @click="openDialog">
          Checkout
        </button>
      </div>
    </aside>

    <dialog ref="orderDialog" @close="isVisible = false">
      <OrderForm
        :key="dialogKey"
        @onCloseDialog="closeDialog"
        @onSubmitOrder="submitOrder"
      />
    </dialog>
  </section>
</template>

<style scoped>
section {
  padding: 1.5rem;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
}

.order-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 640px;
}

.checkout-panel {
  width: 280px;
  position: sticky;
  top: 5rem;
  align-self: flex-start;
}

.checkout-summary {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
}

.checkout-summary h2 {
  margin: 0 0 0.5rem;
  font-size: 1.125rem;
}

.item-count {
  margin: 0 0 1.25rem;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.checkout-btn {
  width: 100%;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--color-surface);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-lg);
}

.empty-state p {
  margin: 0 0 1.25rem;
  color: var(--color-text-muted);
  font-size: 1.125rem;
}

.empty-state .btn {
  text-decoration: none;
}
</style>
