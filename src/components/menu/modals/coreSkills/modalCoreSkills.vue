<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref } from 'vue'

import { fontSizeSelect } from '@/constants/font-size'
import { ProviderKey, ProviderSkillKey } from '@/keys'
import { CurriculumIndexStore } from '@/stores/curriculumIndexStore'
import { ProfilesStore } from '@/stores/profileStore'
import SvgDrag from '@/svgs/svgDrag.vue'
import SvgNewDocument from '@/svgs/svgNewDocument.vue'
import SvgTrash from '@/svgs/svgTrash.vue'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'
import AppPopover from '@/ui/appPopover.vue'
import Select from '@/ui/appSelect.vue'
import AppSmall from '@/ui/appSmall.vue'
import Textarea from '@/ui/appTextarea.vue'
import { DragAndDrop } from '@/utilities/DragAndDrop'

import ModalCoreSkillName from './components/ModalCoreSkillName.vue'

type Props = {
	id: string
}

const { id } = defineProps<Props>()
const { skillsProxy, onInput } = inject(ProviderSkillKey)!
const { curriculum } = inject(ProviderKey)!
const curriculumIndex = CurriculumIndexStore.get()
const ModalCoreSkillNameID = ref('modal-core-skill-name')

onMounted(() => {
	const controller = DragAndDrop({
		areaId: 'coreSkillsList',
		idPrefix: 'core-skill-',
		itemsList: Object.keys(curriculum.value.CoreSkills.value),
		itemsClass: 'skills',
		action: (fromIndex, toIndex) =>
			ProfilesStore.moveCoreSkill(curriculumIndex.value, fromIndex, toIndex)
	})
	onUnmounted(() => controller.abort())
})
</script>

<template>
	<Modal :id="id" closeLabel="close" minWidth="40rem" v-if="curriculum">
		<template #header>
			<div class="header">
				<h3>
					<AppInput
						type="checkbox"
						label="Core Skills"
						v-model="curriculum.CoreSkills.show"
					/>
					<AppSmall>Items will be separeted by commas (,)</AppSmall>
				</h3>
				<AppPopover>
					<AppButton modal icon-button :id="ModalCoreSkillNameID">
						<SvgNewDocument />
					</AppButton>
					<template #popover> New Core Skill </template>
				</AppPopover>
			</div>
		</template>
		<div class="settings">
			<AppInput
				type="checkbox"
				label="Side by Side"
				v-model="curriculum.CoreSkills.sideBySide"
			/>
			<Select
				label="Font Size"
				:items="fontSizeSelect"
				v-model="curriculum.CoreSkills.size"
			/>
		</div>
		<div class="coreSkillsList" id="coreSkillsList">
			<div
				v-for="(_, core, index) in skillsProxy"
				:id="`core-skill-${core}`"
				:data-index="index"
				:key="core"
				class="skills"
				draggable="true"
			>
				<div class="header-items">
					<div>
						<SvgDrag />
						<span>
							{{ core.replace('_', ' & ') }}
						</span>
					</div>
					<AppButton
						iconButton
						hover-background="var(--red)"
						@click="ProfilesStore.removeCoreSkill(curriculumIndex, core)"
					>
						<SvgTrash />
					</AppButton>
				</div>
				<Textarea
					:placeholder="core"
					v-model="skillsProxy[core]"
					@update:modelValue="onInput(core, $event)"
					minHeight="100px"
				/>
			</div>
		</div>
		<ModalCoreSkillName :id="ModalCoreSkillNameID" />
	</Modal>
</template>

<style scoped>
@layer utilities {
	.skills {
		display: grid;
		gap: 0.8rem;

		span {
			text-transform: capitalize;
		}
	}

	.settings {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	.coreSkillsList {
		display: grid;
		gap: 1rem;

		> div {
			background: var(--surface-container-low);
			padding: 0.8rem;
			border-radius: var(--border-radius);

			transition: background 500ms ease;

			&:hover {
				background: hsl(from var(--surface-container-low) h s calc(l - 2.75));
			}
		}
	}

	.header {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
	}

	.header-items {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;

		> div {
			display: flex;
			align-items: center;
			gap: 0.5ch;
		}
	}
}
</style>
