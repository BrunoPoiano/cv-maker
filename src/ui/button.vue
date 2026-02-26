<script setup lang="ts">
import type { ButtonHTMLAttributes } from 'vue'

defineOptions({
  inheritAttrs: false,
})

type Props = {
  type?: 'button' | 'submit' | 'reset'
  label: string | Element
}

const props = defineProps<Props>()
</script>

<template>
  <button v-bind="$attrs" :type="props.type ?? 'button'">{{ props.label }}</button>
</template>

<style scoped>
button {
  padding: 0.4rem 0.8rem;
  background: white;
  border-radius: 8px;
  min-width: 5ch;
  cursor: pointer;
}
</style>
