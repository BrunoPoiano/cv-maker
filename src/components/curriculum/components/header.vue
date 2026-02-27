<script setup lang="ts">
import { CurriculumConst } from '@/constants/curriculum'
import { CurriculumKey } from '@/main'
import type { Curriculum } from '@/types'
import { inject } from 'vue'
const header = inject<Curriculum>(CurriculumKey, CurriculumConst).Header
</script>

<template>
	<div class="header">
		<h1>{{ header.UserName }}</h1>
		<span class="label">{{ header.Label }}</span>
	</div>
</template>

<style scoped>
.header {
	h1 {
		padding: 0;
		margin: 0;
		font-size: 46px;
		color: #000000;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		font-weight: var(--font-weight);
	}

	.label {
		font-size: 26px;
		color: var(--light-text-color);
		text-transform: uppercase;
		letter-spacing: 0.099em;
		font-weight: var(--font-weight);
	}
}
</style>
