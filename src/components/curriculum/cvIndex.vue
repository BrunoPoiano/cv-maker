<script setup lang="ts">
import { computed, inject } from 'vue'

import { curriculumOrder } from '@/constants/curriculumOrder'
import { ProviderKey } from '@/keys'

const { curriculum } = inject(ProviderKey)!
const margin = computed(() => curriculum.value.Settings.margin)
const gap = computed(() => curriculum.value.Settings.gap)
</script>

<template>
	<section>
		<div
			class="a4-page"
			id="curriculumPage"
			:style="{ '--_padding': `${margin}cm`, '--_a4-gap': `${gap}rem` }"
		>
			<template v-for="order in curriculum.Settings.order" :key="order">
				<component :is="curriculumOrder[order]" />
			</template>
		</div>
	</section>
</template>

<style scoped>
@layer utilities {
	section {
		background-color: var(--surface);

		.a4-page {
			grid-area: curriculum;
			--_a4-gap: 1.3rem;

			overflow-x: auto;
			max-width: 230mm;
			min-height: 297mm;
			box-sizing: border-box;

			display: grid;
			align-content: baseline;
			gap: var(--_a4-gap);

			padding: var(--_padding, 1cm);
			margin-inline: auto;
			margin-block: 2rem;

			box-sizing: border-box;
			background-color: light-dark(white, black);

			border: 1px var(--outline-variant) solid;
			border-radius: calc(var(--border-radius) * 0.5);
		}
	}
}
</style>
