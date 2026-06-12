<script setup lang="ts">
import { inject } from 'vue'

import { languagesSelect } from '@/constants/language'
import { generateKey } from '@/helpers/generateKey'
import { ProviderKey } from '@/keys'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { CurriculumStore } from '@/stores/curriculumStore'
import { ReadonlyStore } from '@/stores/readonlyStore'
import type { Languages } from '@/types'
import Button from '@/ui/appButton.vue'
import AppMenuModalItems from '@/ui/appMenuModalItems.vue'
import AppPopover from '@/ui/appPopover.vue'
import AppSelect from '@/ui/appSelect.vue'
import appToggleText from '@/ui/appToggleText.vue'

import { buttonItemsList } from './menuitems/buttonItems'
import { sideMenuItems } from './menuitems/sideMenuItems'
import { topMenuItems } from './menuitems/topMenuItems'

const { curriculum } = inject(ProviderKey)!
const curriculumIndex = CurriculumIndexStore.get()
const readonly = ReadonlyStore.get()
const buttonItems = buttonItemsList(curriculum.value, curriculumIndex.value)

function updateLanguage(val: Languages) {
	CurriculumStore.setLanguage(curriculumIndex.value, val)
}
</script>

<template>
	<aside>
		<div>
			<AppSelect
				backgroundColor="var(--surface-container-low)"
				data-menu-select
				:items="languagesSelect"
				:modelValue="curriculum.Settings.language"
				@update:modelValue="updateLanguage"
			/>
			<AppMenuModalItems :menu-items="sideMenuItems" menu-button />
		</div>
	</aside>
	<nav class="menu">
		<AppMenuModalItems :menu-items="topMenuItems" />
	</nav>
	<nav class="curriculumMenu">
		<appToggleText
			v-model="readonly"
			label-start="Preview"
			label-end="Editor"
			:afterChange="ReadonlyStore.save"
		/>

		<template v-for="(button, index) in buttonItems" :key="generateKey(index)">
			<AppPopover positionArea="top left" nowrap>
				<Button
					icon-button
					@click="button.click"
					:hover-background="button.hoverBackground"
				>
					<component :is="button.svg" />
				</Button>
				<template #popover>
					{{ button.title }}
				</template>
			</AppPopover>
		</template>
	</nav>
</template>

<style scoped>
@layer utilities {
	.menu {
		grid-area: submenu;
		display: flex;
		gap: 1rem;

		padding-inline-start: 2rem;
		padding-block: 1rem;

		&:deep(.toggle-text) {
			margin-left: auto;
		}
	}

	.curriculumMenu {
		grid-area: curriculumMenu;
		position: sticky;
		top: 1rem;
		height: fit-content;

		padding-block-start: 1rem;
		padding-inline: 0.5rem;

		display: grid;
		align-content: flex-start;
		place-items: center;
		gap: 1.5rem;

		button:last-child {
			margin-top: 1rem;
		}
	}

	aside {
		grid-area: menu;
		background: var(--surface-container-low);
		padding: 1rem;

		> div {
			position: sticky;
			top: 2rem;
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
}
</style>
