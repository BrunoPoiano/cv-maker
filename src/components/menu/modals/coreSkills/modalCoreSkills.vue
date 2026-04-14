<script setup lang="ts">
import { inject, ref } from 'vue'

import { fontSizeSelect } from '@/constants/font-size'
import { ProviderKey, ProviderSkillKey } from '@/keys'
import { CurriculumStore } from '@/stores/curriculumStore'
import SvgArrow from '@/svgs/svgArrow.vue'
import SvgTrash from '@/svgs/svgTrash.vue'
import AppButton from '@/ui/appButton.vue'
import AppInput from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'
import Select from '@/ui/appSelect.vue'
import AppSmall from '@/ui/appSmall.vue'
import Textarea from '@/ui/appTextarea.vue'

import ModalCoreSkillName from './components/ModalCoreSkillName.vue'

type Props = {
	id: string
}

const { id } = defineProps<Props>()
const { skillsProxy, onInput } = inject(ProviderSkillKey)!
const { curriculum, curriculumIndex } = inject(ProviderKey)!

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
				<AppButton modal :id="ModalCoreSkillNameID"> New Core Skill </AppButton>
			</div>
		</template>
		<form>
			<Select
				label="Font Size"
				:items="fontSizeSelect"
				v-model="curriculum.CoreSkills.size"
			/>
			<div v-for="(_, core, index) in skillsProxy" class="skills" :key="core">
				<div class="header-items">
					<div>
						<span>
							{{ core.replace('_', ' & ') }}
						</span>
						<AppButton
							iconButton
							@click="
								CurriculumStore.moveCoreSkill(curriculumIndex, core, index - 1)
							"
							:disabled="index === 0"
						>
							<SvgArrow direction="up" />
						</AppButton>
						<AppButton
							iconButton
							@click="
								CurriculumStore.moveCoreSkill(curriculumIndex, core, index + 1)
							"
							:disabled="index === Object.keys(skillsProxy).length - 1"
						>
							<SvgArrow direction="down" />
						</AppButton>
					</div>
					<AppButton
						iconButton
						hover-background="var(--red)"
						@click="CurriculumStore.removeCoreSkill(curriculumIndex, core)"
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
		</form>
		<ModalCoreSkillName :id="ModalCoreSkillNameID" />
	</Modal>
</template>

<style scoped>
.skills {
	display: grid;
	gap: 0.8rem;

	span {
		text-transform: capitalize;
	}
}

form {
	display: grid;
	gap: 1rem;
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
</style>
