<script setup lang="ts">
import { inject } from 'vue'

import { ProviderKey } from '@/keys'
import { ReadonlyStore } from '@/stores/readonlyStore'
import SvgDocument from '@/svgs/svgDocument.vue'
import Button from '@/ui/appButton.vue'

const { curriculum } = inject(ProviderKey)!
const readonly = ReadonlyStore.get()

function savePDF() {
	const originalTitle = document.title

	document.title =
		`${curriculum.value.Header.UserName.value}_${curriculum.value.Header.Role.value}`
			.toLowerCase()
			.replace(/[^\w\s-]/g, '')
			.replace(/\s+/g, '_')
			.replace(/_+/g, '_')
			.replace(/-+/g, '_')

	window.print()

	document.title = originalTitle
}
</script>

<template>
	<div class="header">
		<h1>
			<SvgDocument />
			CV-Maker
		</h1>
		<div>
			<Button :disabled="!readonly" @click="savePDF" background="var(--primary)"
				>Generate PDF
			</Button>
		</div>
	</div>
</template>

<style scoped>
@layer utilities {
	.header {
		grid-area: header;
		box-shadow: var(--shadow-ambient);
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		align-items: center;
		padding-inline: 0.5rem;

		h1 {
			margin: 0;
			display: flex;
			align-items: center;
			gap: 0.5rem;
		}

		> div {
			display: inline-flex;
			gap: 1rem;
		}
	}
}
</style>
