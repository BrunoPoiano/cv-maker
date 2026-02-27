<script setup lang="ts">
import type { Curriculum } from '@/types'
import List from '@/ui/list.vue'
import Title from './title.vue'
import { CurriculumConst } from '@/constants/curriculum'
import { inject } from 'vue'
import { CurriculumKey } from '@/main'

const coreSkills = inject<Curriculum>(CurriculumKey, CurriculumConst).CoreSkills
</script>

<template>
	<Title>CORE SKILLS</Title>
	<div class="coreSkills">
		<List :coreSkills="coreSkills" />
	</div>
</template>
