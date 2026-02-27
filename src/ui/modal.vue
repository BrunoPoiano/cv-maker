<script setup lang="ts">
import Button from '../ui/button.vue'

type Props = {
  buttonLabel: string | Element
  closeLabel: string | Element
  minWidth?: string
}

const { buttonLabel, closeLabel, minWidth } = defineProps<Props>()

import { generateKey } from '@/helpers/generateKey'
const key = generateKey(10)
</script>

<template>
  <dialog :id="key" :style="minWidth ? `min-width: min(${minWidth},100%)` : ''">
    <slot name="header" />
    <slot />
    <div class="footer">
      <slot name="footer" />
      <Button :commandfor="key" command="close" :label="closeLabel" />
    </div>
  </dialog>
  <Button command="show-modal" :commandfor="key" :label="buttonLabel" />
</template>

<style scoped>
.footer {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
