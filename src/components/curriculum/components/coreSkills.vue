<script setup lang="ts">
import type { Curriculum } from '@/types'
import List from '@/ui/list.vue'
import Title from './title.vue'

const { coreSkills } = defineProps<{ coreSkills: Curriculum['CoreSkills'] }>()
</script>

<template>
  <Title>CORE SKILLS</Title>
  <div class="coreSkills">
    <List :coreSkills="coreSkills" />
  </div>
</template>
