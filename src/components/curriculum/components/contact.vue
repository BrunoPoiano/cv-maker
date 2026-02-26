<script setup lang="ts">
import type { Curriculum } from '@/types'

const { contact } = defineProps<{ contact: Curriculum['Contact'] }>()
</script>

<template>
  <div class="contact">
    <span>Email: {{ contact.email }}</span>
    <span>Linkedin: {{ contact.linkedin }}</span>
    <span>GitHub: {{ contact.github }}</span>
  </div>
</template>

<style scoped>
.contact {
  display: grid;
  gap: 0.2cm;
  span {
    color: var(--light-color);
    font-size: 12px;
    font-weight: var(--font-weight);
  }
}
</style>
