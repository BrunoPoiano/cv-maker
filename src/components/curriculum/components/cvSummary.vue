<script setup lang="ts">
import { ProviderKey } from '@/main'
import List from '@/ui/appList.vue'
import Paragraph from '@/ui/appParagraph.vue'
import { inject } from 'vue'
import Title from './CvTitle.vue'

const { curriculum } = inject(ProviderKey)!

const { boldMatches } = defineProps<{ boldMatches: (value: string) => string }>()
</script>

<template>
	<div>
		<Title>{{ curriculum.language === 'en' ? 'SUMMARY' : 'Resumo' }}</Title>
		<div class="summary">
			<List
				v-if="Array.isArray(curriculum.Summary.value)"
				:fontSize="curriculum.Summary.size"
				:genericList="curriculum.Summary.value"
				:boldMatches="boldMatches"
			/>
			<Paragraph
				v-else
				:fontSize="curriculum.Summary.size"
				v-html="boldMatches(curriculum.Summary.value)"
			/>
		</div>
	</div>
</template>
