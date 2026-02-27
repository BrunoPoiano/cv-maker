<script setup lang="ts">
import { CurriculumConst } from '@/constants/curriculum'
import type { Curriculum } from '@/types'
import { inject } from 'vue'

const contact = inject<Curriculum>('curriculum', CurriculumConst).Contact
</script>

<template>
  <div class="contact" v-if="contact">
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
