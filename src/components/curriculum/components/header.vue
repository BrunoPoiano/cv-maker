<script setup lang="ts">
import type { Curriculum } from '@/types'
const { header } = defineProps<{ header: Curriculum['Header'] }>()
</script>

<template>
  <div class="header">
    <h1>{{ header.UserName }}</h1>
    <span class="label">{{ header.Label }}</span>
  </div>
</template>

<style scoped>
.header {
  h1 {
    padding: 0;
    margin: 0;
    font-size: 36px;
    color: #000000;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    font-weight: var(--font-weight);
  }

  .label {
    font-size: 16px;
    color: var(--light-color);
    text-transform: uppercase;
    letter-spacing: 0.099em;
    font-weight: var(--font-weight);
  }
}
</style>
