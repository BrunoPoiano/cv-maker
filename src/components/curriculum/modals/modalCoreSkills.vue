<script setup lang="ts">
import { fontSizeSelect } from '@/constants/font-size'
import { skillList } from '@/constants/skillList'
import { ProviderKey } from '@/keys'
import { type Skills, type SkillsList } from '@/types'
import AppInput from '@/ui/appInput.vue'
import Modal from '@/ui/appModal.vue'
import Select from '@/ui/appSelect.vue'
import AppSmall from '@/ui/appSmall.vue'
import Textarea from '@/ui/appTextarea.vue'
import { inject, ref } from 'vue'

const { curriculum } = inject(ProviderKey)!

type SkillList = Partial<Record<keyof Skills, string>>

const coreSkills = ref(
	skillList.reduce<SkillList>((acc, item) => {
		const skill = item.toLowerCase() as SkillsList
		if (curriculum.value.CoreSkills.skills[skill]) {
			acc[skill] = curriculum.value.CoreSkills.skills[skill].join(', ')
		} else {
			acc[skill] = ''
		}
		return acc
	}, {})
)

function saveSkill(core: SkillsList) {
	if (coreSkills.value[core] === '') {
		delete curriculum.value.CoreSkills.skills[core]
	} else {
		curriculum.value.CoreSkills.skills[core] =
			coreSkills.value[core]?.split(',')
	}
}
</script>

<template>
	<Modal
		buttonLabel="Core Skills"
		closeLabel="close"
		minWidth="40rem"
		v-if="curriculum"
		buttonIcon="/svgs/pen.svg"
	>
		<template #header>
			<div class="header">
				<h4>
					<AppInput
						type="checkbox"
						label="Core Skills"
						v-model="curriculum.CoreSkills.show"
					/>
				</h4>
				<AppSmall >Items will be separeted by commas (,)</AppSmall >
			</div>
		</template>
		<form>
			<Select
				label="Font Size"
				:items="fontSizeSelect"
				v-model="curriculum.CoreSkills.size"
			/>
			<div v-for="(_, core) in coreSkills" class="skills" :key="core">
				<span>{{ core.replace('_', ' & ') }}</span>
				<Textarea
					placeholder="User Name"
					v-model="coreSkills[core] as string"
					minHeight="100px"
					:change="saveSkill(core)"
				/>
			</div>
		</form>
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
</style>
