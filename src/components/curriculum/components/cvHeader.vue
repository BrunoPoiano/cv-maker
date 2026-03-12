<script setup lang="ts">
import { ProviderKey } from '@/keys'
import { inject } from 'vue'

const { curriculum } = inject(ProviderKey)!
</script>

<template>
	<div class="header">
		<h1 :style="`font-size: var(${curriculum.Header.UserName.size})`">
			{{ curriculum.Header.UserName.value }}
		</h1>
		<span
			:style="`font-size: var(${curriculum.Header.Role.size})`"
			class="label"
			>{{ curriculum.Header.Role.value }}</span
		>
	</div>
</template>

<style scoped>
.header {
	h1 {
		padding: 0;
		margin: 0;
		margin-bottom: calc(var(--_a4-gap) * 0.5);
		font-size: var(--font-size-xxxl);
		text-transform: uppercase;
		letter-spacing: 0.03em;
		font-weight: var(--font-weight);
		line-height: 1.3;
	}

	.label {
		display: block;

		color: var(--light-text-color);

		font-size: var(--font-size-lg);
		font-weight: var(--font-weight);
		letter-spacing: 0.099em;
		line-height: 1.2;
		text-transform: uppercase;
		text-box-trim: trim-both;
		text-box-edge: cap alphabetic;
	}
}
</style>
