<script setup lang="ts">
defineProps<{
  items: number
}>()
</script>

<template>
  <div class="basket">
    <svg width="28" height="28" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0z"/>
      <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6z"/>
    </svg>
    <span v-if="items > 0" class="badge">{{ items }}</span>
  </div>
</template>

<style scoped>
.basket {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
}

.badge {
  position: absolute;
  top: -4px;
  right: -8px;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.25rem;
  background: white;
  color: var(--color-primary);
  font-size: 0.6875rem;
  font-weight: 700;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
