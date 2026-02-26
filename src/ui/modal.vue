<script setup lang="ts">
import Button from '../ui/button.vue'

type Props = {
  buttonLabel: string | Element
  closeLabel: string | Element
}

const { buttonLabel, closeLabel } = defineProps<Props>()

import { generateKey } from '@/helpers/generateKey'
const key = generateKey(10)
</script>

<template>
  <dialog :id="key">
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

dialog {
  width: min(20rem, 100%);
  border: none;
  border-radius: 20px;
  padding: 1rem 2rem;

  box-shadow: 0px 0px 29px 0px rgba(0, 0, 0, 0.44);

  &::backdrop {
    background: #00000078;
    filter: blur(1.5rem);
  }
}
</style>
