<script setup lang="ts">
import type { FontSize } from '@/types'

type Props = {
	fontSize?: FontSize
}

const { fontSize } = defineProps<Props>()
</script>

<template>
	<p :style="{ '--font_size': `var(${fontSize})` }">
		<slot />
	</p>
</template>

<style scoped>
p {
	margin: 0;
	color: var(--on-surface-variant);
	font-size: var(--font_size, var(--font-size-sm));
	font-weight: var(--font-weight);
	letter-spacing: 0em;

	text-align: justify;
}
</style>
