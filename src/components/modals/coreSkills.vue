<script setup lang="ts">
import { fontSizeSelect } from '@/constants/font-size'
import { skillList } from '@/constants/skillList'
import {  ProviderKey } from '@/main'
import { type Curriculum, type Skills, type SkillsList } from '@/types'
import Modal from '@/ui/modal.vue'
import Select from '@/ui/select.vue'
import Textarea from '@/ui/textarea.vue'
import { inject, ref } from 'vue'

const { curriculum } = inject(ProviderKey)!


type SkillList = Partial<Record<keyof Skills, string>>

const coreSkills = ref(
	skillList.reduce<SkillList>((acc, item) => {
		const skill = item.toLowerCase() as SkillsList
		if (curriculum.CoreSkills.skills[skill]) {
			acc[skill] = curriculum.CoreSkills.skills[skill].join(', ')
		} else {
			acc[skill] = ''
		}
		return acc
	}, {})
)

function saveSkill(core: SkillsList) {
	if (coreSkills.value[core] === '') {
		delete curriculum.CoreSkills.skills[core]
	} else {
		curriculum.CoreSkills.skills[core] = coreSkills.value[core]?.split(',')
	}
}
</script>

<template>
	<Modal
		buttonLabel="Core Skills"
		closeLabel="close"
		minWidth="40rem"
		v-if="curriculum"
	>
		<template #header>
			<div class="header">
				<h4>Core Skills</h4>
			</div>
		</template>
		<form>
			<Select
				label="size"
				:items="fontSizeSelect"
				v-model="curriculum.CoreSkills.size"
			/>
			<div v-for="(_, core) in coreSkills" class="skills">
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
