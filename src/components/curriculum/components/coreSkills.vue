<script setup lang="ts">
import type { Curriculum } from '@/types'
import List from '@/ui/list.vue'
import Title from './title.vue'
import { CurriculumConst } from '@/constants/curriculum'
import { inject } from 'vue'

const coreSkills = inject<Curriculum>('curriculum', CurriculumConst).CoreSkills
</script>

<template>
  <Title>CORE SKILLS</Title>
  <div class="coreSkills">
    <List :coreSkills="coreSkills" />
  </div>
</template>
