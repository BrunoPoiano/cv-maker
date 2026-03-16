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
	<nav class="menu">
		<AppMenuModalItems :menu-items="menuItems" />
		<AppSelect
			:items="languagesSelect"
			v-model="curriculum.Settings.language"
		/>
	</nav>
</template>

<style scoped>
.menu {
	margin-inline: auto;
	display: flex;
	gap: 0.8rem;
	margin-top: 2rem;
}
</style>
