<script setup lang="ts">
import { ProviderKey } from '@/main'
import type { Curriculum } from '@/types'
import List from '@/ui/list.vue'
import Paragraph from '@/ui/paragraph.vue'
import { computed, inject } from 'vue'
import Title from './title.vue'

const { curriculum, language } = inject(ProviderKey)!

const { boldMatches } = defineProps<{ boldMatches: (v: string) => string }>()
</script>

<template>
	<div>
		<Title>{{ language === 'en' ? 'SUMMARY' : 'Resumo' }}</Title>
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
