<script setup lang="ts">
import type { Curriculum } from '@/types'
import List from '@/ui/list.vue'
import Title from './title.vue'
import { inject } from 'vue'
import { ProviderKey } from '@/main'

const { curriculum } = inject(ProviderKey)!
const { boldMatches } = defineProps<{ boldMatches: (v: string) => string }>()
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
