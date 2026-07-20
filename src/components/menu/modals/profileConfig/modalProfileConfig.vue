<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

import { HueStore } from '@/stores/hueStore'
import { ProfileIndexStore } from '@/stores/profileIndexStore'
import { ProfilesStore } from '@/stores/profileStore'
import SvgNewDocument from '@/svgs/svgNewDocument.vue'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import AppModal from '@/ui/appModal.vue'
import AppTable from '@/ui/appTable.vue'

import ColorScheme from './components/colorScheme.vue'
import TableActions from './components/tableActions.vue'

const ModalProfileForm = defineAsyncComponent(
	() => import('./components/ModalProfileForm.vue')
)

const ModalCurriculumOrder = defineAsyncComponent(
	() => import('./components/modalCurriculumOrder.vue')
)

const ModalDefaultConfig = defineAsyncComponent(
	() => import('./components/modalDefaultConfig/modalDefaultConfig.vue')
)

const profiles = ProfilesStore.get()
const profileIndex = ProfileIndexStore.get()
const colorRange = HueStore.get()

function handleColorChange() {
	HueStore.set()
	HueStore.save()
}
const tableProfiled = computed(() => {
	return profiles.value.map((item, index) => {
		return {
			...item,
			'#': item.id,
			curriculums: item.curriculums.length,
			actions: {
				component: TableActions,
				props: { index: index }
			}
		}
	})
})
</script>

<template>
	<AppModal id="modalProfileConfig" closeLabel="close">
		<template #header>
			<h3>App Configuration</h3>
		</template>
		<div class="content">
			<div>
				<AppInput
					type="range"
					v-model="colorRange"
					max="360"
					min="1"
					@change="handleColorChange"
				>
					<template #label>
						<label class="header">
							App Color
							<ColorScheme />
						</label>
					</template>
				</AppInput>
			</div>

			<div class="defaultConfig">
				<AppButton modal id="modalDefaultConfig">
					Curriculum Default Configuration
				</AppButton>
				<ModalDefaultConfig id="modalDefaultConfig" />
			</div>
			<div class="defaultConfig">
				<AppButton modal id="modalCurriculumORder">
					Curriculum Order
				</AppButton>
				<ModalCurriculumOrder id="modalCurriculumORder" />
			</div>

			<div>
				<h3 class="header">
					Profiles
					<AppButton iconButton modal id="modalProfileForm">
						<SvgNewDocument />
					</AppButton>
				</h3>
				<AppTable
					:bolder="(item: number) => item === profileIndex"
					:content="tableProfiled"
					:header="['#', 'name', 'curriculums', 'actions']"
				/>
				<ModalProfileForm id="modalProfileForm" />
			</div>
		</div>
	</AppModal>
</template>

<style scoped>
@layer utilities {
	.header {
		display: flex;
		gap: 1rem;
		align-items: center;
		justify-content: space-between;
	}

	.content {
		display: grid;
		gap: 1rem;

		> div {
			--_padding: 0.8rem;
			padding: var(--_padding);
			background: var(--surface-container-low);
			border-radius: var(--border-radius);

			&:hover {
				background: hsl(from var(--surface-container-low) h s calc(l - 2.75));
			}
		}

		.defaultConfig {
			display: grid;
			place-items: center;
		}
	}
}
</style>
