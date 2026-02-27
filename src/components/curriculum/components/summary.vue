<script setup lang="ts">
import type { Curriculum } from '@/types'
import List from '@/ui/list.vue'
import Paragraph from '@/ui/paragraph.vue'
import Title from './title.vue'
import { computed, inject } from 'vue'
import { CurriculumConst } from '@/constants/curriculum'
import { CurriculumKey } from '@/main'

const curriculum = inject<Curriculum>(CurriculumKey, CurriculumConst)!
const summary = computed(() => curriculum.Summary)
</script>

<template>
	<Title>SUMMARY</Title>
	<div class="summary">
		<List :genericList="summary" v-if="Array.isArray(summary)" />
		<Paragraph v-else>
			{{ summary }}
		</Paragraph>
	</div>
</template>
