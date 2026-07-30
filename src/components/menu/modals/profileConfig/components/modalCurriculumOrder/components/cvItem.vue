<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

import { ProfilesStore } from '@/stores/profileStore'
import SvgDrag from '@/svgs/svgDrag.vue'
import SvgTrash from '@/svgs/svgTrash.vue'
import AppButton from '@/ui/appButton.vue'
import { DragAndDrop } from '@/utilities/DragAndDrop'

type Props = {
	labelIndex: string
	label: string
	index: number
}

const props = defineProps<Props>()

onMounted(() => {
	const cleanup = DragAndDrop({
		areaId: 'curriculumOrderUl',
		idPrefix: 'li-',
		itemsClass: 'liElement',
		itemsList: [props.labelIndex],
		action: ProfilesStore.moveCurriculum
	})

	onUnmounted(() => cleanup())
})
</script>

<template>
	<li
		:id="`li-${props.labelIndex}`"
		:data-index="props.index"
		class="liElement"
	>
		<div data-drag-handle draggable="true">
			<SvgDrag />
		</div>
		<span>
			{{ props.label }}
		</span>
		<AppButton
			iconButton
			:disabled="props.index === 0"
			hoverBackground="var(--red)"
			@click="ProfilesStore.deleteCurriculum(props.index)"
		>
			<SvgTrash />
		</AppButton>
	</li>
</template>
