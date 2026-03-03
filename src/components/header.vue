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

<script setup lang="ts">
import type { Curriculum } from '@/types'
import Button from '@/ui/button.vue'

type Props = {
	curriculum: Curriculum
}

const { curriculum } = defineProps<Props>()

function savePDF() {
	const originalTitle = document.title

	document.title =
		`${curriculum.Header.UserName.value}-${curriculum.Header.Role.value}`
			.toLocaleLowerCase()
			.replace(/\s+/g, '_')
	window.print()

	document.title = originalTitle
}
</script>

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
