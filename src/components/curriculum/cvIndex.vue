<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue'

import { curriculumOrder } from '@/constants/curriculumOrder'
import { ProviderKey } from '@/keys'
import { isNumberOrDefault } from '@/parsers/typeValidation'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { CurriculumStore } from '@/stores/curriculumStore'

const { curriculum } = inject(ProviderKey)!
const curriculumIndex = CurriculumIndexStore.get()
const margin = computed(() => curriculum.value.Settings.margin)
const gap = computed(() => curriculum.value.Settings.gap)
const lastHovered = ref<number>(-1)
const dragging = ref<number>(-1)

onMounted(() => {
	const curriculumPage = document.getElementById('curriculumPage')!
	for (const el of curriculum.value.Settings.order) {
		const item = document.getElementById(el)
		if (item) {
			item.addEventListener('dragstart', (el) => {
				const dragImage = item.cloneNode(true) as HTMLElement
				dragImage.classList.add('dragging')
				dragImage.style.position = 'absolute'
				dragImage.style.zIndex = '-10000'
				document.body.appendChild(dragImage)

				const target = el.target as HTMLElement
				dragging.value = isNumberOrDefault(target.dataset.index, -1)
				el.dataTransfer?.setDragImage(dragImage, 20, 20)

				item.addEventListener('dragend', () => dragImage.remove(), {
					once: true
				})
			})
		}
	}

	curriculumPage.addEventListener('drop', () => {
		if (dragging.value < 0 || lastHovered.value < 0) {
			return
		}

		CurriculumStore.moveSettingsOrder(
			curriculumIndex.value,
			dragging.value,
			lastHovered.value
		)

		dragging.value = -1
		lastHovered.value = -1
	})

	curriculumPage.addEventListener('dragover', (e) => {
		e.preventDefault()
		const target = document.elementFromPoint(
			e.clientX,
			e.clientY
		) as HTMLElement | null

		if (!target) return

		const item = target.closest('.cvElement')

		if (item) {
			lastHovered.value = isNumberOrDefault(
				(item as HTMLElement).dataset.index,
				-1
			)
		}
	})
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
					:id="order"
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
