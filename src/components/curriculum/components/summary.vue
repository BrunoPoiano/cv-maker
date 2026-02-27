<script setup lang="ts">
import type { Curriculum } from '@/types'
import List from '@/ui/list.vue'
import Title from './title.vue'
import { inject } from 'vue'
import { CurriculumConst } from '@/constants/curriculum'

const summary = inject<Curriculum>('curriculum', CurriculumConst).Summary
</script>

<template>
  <Title>SUMMARY</Title>
  <div class="summary">
    <List :genericList="summary" />
  </div>
</template>
