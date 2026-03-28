<script setup lang="ts">
import type { MenuModalItem } from '@/types'

import AppButton from './appButton.vue'

type Props = {
	menuItems: MenuModalItem[]
	menuButton?: true
}

const props = defineProps<Props>()
</script>
<template>
	<template v-for="item in props.menuItems" :key="item.id">
		<AppButton
			modal
			:id="item.id"
			:menu-button="menuButton"
			:style="{ '--bg': item.backgroundColor }"
		>
			<component v-if="item.icon" :is="item.icon" /> {{ item.label }}
		</AppButton>
		<component :is="item.modal" :id="item.id" />
	</template>
</template>
