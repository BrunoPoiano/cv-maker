<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

import { fontSizeSelect } from '@/constants/font-size'
import { textAlignSelect } from '@/constants/text-align'
import { defaultConfigStore } from '@/stores/defaultConfig'
import SvgDrag from '@/svgs/svgDrag.vue'
import AppInput from '@/ui/appInput.vue'
import AppSelect from '@/ui/appSelect.vue'
import { DragAndDrop } from '@/utilities/DragAndDrop'
const defaultConfig = defaultConfigStore.get()

onMounted(() => {
	const contactOrderController = DragAndDrop({
		areaId: 'defaultContactOrderUl',
		idPrefix: 'defaultContactOrderli-',
		itemsList: defaultConfig.value.Contact.valueOrder,
		itemsClass: 'defaultContactElement',
		action: defaultConfigStore.moveContactOrder
	})

	onUnmounted(() => {
		contactOrderController.abort()
	})
})
</script>

<template>
	<div class="contactSection">
		<div>Contact</div>
		<div>
			<AppInput
				type="checkbox"
				label="Side by Side"
				v-model="defaultConfig.Contact.sideBySide"
			/>
			<AppSelect
				label="Text Align"
				:items="textAlignSelect"
				v-model="defaultConfig.Contact.align"
			/>
			<AppSelect
				label="Font Size"
				:items="fontSizeSelect"
				v-model="defaultConfig.Contact.size"
			/>
		</div>

		<ul id="defaultContactOrderUl">
			<li
				:id="`defaultContactOrderli-${item}`"
				:data-index="index"
				class="defaultContactElement"
				v-for="(item, index) in defaultConfig.Contact.valueOrder"
				:key="item"
			>
				<div data-drag-handle draggable="true">
					<SvgDrag />
				</div>
				{{ item }}
			</li>
		</ul>
	</div>
</template>

<style scoped>
.contactSection {
	display: grid;
	> div:nth-child(1) {
		grid-area: 1 / span 2;
	}

	> div:nth-child(2) {
		display: grid;
		gap: 1rem;
	}
}
</style>
