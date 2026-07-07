<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted } from 'vue'

import { curriculumOrder } from '@/constants/curriculumOrder'
import { ProviderKey } from '@/keys'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { ProfilesStore } from '@/stores/profileStore'
import { DragAndDrop } from '@/utilities/DragAndDrop'

const { curriculum } = inject(ProviderKey)!
const curriculumIndex = CurriculumIndexStore.get()
const margin = computed(() => curriculum.value.Settings.margin)
const gap = computed(() => curriculum.value.Settings.gap)

onMounted(() => {
	const controller = DragAndDrop({
		areaId: 'curriculumPage',
		idPrefix: 'main-',
		itemsList: curriculum.value.Settings.order,
		itemsClass: 'cvElement',
		action: (fromIndex, toIndex) =>
			ProfilesStore.moveSettingsOrder(curriculumIndex.value, fromIndex, toIndex)
	})

	onUnmounted(() => controller.abort())
})
</script>

<template>
	<section>
		<div
			class="a4-page"
			id="curriculumPage"
			:style="{ '--_padding': `${margin}cm`, '--_a4-gap': `${gap}rem` }"
		>
			<template
				v-for="(order, index) in curriculum.Settings.order"
				:key="order"
			>
				<component
					:id="`main-${order}`"
					:data-index="index"
					class="cvElement"
					draggable="true"
					:is="curriculumOrder[order]"
				/>
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
