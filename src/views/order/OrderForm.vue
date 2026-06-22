<script setup lang="ts">
import { reactive, ref, type Ref } from 'vue'
import InputItem from '@/components/InputItem.vue'
import type { OrderFormData } from '@/types/types.ts'

const emit = defineEmits<{
  (e: 'onSubmitOrder', fromData: OrderFormData): void
  (e: 'onCloseDialog'): void
}>()

const createInitialState = {
  firstName: '',
  lastName: '',
  email: '',
  shippingSpeed: 'standard',
  address: '',
  city: '',
  state: '',
  ZIPCode: undefined,
  country: '',
  phoneNumber: '',
  termsConditions: false,
}
const isFormValid = ref(false)
const formData = reactive<OrderFormData>({ ...createInitialState })

const shippingSpeedOpitons = ['standard', 'express', 'next‑day']

const validatedFields: Ref<{ [key: string]: boolean }> = ref(
  Object.keys(createInitialState).reduce(
    (obj, item: string) => {
      if (item === 'shippingSpeed') return obj
      obj[item] = false
      return obj
    },
    {} as { [key: string]: boolean },
  ),
)

const onValidation = (isValid: boolean, id: string) => {
  validatedFields.value[id] = isValid
  isFormValid.value = Object.values(validatedFields.value).every((item) => item === true)
}
</script>

<template>
  <div class="order-form">
    <button type="button" class="btn btn-ghost btn-cancel" @click="emit('onCloseDialog')">
      Close
    </button>

    <h2 class="form-title">Complete your order</h2>

    <form @submit.prevent="emit('onSubmitOrder', formData)">
      <div class="form-section">
        <h3>Personal information</h3>
        <InputItem
          id="firstName"
          label="First name"
          required
          type="text"
          validate
          v-model="formData.firstName"
          @on-validation="onValidation"
        />
        <InputItem
          id="lastName"
          label="Last name"
          type="text"
          required
          validate
          v-model="formData.lastName"
          @on-validation="onValidation"
        />
        <InputItem
          id="email"
          required
          label="Email"
          type="email"
          validate
          v-model="formData.email"
          @on-validation="onValidation"
        />
        <InputItem
          id="phoneNumber"
          label="Phone number"
          type="tel"
          validate
          v-model="formData.phoneNumber"
          required
          @on-validation="onValidation"
        />
      </div>

      <div class="form-section">
        <h3>Shipping information</h3>
        <InputItem
          id="country"
          label="Country"
          type="text"
          validate
          v-model="formData.country"
          required
          @on-validation="onValidation"
        />
        <InputItem
          id="state"
          label="State"
          type="text"
          validate
          v-model="formData.state"
          required
          @on-validation="onValidation"
        />
        <InputItem
          id="city"
          label="City"
          type="text"
          validate
          v-model="formData.city"
          required
          @on-validation="onValidation"
        />
        <InputItem
          id="address"
          label="Address"
          type="text"
          validate
          v-model="formData.address"
          required
          @on-validation="onValidation"
        />
        <InputItem
          id="ZIPCode"
          label="ZIP Code"
          type="number"
          validate
          required
          v-model="formData.ZIPCode"
          @on-validation="onValidation"
        />
        <div class="shipping-speed">
          <label class="form-label" for="shippingSpeed">Shipping speed</label>
          <select id="shippingSpeed" class="form-input" v-model="formData.shippingSpeed">
            <option v-for="item in shippingSpeedOpitons" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-section terms-conditions">
        <InputItem
          id="termsConditions"
          required
          type="checkbox"
          label="I accept the Terms & Conditions"
          v-model="formData.termsConditions"
          @on-validation="onValidation"
        />
      </div>

      <button type="submit" class="btn btn-primary submit-btn" :disabled="!isFormValid">
        Submit order
      </button>
    </form>
  </div>
</template>

<style scoped>
.order-form {
  position: relative;
  padding: 1.5rem;
  background: var(--color-surface);
}

.form-title {
  margin: 0 0 1.25rem;
  font-size: 1.25rem;
  font-weight: 700;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.form-section {
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.form-section h3 {
  margin: 0 0 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-text-muted);
}

.terms-conditions {
  border-bottom: none;
  padding-top: 1rem;
}

.shipping-speed {
  display: flex;
  flex-direction: column;
}

.submit-btn {
  margin-top: 1.25rem;
  width: 100%;
}

.btn-cancel {
  position: absolute;
  right: 1rem;
  top: 1rem;
}

.terms-conditions > .field {
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: flex-start;
}
</style>
