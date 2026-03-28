<script setup lang="ts">
import { inject } from 'vue'

import { languagesSelect } from '@/constants/language'
import { ProviderKey } from '@/keys'
import AppMenuModalItems from '@/ui/appMenuModalItems.vue'
import AppSelect from '@/ui/appSelect.vue'

import { menuItems } from './MenuItems'
const { curriculum } = inject(ProviderKey)!
</script>

<template>
	<aside>
		<div>
			<AppSelect
				backgroundColor="var(--surface-container-low)"
				data-menu-select
				:items="languagesSelect"
				v-model="curriculum.Settings.language"
			/>
			<AppMenuModalItems :menu-items="menuItems" menu-button />
		</div>
	</aside>
</template>

<style scoped>
aside {
	grid-area: menu;
	background: var(--surface-container-low);
	padding: 1rem;

	> div {
		position: sticky;
		top: 1rem;
		height: fit-content;
		display: grid;
		align-content: baseline;
		gap: 0.25rem;

		&:deep(button[data-menu-button='true']),
		&:deep(select[data-menu-select]) {
			min-width: 14rem;
			border-radius: 0px;
		}
	}
}
</style>
