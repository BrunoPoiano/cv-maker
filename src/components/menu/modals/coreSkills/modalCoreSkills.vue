<script setup lang="ts">
import { inject, ref } from 'vue'

import { fontSizeSelect } from '@/constants/font-size'
import { ProviderKey, ProviderSkillKey } from '@/keys'
import SvgNewDocument from '@/svgs/svgNewDocument.vue'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'
import AppPopover from '@/ui/appPopover.vue'
import Select from '@/ui/appSelect.vue'
import AppSmall from '@/ui/appSmall.vue'

import CoreSkillInput from './components/CoreSkillInput.vue'
import ModalCoreSkillName from './components/ModalCoreSkillName.vue'

type Props = {
	id: string
}

const { id } = defineProps<Props>()
const { skillsProxy } = inject(ProviderSkillKey)!
const { curriculum } = inject(ProviderKey)!
const ModalCoreSkillNameID = ref('modal-core-skill-name')
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
			<CoreSkillInput
				v-for="(_, core, index) in skillsProxy"
				:key="core"
				:index="index"
				:core="core"
			/>
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
	}

	.header {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
	}
}
</style>
