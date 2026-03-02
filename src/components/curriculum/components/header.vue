<script setup lang="ts">
import { CurriculumConst } from '@/constants/curriculum'
import { ProviderKey } from '@/main'
import type { Curriculum } from '@/types'
import { inject } from 'vue'
const {
	curriculum: { Header }
} = inject(ProviderKey)!
</script>

<template>
	<div class="header">
		<h1 :style="`font-size: var(${Header.UserName.size})`">
			{{ Header.UserName.value }}
		</h1>
		<span :style="`font-size: var(${Header.Role.size})`" class="label">{{
			Header.Role.value
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
