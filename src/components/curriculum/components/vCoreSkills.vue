<script setup lang="ts">
import { ProviderKey } from '@/main'
import type { BoldMatchReturn } from '@/types'
import List from '@/ui/appList.vue'
import { inject } from 'vue'
import Title from './CvTitle.vue'
import { Translate } from '@/constants/translations'

const { curriculum } = inject(ProviderKey)!
const { boldMatches } = defineProps<{
	boldMatches: (value: string) => BoldMatchReturn
}>()
</script>

<template>
	<div v-if="curriculum.CoreSkills.show">
		<Title>{{ Translate['core skills'][curriculum.Settings.language] }}</Title>
		<div class="coreSkills">
			<List
				:fontSize="curriculum.CoreSkills.size"
				:coreSkills="curriculum.CoreSkills.skills"
				:boldMatches="boldMatches"
				:language="curriculum.Settings.language"
			/>
		</div>
	</div>
</template>
