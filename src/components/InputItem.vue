<script setup lang="ts">
import { validateData } from '@/services/validationService'
import { ref, watch } from 'vue'

const emit = defineEmits(['onValidation'])

const props = defineProps<{
  id: string
  type: string
  required?: boolean
  minLength?: number
  maxLength?: number
  placeholder?: string
  validate?: boolean
  label?: string
}>()

const model = defineModel<string | number | boolean>()
const errorMessage = ref<string>('')
const isValid = ref<boolean>(true)

watch(model, () => {
  if (!props.required && !props.validate) return

  if (
    props.required &&
    (model.value == null || (typeof model.value === 'string' && model.value === ''))
  ) {
    isValid.value = false
    errorMessage.value = 'Field is required'
  } else if (!props.required && typeof model.value === 'string' && model.value === '') {
    isValid.value = true
    errorMessage.value = ''
  } else if (
    props.minLength &&
    model.value &&
    typeof model.value === 'string' &&
    model.value.length < props.minLength
  ) {
    isValid.value = false
    errorMessage.value = `Field length should be equal to or more than ${props.minLength}`
  } else if (
    props.maxLength &&
    model.value &&
    typeof model.value === 'string' &&
    model.value.length > props.maxLength
  ) {
    isValid.value = false
    errorMessage.value = `Field length should be less than ${props.maxLength}`
  } else if (props.validate && model.value) {
    isValid.value = validateData(props.type, model.value)
    errorMessage.value = isValid.value ? '' : `Field ${props.label} is not valid`
  } else if (props.required && props.type === 'checkbox') {
    isValid.value = model.value as boolean;
  }
  emit('onValidation', isValid.value, props.id)
})
</script>

<template>
  <div class="field">
    <label v-if="label" class="form-label" :for="id">
      {{ required ? label + ' *' : label }}
    </label>
    <input
      :class="[
        type !== 'checkbox' && 'form-input',
        type !== 'checkbox' && !isValid && 'error',
      ]"
      :type="type"
      :id="id"
      :placeholder="placeholder"
      v-model="model"
    />
    <span v-show="(required || validate) && errorMessage" class="form-error">
      {{ errorMessage }}
    </span>
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
}

input[type='checkbox'] {
  width: auto;
  margin-right: 0.5rem;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
