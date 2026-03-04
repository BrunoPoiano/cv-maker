<script setup lang="ts">
import type { Curriculum } from '@/types'
import Button from '@/ui/appButton.vue'

type Props = {
	curriculum: Curriculum
}

const { curriculum } = defineProps<Props>()

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
			<img src="/svgs/document.svg" alt="app logo" width="50" height="50" />
			CV-Maker
		</h1>
		<Button @click="savePDF" background="var(--app-color)"
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
	margin-inline: -1rem;

	h1 {
		margin: 0;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}
}
</style>
