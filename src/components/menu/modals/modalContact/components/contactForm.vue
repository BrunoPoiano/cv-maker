<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue'

import { ProviderKey } from '@/keys'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { ProfilesStore } from '@/stores/profileStore'
import SvgDrag from '@/svgs/svgDrag.vue'
import type { ContactValues } from '@/types'
import AppInput from '@/ui/appInput.vue'
import { DragAndDrop } from '@/utilities/DragAndDrop'

type Props = {
	type: ContactValues
	index: number
}

const props = defineProps<Props>()
const { curriculum } = inject(ProviderKey)!
const curriculumIndex = CurriculumIndexStore.get()

onMounted(() => {
	const controller = DragAndDrop({
		areaId: 'contactsValuesOrder',
		idPrefix: 'contactsValuesOrder-',
		itemsList: [props.type],
		itemsClass: 'itemContactsValuesOrder',
		action: (fromIndex, toIndex) =>
			ProfilesStore.moveContactOrder(curriculumIndex.value, fromIndex, toIndex)
	})

	onUnmounted(() => controller.abort())
})
</script>

<template>
	<div
		:key="props.type"
		:id="`contactsValuesOrder-${props.type}`"
		:data-index="props.index"
		class="itemContactsValuesOrder"
	>
		<AppInput
			type="text"
			:label="props.type"
			:placeholder="props.type"
			v-model="curriculum.Contact.value[props.type].value"
		>
			<template #label>
				<div data-drag-handle draggable="true">
					<SvgDrag />
					{{ props.type }}
				</div>
			</template>
		</AppInput>
		<AppInput
			type="checkbox"
			label="bolder"
			v-model="curriculum.Contact.value[props.type].bolder"
		/>
	</div>
</template>

<style scoped>
@layer utilities {
	.itemContactsValuesOrder {
		background: var(--surface-container-low);
		padding: 0.8rem;
		border-radius: var(--border-radius);

		transition: background 500ms ease;

		[data-drag-handle] {
			display: flex;
			gap: 0.3ch;
			align-items: center;
			text-transform: capitalize;
		}

		&:hover {
			background: hsl(from var(--surface-container-low) h s calc(l - 2.75));
		}
	}
}
</style>
