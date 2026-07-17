<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue'

import { ProviderKey } from '@/keys'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { ProfilesStore } from '@/stores/profileStore'
import SvgDrag from '@/svgs/svgDrag.vue'
import type { HasShow } from '@/types'
import AppInput from '@/ui/appInput.vue'
import { DragAndDrop } from '@/utilities/DragAndDrop'

const curriculumIndex = CurriculumIndexStore.get()
const { curriculum } = inject(ProviderKey)!

onMounted(() => {
	const controller = DragAndDrop({
		areaId: 'settingsOrderUl',
		idPrefix: 'li-',
		itemsClass: 'liElement',
		itemsList: curriculum.value.Settings.order,
		action: (fromIndex, toIndex) =>
			ProfilesStore.moveSettingsOrder(curriculumIndex.value, fromIndex, toIndex)
	})
	onUnmounted(() => controller.abort())
})
</script>

<template>
	<div>
		<span> Order </span>
		<ul id="settingsOrderUl">
			<li
				:id="`li-${value}`"
				:data-index="index"
				class="liElement"
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

				<div data-drag-handle draggable="true">
					<SvgDrag />
				</div>

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
				padding: 0.25rem 0.3rem;
			}
		}
	}
}
</style>
