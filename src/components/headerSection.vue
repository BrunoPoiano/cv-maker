<script setup lang="ts">
import SvgDocument from '@/svgs/svgDocument.vue'
import type { Curriculum } from '@/types'
import Button from '@/ui/appButton.vue'

type Props = {
	curriculum: Curriculum
	readonly: boolean
}

const { curriculum, readonly } = defineProps<Props>()

function savePDF() {
	const originalTitle = document.title

	document.title =
		`${curriculum.Header.UserName.value}_${curriculum.Header.Role.value}`
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
		<Button :disabled="!readonly" @click="savePDF" background="var(--app-color)"
			>Generate PDF
		</Button>
	</div>
</template>

<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	align-items: center;
	margin-bottom: 1rem;
	margin-inline: calc(var(--body-padding) * -1);

	h1 {
		margin: 0;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
}
</style>
