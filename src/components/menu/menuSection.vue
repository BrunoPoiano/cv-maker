<script setup lang="ts">
import { computed, defineAsyncComponent, inject } from 'vue'

import { languagesSelect } from '@/constants/language'
import { ProviderKey } from '@/keys'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { ProfileIndexStore } from '@/stores/profileIndexStore'
import { ProfilesStore } from '@/stores/profileStore'
import { ReadonlyStore } from '@/stores/readonlyStore'
import SvgGear from '@/svgs/svgGear.vue'
import type { Languages } from '@/types'
import Button from '@/ui/appButton.vue'
import AppButton from '@/ui/appButton.vue'
import AppMenuModalItems from '@/ui/appMenuModalItems.vue'
import AppPopover from '@/ui/appPopover.vue'
import AppSelect from '@/ui/appSelect.vue'
import appToggleText from '@/ui/appToggleText.vue'

import { buttonItemsList } from './menuitems/buttonItems'
import { sideMenuItems } from './menuitems/sideMenuItems'
import { topMenuItems } from './menuitems/topMenuItems'

const ModalProfileConfig = defineAsyncComponent(
	() => import('./modals/ProfileConfig/modalProfileConfig.vue')
)

const { curriculum } = inject(ProviderKey)!
const readonly = ReadonlyStore.get()
const profileIndex = ProfileIndexStore.get()
const curriculumIndex = CurriculumIndexStore.get()

const cvSelect = computed(() => {
	return ProfilesStore.getCurriculums().map((curriculum, index) => ({
		label: `${curriculum.Settings.language} - ${curriculum.Header.Role.value}`,
		value: index
	}))
})

const profileSelect = computed(() =>
	ProfilesStore.get().value.map((profile, index) => ({
		label: profile.name,
		value: index
	}))
)

const buttonItems = computed(() =>
	buttonItemsList(curriculum.value, curriculumIndex.value)
)

function updateLanguage(val: Languages) {
	ProfilesStore.setLanguageCurriculum(curriculumIndex.value, val)
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
	<div class="profileMenu">
		<AppSelect
			width="20ch"
			:items="profileSelect"
			v-model="profileIndex"
			@vue:updated="ProfileIndexStore.save()"
		/>

		<AppSelect
			width="25ch"
			:items="cvSelect"
			v-model="curriculumIndex"
			@vue:updated="CurriculumIndexStore.changeValue(curriculumIndex)"
		/>
		<AppButton id="modalProfileConfig" modal iconButton>
			<SvgGear />
		</AppButton>
		<ModalProfileConfig />
	</div>
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

		<template v-for="button in buttonItems" :key="button.id">
			<AppPopover positionArea="top left" nowrap>
				<Button
					icon-button
					@click="button.click"
					:hover-background="button.hoverBackground"
					:disabled="button.disabled"
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
	.profileMenu {
		grid-area: profileMenu;
		display: flex;
		gap: 1rem;
		padding: 0.5rem 1rem;
		justify-content: flex-end;
	}
	.menu {
		grid-area: submenu;
		display: flex;
		gap: 1rem;

		padding-block: 0.5rem 1rem;
		padding-inline-start: 2rem;

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

		:has(button):last-child {
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
				width: min(14rem, 100%);
				border-radius: 0px;
			}
		}
	}
}
</style>
