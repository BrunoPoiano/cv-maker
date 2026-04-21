<script setup lang="ts">
import { inject } from 'vue'

import { languagesSelect } from '@/constants/language'
import { ProviderKey } from '@/keys'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { CurriculumStore } from '@/stores/curriculumStore'
import { ReadonlyStore } from '@/stores/readonlyStore'
import SvgCopy from '@/svgs/svgCopy.vue'
import SvgNewDocument from '@/svgs/svgNewDocument.vue'
import SvgPin from '@/svgs/svgPin.vue'
import SvgSave from '@/svgs/svgSave.vue'
import SvgTrash from '@/svgs/svgTrash.vue'
import Button from '@/ui/appButton.vue'
import AppMenuModalItems from '@/ui/appMenuModalItems.vue'
import AppSelect from '@/ui/appSelect.vue'
import appToggleText from '@/ui/appToggleText.vue'

import { sideMenuItems } from './menuitems/sideMenuItems'
import { topMenuItems } from './menuitems/topMenuItems'

const { curriculum, readonly } = inject(ProviderKey)!
const curriculumIndex = CurriculumIndexStore.get()
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

		<Button
			icon-button
			@click="CurriculumStore.save()"
			hover-background="var(--green)"
			title="Save Curriculums"
		>
			<SvgSave />
		</Button>

		<Button
			icon-button
			@click="CurriculumStore.copy(curriculum)"
			hover-background="var(--blue)"
			title="Copy Curriculum"
		>
			<SvgCopy />
		</Button>
		<Button
			icon-button
			@click="CurriculumStore.new()"
			hover-background="var(--green)"
			title="New Curriculum"
		>
			<SvgNewDocument />
		</Button>

		<Button
			icon-button
			@click="CurriculumStore.setAsDefault(curriculumIndex)"
			hover-background="var(--green)"
			title="Set Curriculum as default"
			:disabled="curriculumIndex === 0"
		>
			<SvgPin />
		</Button>
		<Button
			icon-button
			@click="CurriculumStore.delete(curriculumIndex)"
			:disabled="curriculumIndex === 0"
			hover-background="var(--red)"
			title="Delete Curriculum"
		>
			<SvgTrash />
		</Button>
	</nav>
</template>

<style scoped>
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
</style>
