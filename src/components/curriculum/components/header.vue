<script setup lang="ts">
import { CurriculumConst } from '@/constants/curriculum'
import { CurriculumKey } from '@/main'
import type { Curriculum } from '@/types'
import { inject } from 'vue'
const header = inject<Curriculum>(CurriculumKey, CurriculumConst).Header
</script>

<template>
	<div class="header">
		<h1 :style="`font-size: var(${header.UserName.size})`">
			{{ header.UserName.value }}
		</h1>
		<span :style="`font-size: var(${header.Label.size})`" class="label">{{
			header.Label.value
		}}</span>
	</div>
</template>

<style scoped>
.header {
	h1 {
		padding: 0;
		margin: 0;
		font-size: var(--font-size-xxxl);
		color: #000000;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		font-weight: var(--font-weight);
		line-height: 1.3;
	}

	.label {
		font-size: var(--font-size-lg);
		color: var(--light-text-color);
		text-transform: uppercase;
		letter-spacing: 0.099em;
		font-weight: var(--font-weight);
		line-height: 1.2;
	}
}
</style>
