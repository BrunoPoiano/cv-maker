<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

import { defaultConfigStore } from '@/stores/defaultConfig'
import SvgDrag from '@/svgs/svgDrag.vue'
import { DragAndDrop } from '@/utilities/DragAndDrop'

const defaultConfig = defaultConfigStore.get()

onMounted(() => {
	const settingsOrderController = DragAndDrop({
		areaId: 'defaultConfigOrderUl',
		idPrefix: 'defaultConfigElementli-',
		itemsList: defaultConfig.value.Settings.order,
		itemsClass: 'defaultConfigElement',
		action: defaultConfigStore.moveSettingsOrder
	})

	onUnmounted(() => settingsOrderController.abort())
})
</script>
<template>
	<div>
		<div>Order</div>
		<ul id="defaultConfigOrderUl">
			<li
				:id="`defaultConfigElementli-${value}`"
				:data-index="index"
				class="defaultConfigElement"
				v-for="(value, index) in defaultConfig.Settings.order"
				:key="value"
			>
				<div data-drag-handle draggable="true">
					<SvgDrag />
				</div>
				{{ value }}
			</li>
		</ul>
	</div>
</template>
