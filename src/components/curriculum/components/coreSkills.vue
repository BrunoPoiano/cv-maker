<script setup lang="ts">
import type { Curriculum } from '@/types'
import List from '@/ui/list.vue'
import Title from './title.vue'
import { CurriculumConst } from '@/constants/curriculum'
import { inject } from 'vue'
import { CurriculumKey } from '@/main'

const coreSkills = inject<Curriculum>(CurriculumKey, CurriculumConst).CoreSkills
const { boldMatches } = defineProps<{ boldMatches: (v: string) => string }>()
</script>

<template>
	<Title>CORE SKILLS</Title>
	<div class="coreSkills">
		<List
			:fontSize="coreSkills.size"
			:coreSkills="coreSkills.skills"
			:boldMatches="boldMatches"
		/>
	</div>
</template>
