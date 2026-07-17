<script setup lang="ts">
import { ReadonlyStore } from '@/stores/readonlyStore'
import SvgDrag from '@/svgs/svgDrag.vue'
import type { FontSize } from '@/types'

type Props = {
	fontsize?: FontSize
}

const props = defineProps<Props>()
const readOnly = ReadonlyStore.get()
</script>

<template>
	<h3 :style="{ fontSize: `var(${props.fontsize})` }">
		<div v-if="!readOnly" data-drag-handle draggable="true">
			<SvgDrag />
		</div>
		<slot />
	</h3>
</template>

<style scoped>
@layer utilities {
	h3 {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;

		font-size: var(--font-size-lg);
		font-weight: var(--font-weight);
		letter-spacing: 0.099em;
		line-height: 1.2;
		text-transform: uppercase;
		margin: 0;
		margin-bottom: calc((var(--_a4-gap) * 0.6));
	}
}
</style>
