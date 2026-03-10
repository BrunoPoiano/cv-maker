<script setup lang="ts">
import type { FontSize } from '@/types'

type Props = {
	fontSize?: FontSize
}

const { fontSize } = defineProps<Props>()
</script>

<template>
	<p :style="`font-size: var(${fontSize})`"><slot /></p>
</template>

<style scoped>
p {
	max-width: var(--max-width);

	margin: 0;

	color: var(--light-text-color);
	font-size: var(--font-size-sm);
	font-weight: var(--font-weight);
	letter-spacing: 0em;

	text-align: justify;
}
</style>
