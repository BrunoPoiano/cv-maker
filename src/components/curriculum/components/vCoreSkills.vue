<script setup lang="ts">
import { ProviderKey } from '@/main'
import type { BoldMatchReturn } from '@/types'
import List from '@/ui/appList.vue'
import { inject } from 'vue'
import Title from './CvTitle.vue'

const { curriculum } = inject(ProviderKey)!
const { boldMatches } = defineProps<{
	boldMatches: (value: string) => BoldMatchReturn
}>()
</script>

<template>
	<div v-if="curriculum.CoreSkills.show">
		<Title>{{
			curriculum.Settings.language === 'en'
				? 'CORE SKILLS'
				: 'HABILIDADES TÉCNICAS'
		}}</Title>
		<div class="coreSkills">
			<List
				:fontSize="curriculum.CoreSkills.size"
				:coreSkills="curriculum.CoreSkills.skills"
				:boldMatches="boldMatches"
			/>
		</div>
	</div>
</template>
