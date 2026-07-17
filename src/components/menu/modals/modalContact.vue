<script setup lang="ts">
import { inject, onMounted, onUnmounted } from 'vue'

import { fontSizeSelect } from '@/constants/font-size'
import { textAlignSelect } from '@/constants/text-align'
import { ProviderKey } from '@/keys'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { ProfilesStore } from '@/stores/profileStore'
import SvgDefault from '@/svgs/SvgDefault.vue'
import SvgDrag from '@/svgs/svgDrag.vue'
import AppButton from '@/ui/appButton.vue'
import appInput from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'
import AppPopover from '@/ui/appPopover.vue'
import Select from '@/ui/appSelect.vue'
import { DragAndDrop } from '@/utilities/DragAndDrop'
const { curriculum } = inject(ProviderKey)!
const curriculumIndex = CurriculumIndexStore.get()
type Props = {
	id: string
}

const { id } = defineProps<Props>()

onMounted(() => {
	const controller = DragAndDrop({
		areaId: 'contactsValuesOrder',
		idPrefix: 'contactsValuesOrder-',
		itemsList: Object.keys(curriculum.value.Contact.value),
		itemsClass: 'itemContactsValuesOrder',
		action: (fromIndex, toIndex) =>
			ProfilesStore.moveContactOrder(curriculumIndex.value, fromIndex, toIndex)
	})

	onUnmounted(() => controller.abort())
})
</script>

<template>
	<Modal :id="id" closeLabel="close" minWidth="35rem" v-if="curriculum">
		<template #header>
			<div class="header">
				<h3>Contact</h3>
				<Input
					type="checkbox"
					label="Side by Side"
					v-model="curriculum.Contact.sideBySide"
				/>
			</div>
		</template>
		<form>
			<div class="settings">
				<Select
					label="Text Align"
					:items="textAlignSelect"
					v-model="curriculum.Contact.align"
				/>

				<Select
					fullWidth
					label="Font Size"
					:items="fontSizeSelect"
					v-model="curriculum.Contact.size"
					fitContent
				/>
				<AppPopover>
					<AppButton
						icon-button
						@click="ProfilesStore.setContactDefaultValue(curriculumIndex)"
					>
						<SvgDefault />
					</AppButton>
					<template #popover>Set default values</template>
				</AppPopover>
			</div>
			<div id="contactsValuesOrder">
				<div
					v-for="(_, type, index) in curriculum.Contact.value"
					:key="type"
					:id="`contactsValuesOrder-${type}`"
					:data-index="index"
					class="itemContactsValuesOrder"
				>
					<appInput
						type="text"
						:label="type"
						:placeholder="type"
						v-model="curriculum.Contact.value[type].value"
					>
						<template #label>
							<div data-drag-handle draggable="true">
								<SvgDrag />
								{{ type }}
							</div>
						</template>
					</appInput>
					<appInput
						type="checkbox"
						label="bolder"
						v-model="curriculum.Contact.value[type].bolder"
					/>
				</div>
			</div>
		</form>
	</Modal>
</template>

<style scoped>
@layer utilities {
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	form {
		display: grid;
		gap: 1rem;

		> .settings {
			display: grid;
			gap: 1rem;
			grid-template-columns: 10ch 10ch 1fr;
			align-items: end;

			:has(button) {
				justify-self: end;
			}
		}

		#contactsValuesOrder {
			display: grid;
			gap: 1rem;

			.itemContactsValuesOrder {
				background: var(--surface-container-low);
				padding: 0.8rem;
				border-radius: var(--border-radius);

				transition: background 500ms ease;

				[data-drag-handle] {
					display: flex;
					gap: 0.3ch;
					align-items: center;
					text-transform: capitalize;
				}

				&:hover {
					background: hsl(from var(--surface-container-low) h s calc(l - 2.75));
				}
			}
		}
	}
}
</style>
