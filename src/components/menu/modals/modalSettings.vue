<script setup lang="ts">
import { inject } from 'vue'

import { fontSizeSelect } from '@/constants/font-size'
import { a4gapSelect, marginListSelect } from '@/constants/spacings'
import { ProviderKey } from '@/keys'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { CurriculumStore } from '@/stores/curriculumStore'
import { HueStore } from '@/stores/hueStore'
import SvgArrow from '@/svgs/svgArrow.vue'
import type { HasShow } from '@/types'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'
import Select from '@/ui/appSelect.vue'

type Props = {
	id: string
}

const curriculumIndex = CurriculumIndexStore.get()
const { curriculum } = inject(ProviderKey)!
const { id } = defineProps<Props>()

const colorRange = HueStore.get()

function handleColorChange() {
	HueStore.set()
	HueStore.save()
}
</script>

<template>
	<Modal :id="id" closeLabel="close" minWidth="30rem" v-if="curriculum">
		<template #header>
			<h3>Settings</h3>
		</template>
		<form>
			<Select
				label="Curriculum Margin"
				:items="marginListSelect"
				v-model="curriculum.Settings.margin"
			/>
			<Select
				label="Curriculum Gap"
				:items="a4gapSelect"
				v-model="curriculum.Settings.gap"
			/>
			<Select
				label="Section Header"
				:items="fontSizeSelect"
				v-model="curriculum.Settings.section.size"
			/>
			<AppInput
				label="App Color"
				type="range"
				v-model="colorRange"
				max="360"
				min="1"
				@change="handleColorChange"
			/>
			<div>
				<span> Order </span>
				<ul>
					<li v-for="(value, index) in curriculum.Settings.order" :key="value">
						<AppInput
							type="checkbox"
							:divStyle="{ width: '1rem' }"
							v-if="
								Object.prototype.hasOwnProperty.call(curriculum[value], 'show')
							"
							v-model="curriculum[value as HasShow].show"
						/>
						<span v-else :style="{ width: '1rem' }" />

						<AppButton
							iconButton
							@click="
								CurriculumStore.moveSettingsOrder(
									curriculumIndex,
									index,
									index - 1
								)
							"
							:disabled="index === 0"
						>
							<SvgArrow direction="up" />
						</AppButton>
						<AppButton
							iconButton
							@click="
								CurriculumStore.moveSettingsOrder(
									curriculumIndex,
									index,
									index + 1
								)
							"
							:disabled="index === curriculum.Settings.order.length - 1"
						>
							<SvgArrow direction="down" />
						</AppButton>
						{{ value.replace(/([a-z])([A-Z])/g, '$1 $2') }}
					</li>
				</ul>
			</div>
		</form>
	</Modal>
</template>

<style scoped>
@layer utilities {
	form {
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr 1fr;

		> div {
			--_padding: 0.8rem;
			padding: var(--_padding);
			background: var(--surface-container-low);
			border-radius: var(--border-radius);
		}
	}

	div:has(ul) {
		grid-column: span 2;

		ul {
			padding: 0px;

			li {
				display: flex;
				align-items: center;
				gap: 0.5rem;
			}
		}
	}
}
</style>
