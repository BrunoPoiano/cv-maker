<script setup lang="ts">
import type { Curriculum } from '@/types'
import List from '@/ui/list.vue'
import Title from './title.vue'
const { experience } = defineProps<{ experience: Curriculum['Experience'] }>()

function fixDate(date: unknown) {
  if (date instanceof Date) {
    return `${date.getMonth().toString().padStart(2, '0')}/${date.getFullYear()}`
  }

  if (typeof date === 'string') {
    const newDate = new Date(date)
    return `${newDate.getMonth().toString().padStart(2, '0')}/${newDate.getFullYear()}`
  }

  return ''
}
</script>

<template>
  <Title>PROFESSIONAL EXPERIENCE</Title>
  <div class="experience">
    <div v-for="job in experience">
      <span class="title">
        {{ job.Label }} - {{ job.CompanyName }} | {{ fixDate(job.StartDate) }} -
        {{ job.EndDate ? fixDate(job.EndDate) : 'atual' }}
      </span>
      <List :genericList="job.Description" />
    </div>
  </div>
</template>

<style scoped>
.experience {
  display: grid;
  gap: 0.6rem;
  .title {
    display: block;
    font-size: 14px;
    font-weight: var(--font-weight);
    margin-bottom: 0.5rem;
  }
}
</style>
