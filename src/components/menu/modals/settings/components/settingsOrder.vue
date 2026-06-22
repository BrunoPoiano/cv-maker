<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'

import { ProviderKey } from '@/keys'
import { isNumberOrDefault } from '@/parsers/typeValidation'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { CurriculumStore } from '@/stores/curriculumStore'
import SvgDrag from '@/svgs/svgDrag.vue'
import type { HasShow } from '@/types'
import AppInput from '@/ui/appInput.vue'

const curriculumIndex = CurriculumIndexStore.get()
const { curriculum } = inject(ProviderKey)!
const lastHovered = ref<number>(-1)
const dragging = ref<number>(-1)

onMounted(() => {
	const settingsOrderUl = document.getElementById('settingsOrderUl')!

	for (const el of curriculum.value.Settings.order) {
		const item = document.getElementById(`li-${el}`)
		if (item) {
			item.addEventListener('dragstart', (el) => {
				const dragImage = item.cloneNode(true) as HTMLElement
				dragImage.classList.add('dragging')
				dragImage.style.position = 'absolute'
				dragImage.style.zIndex = '-10000'
				document.body.appendChild(dragImage)

				const target = el.target as HTMLElement
				dragging.value = isNumberOrDefault(target.dataset.index, -1)
				el.dataTransfer?.setDragImage(dragImage, 30, 20)

				item.addEventListener('dragend', () => dragImage.remove(), {
					once: true
				})
			})
		}
	}

	settingsOrderUl.addEventListener('drop', () => {
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

	settingsOrderUl.addEventListener('dragover', (e) => {
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
	<div>
		<span> Order </span>
		<ul id="settingsOrderUl">
			<li
				:id="`li-${value}`"
				:data-index="index"
				class="cvElement"
				draggable="true"
				v-for="(value, index) in curriculum.Settings.order"
				:key="value"
			>
				<AppInput
					type="checkbox"
					:divStyle="{ width: '1rem' }"
					v-if="Object.prototype.hasOwnProperty.call(curriculum[value], 'show')"
					v-model="curriculum[value as HasShow].show"
				/>
				<span v-else :style="{ width: '1rem' }" />

				<SvgDrag />

				{{ value.replace(/([a-z])([A-Z])/g, '$1 $2') }}
			</li>
		</ul>
	</div>
</template>

<style scoped>
@layer utilities {
	.dragging {
		display: flex;
		> div,
		svg {
			display: none;
		}
	}
	div:has(ul) {
		grid-column: span 2;

		ul {
			padding: 0px;

			li {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				padding: 0.5rem 0.3rem;
				cursor: grab;
			}
		}
	}
}
</style>
