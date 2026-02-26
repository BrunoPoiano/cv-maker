<script setup lang="ts">
import type { Curriculum } from '@/types'
import List from '@/ui/list.vue'
import Title from './title.vue'

const { summary } = defineProps<{ summary: Curriculum['Summary'] }>()
</script>

<template>
  <Title>SUMMARY</Title>
  <div class="summary">
    <List :genericList="summary" />
  </div>
</template>
