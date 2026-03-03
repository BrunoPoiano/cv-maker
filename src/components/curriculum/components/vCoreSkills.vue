<script setup lang="ts">
import List from '@/ui/appList.vue'
import Title from './CvTitle.vue'
import { inject } from 'vue'
import { ProviderKey } from '@/main'
import type { BoldMatchReturn } from '@/types'

const { curriculum } = inject(ProviderKey)!
const { boldMatches } = defineProps<{
	boldMatches: (value: string) => BoldMatchReturn
}>()
</script>

<template>
	<div>
		<Title>{{
			curriculum.language === 'en' ? 'CORE SKILLS' : 'HABILIDADES TÉCNICAS'
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
