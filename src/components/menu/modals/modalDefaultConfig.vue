<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

import { dateStyleSelect, monthOptionsSelect } from '@/constants/dateOptions'
import { fontSizeSelect } from '@/constants/font-size'
import { a4gapSelect, marginListSelect } from '@/constants/spacings'
import { textAlignSelect } from '@/constants/text-align'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { defaultConfigStore } from '@/stores/defaultConfig'
import SvgDrag from '@/svgs/svgDrag.vue'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'
import Select from '@/ui/appSelect.vue'
import { DragAndDrop } from '@/utilities/DragAndDrop'

type Props = {
	id: string
}

const { id } = defineProps<Props>()

const defaultConfig = defaultConfigStore.get()
const curriculumIndex = CurriculumIndexStore.get()
onMounted(() => {
	const controller = DragAndDrop({
		areaId: 'defaultConfigOrderUl',
		idPrefix: 'defaultConfigElementli-',
		itemsList: defaultConfig.value.Settings.order,
		itemsClass: 'defaultConfigElement',
		action: defaultConfigStore.moveSettingsOrder
	})

	onUnmounted(() => controller.abort())
})
</script>

<template>
	<Modal :id="id" closeLabel="close">
		<template #header>
			<h3>Default Configuration</h3>
		</template>
		<form>
			<div>
				<div>Settings</div>
				<Select
					label="Curriculum Margin"
					:items="marginListSelect"
					v-model="defaultConfig.Settings.margin"
				/>
				<Select
					label="Curriculum Gap"
					:items="a4gapSelect"
					v-model="defaultConfig.Settings.gap"
				/>
				<Select
					label="Section Header"
					:items="fontSizeSelect"
					v-model="defaultConfig.Settings.section.size"
				/>
			</div>
			<div>
				<div>Order</div>
				<ul id="defaultConfigOrderUl">
					<li
						:id="`defaultConfigElementli-${value}`"
						:data-index="index"
						class="defaultConfigElement"
						draggable="true"
						v-for="(value, index) in defaultConfig.Settings.order"
						:key="value"
					>
						<SvgDrag />
						{{ value }}
					</li>
				</ul>
			</div>
			<div>
				<div>Header</div>
				<div>
					<div class="header">
						<div>Name</div>
						<Select
							label="Font Size"
							:items="fontSizeSelect"
							v-model="defaultConfig.Header.UserName.size"
						/>
						<Select
							label="Text Align"
							:items="textAlignSelect"
							v-model="defaultConfig.Header.UserName.align"
						/>
					</div>
					<div class="header">
						<div>Role</div>
						<Select
							label="Font Size"
							:items="fontSizeSelect"
							v-model="defaultConfig.Header.Role.size"
						/>
						<Select
							label="Text Align"
							:items="textAlignSelect"
							v-model="defaultConfig.Header.Role.align"
						/>
					</div>
				</div>
			</div>
			<div>
				<div>Contact</div>
				<AppInput
					type="checkbox"
					label="Side by Side"
					v-model="defaultConfig.Contact.sideBySide"
				/>
				<Select
					label="Text Align"
					:items="textAlignSelect"
					v-model="defaultConfig.Contact.align"
				/>
				<Select
					label="Font Size"
					:items="fontSizeSelect"
					v-model="defaultConfig.Contact.size"
				/>
			</div>
			<div>
				<AppInput
					type="checkbox"
					label="Summary"
					v-model="defaultConfig.Summary.show"
				/>
				<Select
					label="Font Size"
					:items="fontSizeSelect"
					v-model="defaultConfig.Summary.size"
				/>
			</div>
			<div>
				<AppInput
					type="checkbox"
					label="Core Skills"
					v-model="defaultConfig.CoreSkills.show"
				/>
				<AppInput
					type="checkbox"
					label="Side by Side"
					v-model="defaultConfig.CoreSkills.sideBySide"
				/>
				<Select
					label="Font Size"
					:items="fontSizeSelect"
					v-model="defaultConfig.CoreSkills.size"
				/>
			</div>
			<div>
				<AppInput
					type="checkbox"
					label="Experience"
					v-model="defaultConfig.Experience.show"
				/>
				<AppInput
					type="checkbox"
					label="Side by Side"
					v-model="defaultConfig.Experience.sideBySide"
				/>
				<Select
					label="Title"
					:items="fontSizeSelect"
					v-model="defaultConfig.Experience.size.title"
				/>
				<Select
					v-if="!defaultConfig.Experience.sideBySide"
					label="Subtitle"
					:items="fontSizeSelect"
					v-model="defaultConfig.Experience.size.subTitle"
				/>
				<Select
					label="Description"
					:items="fontSizeSelect"
					v-model="defaultConfig.Experience.size.description"
				/>
				<Select
					label="Date Style"
					:items="dateStyleSelect"
					v-model="defaultConfig.Experience.dateStyle"
				/>
				<Select
					v-if="defaultConfig.Experience.dateStyle === 'date'"
					label="Month"
					:items="monthOptionsSelect"
					v-model="defaultConfig.Experience.dateMonth"
				/>
			</div>
			<div>
				<AppInput
					type="checkbox"
					label="Academic Background"
					v-model="defaultConfig.AcademicBackground.show"
				/>
				<Select
					label="Size"
					:items="fontSizeSelect"
					v-model="defaultConfig.AcademicBackground.size"
				/>
				<Select
					label="Date Style"
					:items="dateStyleSelect"
					v-model="defaultConfig.AcademicBackground.dateStyle"
				/>
				<Select
					v-if="defaultConfig.AcademicBackground.dateStyle === 'date'"
					label="Month"
					:items="monthOptionsSelect"
					v-model="defaultConfig.AcademicBackground.dateMonth"
				/>
			</div>

			<div class="actions">
				<AppButton
					fitContent
					@click="defaultConfigStore.setDefaultConfig(curriculumIndex)"
				>
					set Values to Current Curriculum
				</AppButton>
				<AppButton
					fitContent
					@click="defaultConfigStore.setDefaultConfigToAll()"
				>
					set Values to All Curriculums
				</AppButton>
			</div>
		</form>
		<template #footer>
			<AppButton @click="defaultConfigStore.save()"> Save </AppButton>
		</template>
	</Modal>
</template>

<style scoped>
@layer utilities {
	form {
		display: grid;
		gap: 1rem;

		--_padding: 0.8rem;

		> div {
			display: grid;
			gap: 1rem;
			align-items: start;

			background: var(--surface-container-low);
			padding: var(--_padding);
			border-radius: var(--border-radius);

			&:not(.actions, :has(ul)) {
				grid-template-columns: 1fr 1fr 1fr;

				> div:nth-child(1) {
					grid-area: 1 / span 3;
				}
			}

			> div:has(.header) {
				grid-area: 2 / span 3;
				display: grid;
				gap: 1rem;

				padding: 0px;
				padding-left: var(--_padding);

				.header {
					display: grid;
					gap: 1rem;
					grid-template-columns: 1fr 1fr 1fr;

					> div:nth-child(1) {
						grid-area: 1 / span 3;
					}
				}
			}
		}

		.actions {
			display: flex;
			gap: 1rem;
			justify-content: center;
		}

		ul {
			padding-left: var(--_padding);
			margin: 0px;
			li {
				display: flex;
				align-items: center;
				gap: 0.5rem;
				padding: 0.25rem 0.3rem;
			}
		}
	}
}
.dragging {
	display: flex;
	> div,
	svg {
		display: none;
	}
}
</style>
