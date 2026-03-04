<script setup lang="ts">
import { ProviderKey } from '@/main'
import type { BoldMatchReturn } from '@/types'
import AppBoldMatch from '@/ui/appBoldMatch.vue'
import List from '@/ui/appList.vue'
import Paragraph from '@/ui/appParagraph.vue'
import { inject } from 'vue'
import Title from './CvTitle.vue'

const { curriculum } = inject(ProviderKey)!

const { boldMatches } = defineProps<{
	boldMatches: (value: string) => BoldMatchReturn
}>()
</script>

<template>
	<div v-if="curriculum.Summary.show">
		<Title>{{
			curriculum.Settings.language === 'en' ? 'SUMMARY' : 'Resumo'
		}}</Title>
		<div class="summary">
			<List
				v-if="Array.isArray(curriculum.Summary.value)"
				:fontSize="curriculum.Summary.size"
				:genericList="curriculum.Summary.value"
				:boldMatches="boldMatches"
			/>
			<Paragraph v-else :fontSize="curriculum.Summary.size">
				<AppBoldMatch :value="boldMatches(curriculum.Summary.value)" />
			</Paragraph>
		</div>
	</div>
</template>
