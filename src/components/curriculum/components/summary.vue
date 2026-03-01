<script setup lang="ts">
import { CurriculumConst } from '@/constants/curriculum'
import { BolderKey, CurriculumKey } from '@/main'
import type { Curriculum } from '@/types'
import List from '@/ui/list.vue'
import Paragraph from '@/ui/paragraph.vue'
import { computed, inject } from 'vue'
import Title from './title.vue'

const curriculum = inject<Curriculum>(CurriculumKey, CurriculumConst)!
const summary = computed(() => curriculum.Summary.value)
const fontsize = computed(() => curriculum.Summary.size)

const { boldMatches } = defineProps<{ boldMatches: (v: string) => string }>()
</script>

<template>
	<Title>SUMMARY</Title>
	<div class="summary">
		<List
			v-if="Array.isArray(summary)"
			:fontSize="fontsize"
			:genericList="summary"
			:boldMatches="boldMatches"
		/>
		<Paragraph v-else :fontSize="fontsize" v-html="boldMatches(summary)" />
	</div>
</template>
