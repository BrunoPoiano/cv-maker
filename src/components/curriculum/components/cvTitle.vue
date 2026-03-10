<script setup lang="ts">
import type { FontSize } from '@/types'

type Props = {
	fontsize?: FontSize
}

const props = defineProps<Props>()
</script>

<template>
	<h3 :style="`font-size: var(${props.fontsize})`">
		<slot />
	</h3>
</template>

<style scoped>
h3 {
	color: black;
	font-size: var(--font-size-lg);
	font-weight: var(--font-weight);
	letter-spacing: 0.099em;
	line-height: 1.2;
	text-transform: uppercase;
	margin: 0;
	margin-bottom: calc((var(--_a4-gap) * 0.6));
}
</style>
