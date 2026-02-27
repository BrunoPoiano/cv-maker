<script setup lang="ts">
import { generateKey } from '@/helpers/generateKey'

type Props = {
  modelValue: string | number | null
  label?: string
  type?: string
  placeholder?: string
  id?: string
}

const props = defineProps<Props>()
const key = generateKey(5)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="content">
    <label :for="id ?? key">{{ props.label }}</label>
    <input
      :id="id ?? key"
      :type="props.type ?? 'text'"
      :placeholder="props.placeholder"
      :value="props.modelValue"
      @input="onInput"
    />
  </div>
</template>

<style scoped>
.content {
  display: grid;
  gap: 0.5rem;
  label {
    text-transform: capitalize;
  }

  input {
    border: 1px solid #80808070;
    border-radius: 10px;
    padding: 0.3rem 0.6rem;
  }
}
</style>
